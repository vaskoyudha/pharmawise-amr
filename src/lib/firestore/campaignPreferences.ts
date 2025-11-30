    logoUrl?: string;
    brandColor: string;
    lastUpdated: Timestamp;
}

const COLLECTION_NAME = 'campaignPreferences';

/**
 * Get user's pharmacy preferences
 */
export async function getPharmacyPreferences(
    userId: string
): Promise<PharmacyPreferences | null> {
    try {
        const docRef = doc(db, COLLECTION_NAME, userId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null;
        }

        return docSnap.data() as PharmacyPreferences;
    } catch (error) {
        console.error('Error getting pharmacy preferences:', error);
        return null;
    }
}

/**
 * Save or update user's pharmacy preferences
 */
export async function savePharmacyPreferences(
    preferences: Omit<PharmacyPreferences, 'lastUpdated'>
): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, preferences.userId);

        await setDoc(docRef, {
            ...preferences,
            lastUpdated: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error saving pharmacy preferences:', error);
        throw error;
    }
}

/**
 * Update specific fields of pharmacy preferences
 */
export async function updatePharmacyPreferences(
    userId: string,
    updates: Partial<Omit<PharmacyPreferences, 'userId' | 'lastUpdated'>>
): Promise<void> {
    try {
        const docRef = doc(db, COLLECTION_NAME, userId);

        await updateDoc(docRef, {
            ...updates,
            lastUpdated: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating pharmacy preferences:', error);
        throw error;
    }
}
