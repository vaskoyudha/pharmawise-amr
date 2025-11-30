/**
 * Firestore Service Layer: Demand Reports
 * 
 * Handles inappropriate antibiotic demand tracking
 */

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    Timestamp
} from 'firebase/firestore';
import { firebaseDb as db } from '../firebase/client';
import { DemandReport, DemandReportInput } from '@/types/models';

const COLLECTION_NAME = 'demandReports';

/**
 * Create demand report
 */
export async function createDemandReport(
    userId: string,
    input: DemandReportInput
): Promise<string> {
    const reportData: Omit<DemandReport, 'reportId'> = {
        userId,
        region: input.region,
        category: input.category,
        drugRequested: input.drugRequested,
        wasDispensed: input.wasDispensed,
        refusalReason: input.refusalReason,
        patientReaction: input.patientReaction,
        createdAt: Timestamp.now()
    };

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), reportData);
        console.log('Demand report created:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Failed to create demand report:', error);
        throw new Error('Failed to save demand report');
    }
}

/**
 * Get demand reports by region
 */
export async function getDemandReportsByRegion(
    region: string,
    limitCount: number = 100
): Promise<DemandReport[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('region', '==', region),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            reportId: doc.id,
            ...doc.data()
        } as DemandReport));
    } catch (error) {
        console.error('Failed to get demand reports:', error);
        return [];
    }
}

/**
 * Get user's demand reports
 */
export async function getUserDemandReports(
    userId: string,
    limitCount: number = 50
): Promise<DemandReport[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            reportId: doc.id,
            ...doc.data()
        } as DemandReport));
    } catch (error) {
        console.error('Failed to get user demand reports:', error);
        return [];
    }
}

/**
 * Get demand statistics for region
 */
export async function getDemandStatsByRegion(region: string): Promise<{
    total: number;
    byCategory: Record<string, number>;
    dispensedCount: number;
    refusedCount: number;
}> {
    try {
        const reports = await getDemandReportsByRegion(region, 1000);

        const byCategory: Record<string, number> = {};
        let dispensedCount = 0;
        let refusedCount = 0;

        reports.forEach(report => {
            // Count by category
            byCategory[report.category] = (byCategory[report.category] || 0) + 1;

            // Count dispensed vs refused
            if (report.wasDispensed) {
                dispensedCount++;
            } else {
                refusedCount++;
            }
        });

        return {
            total: reports.length,
            byCategory,
            dispensedCount,
            refusedCount
        };
    } catch (error) {
        console.error('Failed to get demand stats:', error);
        return {
            total: 0,
            byCategory: {},
            dispensedCount: 0,
            refusedCount: 0
        };
    }
}

/**
 * Calculate demand index for region (0-100)
 */
export async function calculateDemandIndex(region: string): Promise<number> {
    try {
        // Get reports from last 7 days
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const q = query(
            collection(db, COLLECTION_NAME),
            where('region', '==', region),
            where('createdAt', '>=', Timestamp.fromDate(weekAgo))
        );

        const snapshot = await getDocs(q);
        const reportCount = snapshot.size;

        // Simple formula: scale 0-100 based on report volume
        // Assume 50 reports/week = index 100
        const index = Math.min(100, Math.round((reportCount / 50) * 100));

        return index;
    } catch (error) {
        console.error('Failed to calculate demand index:', error);
        return 0;
    }
}
