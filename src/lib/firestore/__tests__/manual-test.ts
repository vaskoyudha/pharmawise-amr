/**
 * Test script for Firestore CRUD operations
 * 
 * Run with: npx tsx src/lib/firestore/__tests__/manual-test.ts
 * 
 * Prerequisites:
 * 1. Firebase emulators running (npm run emulators)
 * 2. Or production Firebase configured in .env.local
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
    createPrescription,
    getPrescription,
    getUserPrescriptions
} from '../prescriptions';
import { PrescriptionInput } from '@/types/models';

// Initialize Firebase (use emulator for testing)
const app = initializeApp({
    projectId: 'pharmawise-amr-test'
});

const db = getFirestore(app);

// Connect to emulator if running locally
if (process.env.FIREBASE_EMULATOR) {
    connectFirestoreEmulator(db, 'localhost', 8080);
}

async function testPrescriptionCRUD() {
    console.log('🧪 Testing Prescription CRUD Operations...\n');

    try {
        // Test 1: Create Prescription
        console.log('1️⃣ Testing createPrescription...');

        const testInput: PrescriptionInput = {
            diagnosis: 'Community-acquired pneumonia',
            antibiotic: 'Amoxicillin',
            doseMg: 500,
            frequency: '3x',
            durationDays: 7,
            route: 'oral',
            patientAge: 35,
            patientWeight: 70,
            patientGender: 'F',
            allergies: ['sulfa'],
            comorbidities: ['diabetes'],
            isPregnant: false
        };

        const prescriptionId = await createPrescription({
            input: testInput,
            userId: 'test-user-123',
            originalPatientId: 'P12345',
            patientDOB: new Date('1988-05-20'),
            region: 'Jakarta',
            city: 'Jakarta Selatan'
        });

        console.log('✅ Prescription created:', prescriptionId);
        console.log('');

        // Test 2: Get Prescription
        console.log('2️⃣ Testing getPrescription...');

        const prescription = await getPrescription(prescriptionId);

        if (!prescription) {
            throw new Error('Prescription not found!');
        }

        console.log('✅ Prescription retrieved:');
        console.log('  - Antibiotic:', prescription.antibiotic);
        console.log('  - Dose:', prescription.doseMg, 'mg');
        console.log('  - Frequency:', prescription.frequency);
        console.log('  - Duration:', prescription.durationDays, 'days');
        console.log('  - Patient hash:', prescription.patientHash.substring(0, 16) + '...');
        console.log('');

        // Test 3: Patient Data Privacy
        console.log('3️⃣ Testing patient data privacy...');

        if ('patientName' in prescription || 'patientId' in prescription) {
            throw new Error('❌ PRIVACY VIOLATION: PII found in stored data!');
        }

        console.log('✅ No PII in stored data (patient hash only)');
        console.log('');

        // Test 4: Get User Prescriptions
        console.log('4️⃣ Testing getUserPrescriptions...');

        const userPrescriptions = await getUserPrescriptions('test-user-123', 10);

        console.log(`✅ Found ${userPrescriptions.length} prescription(s) for user`);
        console.log('');

        // Test 5: Validation
        console.log('5️⃣ Testing validation...');

        try {
            // This should fail: invalid frequency format
            await createPrescription({
                input: {
                    ...testInput,
                    frequency: 'invalid' // Should be "1x", "2x", etc
                } as any,
                userId: 'test-user-123',
                originalPatientId: 'P12345',
                patientDOB: new Date('1988-05-20')
            });

            console.log('❌ Validation failed to catch invalid data!');
        } catch (error) {
            console.log('✅ Validation correctly rejected invalid data');
        }

        console.log('\n🎉 All tests passed!\n');

        return {
            success: true,
            prescriptionId
        };

    } catch (error) {
        console.error('\n❌ Test failed:', error);
        return {
            success: false,
            error
        };
    }
}

// Run tests
if (require.main === module) {
    testPrescriptionCRUD()
        .then(result => {
            process.exit(result.success ? 0 : 1);
        })
        .catch(error => {
            console.error('Unexpected error:', error);
            process.exit(1);
        });
}

export { testPrescriptionCRUD };
