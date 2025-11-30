import { z } from 'zod';

// ============= PRESCRIPTION VALIDATION =============

export const prescriptionInputSchema = z.object({
    diagnosis: z.string()
        .min(3, 'Diagnosis minimal 3 karakter')
        .max(500, 'Diagnosis maksimal 500 karakter'),
    antibiotic: z.string()
        .min(2, 'Nama antibiotik minimal 2 karakter')
        .max(100, 'Nama antibiotik maksimal 100 karakter'),
    doseMg: z.number()
        .positive('Dosis harus > 0')
        .max(10000, 'Dosis terlalu tinggi'),
    frequency: z.string()
        .regex(/^\d+x$/, 'Format harus seperti: 1x, 2x, 3x, dst'),
    durationDays: z.number()
        .int('Durasi harus bilangan bulat')
        .min(1, 'Durasi minimal 1 hari')
        .max(90, 'Durasi maksimal 90 hari'),
    route: z.enum(['oral', 'IV', 'IM', 'topical', 'subcutaneous']),
    patientAge: z.number()
        .int('Umur harus bilangan bulat')
        .min(0, 'Umur tidak boleh negatif')
        .max(120, 'Umur tidak valid'),
    patientWeight: z.number()
        .positive('Berat harus > 0')
        .max(300, 'Berat tidak valid')
        .optional(),
    patientGender: z.enum(['M', 'F', 'O']).optional(),
    allergies: z.array(z.string()).optional(),
    comorbidities: z.array(z.string()).optional(),
    isPregnant: z.boolean().optional(),
    isLactating: z.boolean().optional(),
});

export type PrescriptionInputValidated = z.infer<typeof prescriptionInputSchema>;

// ============= COUNSELING VALIDATION =============

export const counselingInputSchema = z.object({
    prescriptionId: z.string().min(1, 'Prescription ID required'),
    format: z.enum(['short', 'standard', 'whatsapp']),
    language: z.enum(['id', 'en']),
    literacyLevel: z.enum(['basic', 'standard', 'advanced']),
});

export type CounselingInputValidated = z.infer<typeof counselingInputSchema>;

// ============= DEMAND REPORT VALIDATION =============

export const demandReportSchema = z.object({
    category: z.enum(['respiratory', 'gastrointestinal', 'uti', 'skin', 'dental', 'other']),
    drugRequested: z.string()
        .min(2, 'Nama obat minimal 2 karakter')
        .max(100, 'Nama obat maksimal 100 karakter'),
    wasDispensed: z.boolean(),
    refusalReason: z.string().max(500).optional(),
    patientReaction: z.enum(['accepted', 'angry', 'confused', 'went-elsewhere']).optional(),
    region: z.string().min(2, 'Region harus diisi'),
});

export type DemandReportValidated = z.infer<typeof demandReportSchema>;

// ============= THERAPY FAILURE VALIDATION =============

export const therapyFailureSchema = z.object({
    prescriptionId: z.string().optional(),
    originalAntibiotic: z.string().min(2).max(100),
    diagnosisText: z.string().min(3).max(500),
    daysUntilReturn: z.number().int().min(0).max(365),
    symptoms: z.string().min(3).max(500),
    subsequentTreatment: z.string().max(500).optional(),
    region: z.string().min(2),
});

export type TherapyFailureValidated = z.infer<typeof therapyFailureSchema>;

// ============= HELPER FUNCTIONS =============

export function validatePrescription(data: unknown) {
    return prescriptionInputSchema.safeParse(data);
}

export function validateCounseling(data: unknown) {
    return counselingInputSchema.safeParse(data);
}

export function validateDemandReport(data: unknown) {
    return demandReportSchema.safeParse(data);
}

export function validateTherapyFailure(data: unknown) {
    return therapyFailureSchema.safeParse(data);
}

// ============= ERROR FORMATTER =============

export function formatZodErrors(zodError: z.ZodError) {
    return zodError.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message
    }));
}
