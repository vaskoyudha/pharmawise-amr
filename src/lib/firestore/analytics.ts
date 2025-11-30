// src/lib/firestore/analytics.ts
import {
    collection,
    query,
    where,
    getDocs,
    Timestamp,
    orderBy,
    limit
} from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase/client';

// Get analytics for a specific time period
export async function getAnalytics(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startTimestamp = Timestamp.fromDate(startDate);

    // Get prescriptions
    const prescriptionsQuery = query(
        collection(firebaseDb, 'prescriptions'),
        where('userId', '==', userId),
        where('createdAt', '>=', startTimestamp)
    );
    const prescriptionsSnap = await getDocs(prescriptionsQuery);
    const prescriptions = prescriptionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get reviews
    const reviewsQuery = query(
        collection(firebaseDb, 'reviewResults'),
        where('userId', '==', userId),
        where('createdAt', '>=', startTimestamp)
    );
    const reviewsSnap = await getDocs(reviewsQuery);
    const reviews = reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get counseling outputs
    const counselingQuery = query(
        collection(firebaseDb, 'counselingOutputs'),
        where('userId', '==', userId),
        where('createdAt', '>=', startTimestamp)
    );
    const counselingSnap = await getDocs(counselingQuery);
    const counselingOutputs = counselingSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
        prescriptions,
        reviews,
        counselingOutputs,
    };
}

// Calculate dashboard statistics
export function calculateStats(data: any) {
    const { prescriptions, reviews, counselingOutputs } = data;

    // Total prescriptions
    const totalPrescriptions = prescriptions.length;

    // Average score
    const avgScore = reviews.length > 0
        ? reviews.reduce((sum: number, r: any) => sum + (r.score || 0), 0) / reviews.length
        : 0;

    // High risk count
    const highRiskCount = reviews.filter((r: any) => r.riskLevel === 'red').length;

    // Counseling count
    const counselingCount = counselingOutputs.length;

    // Antibiotic distribution
    const antibioticCounts: Record<string, number> = {};
    prescriptions.forEach((p: any) => {
        const antibiotic = p.antibiotic || 'Unknown';
        antibioticCounts[antibiotic] = (antibioticCounts[antibiotic] || 0) + 1;
    });

    // Convert to array and sort
    const antibioticDistribution = Object.entries(antibioticCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Top 5

    // Weekly trend (group by week)
    const weeklyData = groupByWeek(prescriptions);

    return {
        totalPrescriptions,
        avgScore: Math.round(avgScore),
        highRiskCount,
        counselingCount,
        antibioticDistribution,
        weeklyData,
    };
}

function groupByWeek(prescriptions: any[]) {
    const weeks: Record<string, number> = {};

    prescriptions.forEach((p: any) => {
        const date = p.createdAt?.toDate();
        if (!date) return;

        // Get week start (Monday)
        const weekStart = new Date(date);
        const day = weekStart.getDay();
        const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
        weekStart.setDate(diff);
        weekStart.setHours(0, 0, 0, 0);

        const weekKey = weekStart.toISOString().split('T')[0];
        weeks[weekKey] = (weeks[weekKey] || 0) + 1;
    });

    // Convert to array and sort by date
    return Object.entries(weeks)
        .map(([week, count]) => ({ week, count }))
        .sort((a, b) => a.week.localeCompare(b.week));
}

// Get recent activity
export async function getRecentActivity(userId: string, limitCount: number = 10) {
    const q = query(
        collection(firebaseDb, 'prescriptions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
