/**
 * Firebase Auth Utilities
 * 
 * Helper functions for authentication and user management
 */

import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { firebaseAuth as auth, firebaseDb as db } from '../firebase/client';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { User, UserRole } from '@/types/models';

/**
 * Register new user (pharmacist)
 */
export async function registerUser(
    email: string,
    password: string,
    displayName: string,
    role: UserRole,
    organization?: string,
    region?: string
): Promise<string> {
    try {
        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { uid } = userCredential.user;

        // Update display name
        await updateProfile(userCredential.user, { displayName });

        // Create Firestore user document
        const userData: Omit<User, 'userId'> = {
            email,
            displayName,
            role,
            organization,
            location: region ? { region, city: '', province: '', country: 'Indonesia' } : undefined,
            emailVerified: false,
            isActive: true,
            createdAt: Timestamp.now(),
            settings: {
                language: 'id',
                notifications: true,
                theme: 'auto'
            }
        };

        await setDoc(doc(db, 'users', uid), userData);

        console.log('User registered:', uid);
        return uid;
    } catch (error: any) {
        console.error('Registration failed:', error);

        // Friendly error messages
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('Email sudah terdaftar');
        } else if (error.code === 'auth/weak-password') {
            throw new Error('Password terlalu lemah (minimal 6 karakter)');
        } else if (error.code === 'auth/invalid-email') {
            throw new Error('Format email tidak valid');
        }

        throw new Error('Registrasi gagal. Silakan coba lagi.');
    }
}

/**
 * Sign in user
 */
export async function signIn(email: string, password: string): Promise<FirebaseUser> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Update last login time
        await setDoc(
            doc(db, 'users', userCredential.user.uid),
            { lastLoginAt: Timestamp.now() },
            { merge: true }
        );

        return userCredential.user;
    } catch (error: any) {
        console.error('Sign in failed:', error);

        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            throw new Error('Email atau password salah');
        } else if (error.code === 'auth/too-many-requests') {
            throw new Error('Terlalu banyak percobaan login. Coba lagi nanti.');
        }

        throw new Error('Login gagal. Silakan coba lagi.');
    }
}

/**
 * Sign out current user
 */
export async function signOut(): Promise<void> {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error('Sign out failed:', error);
        throw new Error('Logout gagal');
    }
}

/**
 * Get current user data from Firestore
 */
export async function getCurrentUserData(): Promise<User | null> {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        return null;
    }

    try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

        if (!userDoc.exists()) {
            return null;
        }

        return {
            userId: currentUser.uid,
            ...userDoc.data()
        } as User;
    } catch (error) {
        console.error('Failed to get user data:', error);
        return null;
    }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback: (user: FirebaseUser | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
}

/**
 * Check if user has specific role
 */
export async function hasRole(role: UserRole): Promise<boolean> {
    const userData = await getCurrentUserData();
    return userData?.role === role;
}

/**
 * Check if user has any of the specified roles
 */
export async function hasAnyRole(roles: UserRole[]): Promise<boolean> {
    const userData = await getCurrentUserData();
    return userData ? roles.includes(userData.role) : false;
}
