/**
 * Patient data anonymization utilities
 * 
 * CRITICAL: Never store patient identifiers (name, ID number, phone, etc.)
 * Only store one-way hashes for linking related records.
 */

import crypto from 'crypto';

/**
 * Generate anonymous patient hash for linking prescriptions without storing PII
 * 
 * @param originalId - Original patient ID (from hospital/clinic system)
 * @param dateOfBirth - Patient date of birth
 * @returns SHA-256 hash string (irreversible)
 * 
 * @example
 * ```typescript
 * const hash = generatePatientHash('P12345', new Date('1988-05-20'));
 * // Store hash in Firestore, discard originalId
 * ```
 */
export function generatePatientHash(
    originalId: string,
    dateOfBirth: Date
): string {
    // Site-specific secret (must be set in environment variables)
    const SECRET = process.env.NEXT_PUBLIC_PATIENT_HASH_SECRET;

    if (!SECRET) {
        console.warn('PATIENT_HASH_SECRET not set, using default (INSECURE)');
    }

    const effectiveSecret = SECRET || 'default-secret-please-change-in-production';

    // Combine ID + DOB + secret for uniqueness and security
    const data = `${originalId}:${dateOfBirth.toISOString()}:${effectiveSecret}`;

    // SHA-256 one-way hash
    return crypto
        .createHash('sha256')
        .update(data)
        .digest('hex');
}

/**
 * Validate that no prohibited patient data is present in object
 * Throws error if any PII fields are found
 * 
 * @param data - Object to validate
 * @throws Error if prohibited fields found
 */
export function validateNoPatientPII(data: Record<string, unknown>): void {
    const PROHIBITED_FIELDS = [
        'patientName',
        'patientId',
        'patientIdNumber',
        'patientPhone',
        'patientAddress',
        'patientEmail',
        'nik', // Indonesian ID number
        'ktp'
    ];

    const foundFields = PROHIBITED_FIELDS.filter(field => field in data);

    if (foundFields.length > 0) {
        throw new Error(
            `PRIVACY VIOLATION: Prohibited patient fields found: ${foundFields.join(', ')}`
        );
    }
}

/**
 * Hash IP address for audit logging (privacy-preserving)
 * 
 * @param ipAddress - Client IP address
 * @returns Hashed IP (last octet removed before hashing for privacy)
 */
export function hashIPAddress(ipAddress: string): string {
    // Remove last octet for IP anonymization
    const anonymizedIP = ipAddress.split('.').slice(0, 3).join('.') + '.0';

    return crypto
        .createHash('sha256')
        .update(anonymizedIP)
        .digest('hex');
}
