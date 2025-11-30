import { Timestamp } from 'firebase/firestore';

// ============= USER MODELS =============

export type UserRole = 'community' | 'hospital' | 'regulator' | 'admin';

export interface User {
    userId: string;
    email: string;
    displayName: string;
    role: UserRole;
    organization?: string;
    location?: {
        region: string;
        city: string;
        province: string;
        country: string;
    };
    licenseNumber?: string; // encrypted
    specializations?: string[];
    settings?: {
        language: 'id' | 'en';
        notifications: boolean;
        theme: 'light' | 'dark' | 'auto';
    };
    emailVerified: boolean;
    isActive: boolean;
    createdAt: Timestamp;
    lastLoginAt?: Timestamp;
    metadata?: Record<string, unknown>;
}

// ============= PRESCRIPTION MODELS =============

export interface Prescription {
    prescriptionId: string;
    userId: string;
    patientHash: string; // SHA-256 hash, NOT original ID
    patientAge: number;
    patientWeight?: number;
    patientGender?: 'M' | 'F' | 'O';
    diagnosisCode?: string;
    diagnosisText: string;
    antibiotic: string;
    antibioticClass?: string;
    doseMg: number;
    frequency: string;
    durationDays: number;
    route: 'oral' | 'IV' | 'IM' | 'topical' | 'subcutaneous';
    allergies?: string[];
    comorbidities?: string[];
    isPregnant?: boolean;
    isLactating?: boolean;
    prescriptionImageUrl?: string;
    source: 'manual' | 'ocr' | 'ehr';
    location?: {
        region: string;
        city: string;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ============= REVIEW MODELS =============

export interface ReviewResult {
    reviewId: string;
    prescriptionId: string;
    userId: string;
    score: number; // 0-100
    riskLevel: 'green' | 'yellow' | 'red';
    explainability: Array<{
        label: string;
        severity: 'info' | 'warning' | 'danger';
        guidelineReference?: string;
    }>;
    suggestedActions: string[];
    finalDecision: 'approve' | 'clarify' | 'reject' | 'modified';
    modifiedFields?: Record<string, { before: unknown; after: unknown }>;
    reviewerNotes?: string;
    reviewDurationSec?: number;
    modelVersion?: string;
    createdAt: Timestamp;
}

// ============= COUNSELING MODELS =============

export interface CounselingOutput {
    counselingId: string;
    prescriptionId: string;
    userId: string;
    format: 'short' | 'standard' | 'whatsapp' | 'pdf';
    language: 'id' | 'en' | 'jw' | 'su';
    literacyLevel: 'basic' | 'standard' | 'advanced';
    scriptText: string;
    keyPoints: string[];
    wasEdited: boolean;
    deliveryMethod?: 'verbal' | 'printed' | 'whatsapp' | 'email';
    pdfUrl?: string;
    sentViaWhatsApp?: boolean;
    patientAcknowledged?: boolean;
    createdAt: Timestamp;
}

// ============= DEMAND MODELS =============

export interface DemandReport {
    reportId: string;
    userId: string;
    region: string;
    category: 'respiratory' | 'gastrointestinal' | 'uti' | 'skin' | 'dental' | 'other';
    drugRequested: string;
    wasDispensed: boolean;
    refusalReason?: string;
    patientReaction?: 'accepted' | 'angry' | 'confused' | 'went-elsewhere';
    createdAt: Timestamp;
}

// ============= THERAPY FAILURE MODELS =============

export interface TherapyFailure {
    failureId: string;
    prescriptionId?: string;
    userId: string;
    patientHash: string;
    region: string;
    originalAntibiotic: string;
    diagnosisText: string;
    daysUntilReturn: number;
    symptoms: string;
    subsequentTreatment?: string;
    createdAt: Timestamp;
}

// ============= LEARNING MODELS =============

export interface LearningRecord {
    recordId: string;
    userId: string;
    moduleId: string;
    moduleTitle: string;
    scorePre?: number;
    scorePost: number;
    passed: boolean;
    timeSpentMinutes?: number;
    certificateUrl?: string;
    completedAt: Timestamp;
}

// ============= GUIDELINE MODELS =============

export interface Guideline {
    guidelineId: string;
    title: string;
    category: string;
    organism?: string;
    firstLineAntibiotics: string[];
    secondLineAntibiotics?: string[];
    contraindicatedIn?: string[];
    dosageRecommendations?: Record<string, unknown>;
    durationDays?: { min: number; max: number };
    sourceUrl?: string;
    publishedAt: Timestamp;
    isActive: boolean;
}

// ============= FORM INPUT TYPES =============

export interface PrescriptionInput {
    diagnosis: string;
    antibiotic: string;
    doseMg: number;
    frequency: string;
    durationDays: number;
    route: string;
    patientAge: number;
    patientWeight?: number;
    patientGender?: 'M' | 'F' | 'O';
    allergies?: string[];
    comorbidities?: string[];
    isPregnant?: boolean;
    isLactating?: boolean;
}

export interface CounselingInput {
    prescriptionId: string;
    format: 'short' | 'standard' | 'whatsapp';
    language: 'id' | 'en';
    literacyLevel: 'basic' | 'standard' | 'advanced';
}

export interface DemandReportInput {
    category: 'respiratory' | 'gastrointestinal' | 'uti' | 'skin' | 'dental' | 'other';
    drugRequested: string;
    wasDispensed: boolean;
    refusalReason?: string;
    patientReaction?: 'accepted' | 'angry' | 'confused' | 'went-elsewhere';
    region: string;
}
