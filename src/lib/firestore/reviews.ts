/**
 * Firestore Service Layer: Review Results
 * 
 * Handles storage and retrieval of AI/manual prescription review results
 */

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    doc
} from 'firebase/firestore';
import { firebaseDb as db } from '../firebase/client';
import { ReviewResult } from '@/types/models';

const COLLECTION_NAME = 'reviewResults';

/**
 * Create review result for prescription
 */
export async function createReviewResult(
    prescriptionId: string,
    userId: string,
    score: number,
    riskLevel: 'green' | 'yellow' | 'red',
    explainability: Array<{ label: string; severity: 'info' | 'warning' | 'danger' }>,
    suggestedActions: string[],
    modelVersion?: string
): Promise<string> {
    const reviewData: Omit<ReviewResult, 'reviewId'> = {
        prescriptionId,
        userId,
        score,
        riskLevel,
        explainability,
        suggestedActions,
        finalDecision: 'approve', // Will be updated when user makes decision
        modelVersion,
        createdAt: Timestamp.now()
    };

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), reviewData);
        return docRef.id;
    } catch (error) {
        console.error('Failed to create review result:', error);
        throw new Error('Failed to save review result');
    }
}

/**
 * Update final decision after pharmacist review
 */
export async function updateReviewDecision(
    reviewId: string,
    finalDecision: 'approve' | 'clarify' | 'reject' | 'modified',
    reviewerNotes?: string,
    modifiedFields?: Record<string, { before: unknown; after: unknown }>,
    reviewDurationSec?: number
): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, reviewId);

        await updateDoc(docRef, {
            finalDecision,
            reviewerNotes,
            modifiedFields,
            reviewDurationSec,
            updatedAt: Timestamp.now()
        });
    } catch (error) {
        console.error('Failed to update review decision:', error);
        throw new Error('Failed to update review decision');
    }
}

/**
 * Get review result by prescription ID
 */
export async function getReviewByPrescription(prescriptionId: string): Promise<ReviewResult | null> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('prescriptionId', '==', prescriptionId),
            orderBy('createdAt', 'desc'),
            limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const docSnap = snapshot.docs[0];
        return {
            reviewId: docSnap.id,
            ...docSnap.data()
        } as ReviewResult;
    } catch (error) {
        console.error('Failed to get review:', error);
        return null;
    }
}

/**
 * Get user's review history
 */
export async function getUserReviews(
    userId: string,
    limitCount: number = 50
): Promise<ReviewResult[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            reviewId: doc.id,
            ...doc.data()
        } as ReviewResult));
    } catch (error) {
        console.error('Failed to get user reviews:', error);
        throw new Error('Failed to retrieve review history');
    }
}

/**
 * Get inappropriate prescriptions (for analytics)
 */
export async function getInappropriateReviews(
    limitCount: number = 100
): Promise<ReviewResult[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('riskLevel', 'in', ['yellow', 'red']),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            reviewId: doc.id,
            ...doc.data()
        } as ReviewResult));
    } catch (error) {
        console.error('Failed to get inappropriate reviews:', error);
        return [];
    }
}
