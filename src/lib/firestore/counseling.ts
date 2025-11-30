// src/lib/firestore/counseling.ts
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
import { firebaseDb } from '@/lib/firebase/client';
import type { CounselingOutput } from '@/types/models';

const COLLECTION = 'counselingOutputs';

export async function saveCounseling(
    data: Omit<CounselingOutput, 'counselingId' | 'createdAt'>
): Promise<string> {
    const docRef = await addDoc(collection(firebaseDb, COLLECTION), {
        ...data,
        createdAt: Timestamp.now(),
    });
    return docRef.id;
}

export async function getCounselingByPrescription(
    prescriptionId: string
): Promise<CounselingOutput[]> {
    const q = query(
        collection(firebaseDb, COLLECTION),
        where('prescriptionId', '==', prescriptionId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        counselingId: doc.id,
        ...doc.data()
    } as CounselingOutput));
}

export async function getUserCounselings(
    userId: string,
    limitCount: number = 20
): Promise<CounselingOutput[]> {
    const q = query(
        collection(firebaseDb, COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        counselingId: doc.id,
        ...doc.data()
    } as CounselingOutput));
}
