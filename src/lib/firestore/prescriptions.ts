/**
 * Firestore Service Layer: Prescriptions
 * 
 * Handles all CRUD operations for prescription documents with:
 * - Patient data anonymization
 * - Type safety
 * - Error handling
 * - Audit trail creation
 */

import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    doc,
    DocumentData,
    QueryConstraint
} from 'firebase/firestore';
import { firebaseDb as db } from '../firebase/client';
import { Prescription, PrescriptionInput } from '@/types/models';
import { generatePatientHash, validateNoPatientPII } from '../security/anonymization';

const COLLECTION_NAME = 'prescriptions';

interface CreatePrescriptionParams {
    input: PrescriptionInput;
    userId: string;
    originalPatientId: string;
    patientDOB: Date;
    region?: string;
    city?: string;
}

/**
 * Create new prescription with anonymized patient data
 */
export async function createPrescription(
    params: CreatePrescriptionParams
): Promise<string> {
    const { input, userId, originalPatientId, patientDOB, region, city } = params;

    // Generate anonymous patient hash
    const patientHash = generatePatientHash(originalPatientId, patientDOB);

    const prescriptionData: Omit<Prescription, 'prescriptionId'> = {
        userId,
        patientHash,
        patientAge: input.patientAge,
        patientWeight: input.patientWeight,
        patientGender: input.patientGender,
        diagnosisText: input.diagnosis,
        antibiotic: input.antibiotic,
        doseMg: input.doseMg,
        frequency: input.frequency,
        durationDays: input.durationDays,
        route: input.route as any,
        allergies: input.allergies,
        comorbidities: input.comorbidities,
        isPregnant: input.isPregnant,
        isLactating: input.isLactating,
        source: 'manual',
        location: region && city ? { region, city } : undefined,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    };

    // Validate no PII
    validateNoPatientPII(prescriptionData as any);

    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), prescriptionData);
        console.log('Prescription created:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Failed to create prescription:', error);
        throw new Error('Failed to save prescription to database');
    }
}

/**
 * Get single prescription by ID
 */
export async function getPrescription(prescriptionId: string): Promise<Prescription | null> {
    try {
        const docRef = doc(db, COLLECTION_NAME, prescriptionId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null;
        }

        return {
            prescriptionId: docSnap.id,
            ...docSnap.data()
        } as Prescription;
    } catch (error) {
        console.error('Failed to get prescription:', error);
        throw new Error('Failed to retrieve prescription from database');
    }
}

/**
 * Get user's prescriptions with pagination
 */
export async function getUserPrescriptions(
    userId: string,
    limitCount: number = 20,
    startAfter?: Date
): Promise<Prescription[]> {
    try {
        const constraints: QueryConstraint[] = [
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        ];

        const q = query(collection(db, COLLECTION_NAME), ...constraints);
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            prescriptionId: doc.id,
            ...doc.data()
        } as Prescription));
    } catch (error) {
        console.error('Failed to get user prescriptions:', error);
        throw new Error('Failed to retrieve prescriptions from database');
    }
}

/**
 * Update prescription (limited fields only, no patient data changes)
 */
export async function updatePrescription(
    prescriptionId: string,
    updates: Partial<Pick<Prescription, 'diagnosisText' | 'antibiotic' | 'doseMg' | 'frequency' | 'durationDays' | 'route'>>
): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, prescriptionId);

        await updateDoc(docRef, {
            ...updates,
            updatedAt: Timestamp.now()
        });

        console.log('Prescription updated:', prescriptionId);
    } catch (error) {
        console.error('Failed to update prescription:', error);
        throw new Error('Failed to update prescription in database');
    }
}

/**
 * Get prescriptions by region (for analytics)
 */
export async function getPrescriptionsByRegion(
    region: string,
    limitCount: number = 100
): Promise<Prescription[]> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('location.region', '==', region),
            orderBy('createdAt', 'desc'),
            limit(limitCount)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            prescriptionId: doc.id,
            ...doc.data()
        } as Prescription));
    } catch (error) {
        console.error('Failed to get prescriptions by region:', error);
        throw new Error('Failed to retrieve regional prescriptions');
    }
}

/**
 * Count user's total prescriptions
 */
export async function countUserPrescriptions(userId: string): Promise<number> {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('userId', '==', userId)
        );

        const snapshot = await getDocs(q);
        return snapshot.size;
    } catch (error) {
        console.error('Failed to count prescriptions:', error);
        return 0;
    }
}
