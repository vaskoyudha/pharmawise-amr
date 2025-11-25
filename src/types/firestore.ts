export type UserRole = "community" | "hospital" | "regulator" | "public";

export type UserProfile = {
  displayName: string;
  email: string;
  role: UserRole;
  organization?: string;
  location?: string;
  createdAt: string;
};

export type Prescription = {
  diagnosis: string;
  antibiotic: string;
  dose: string;
  duration: number;
  route: string;
  patientAge: number;
  patientWeight?: number;
  allergies?: string[];
  createdAt: string;
  userId: string;
};

export type ReviewResult = {
  prescriptionId: string;
  score: number;
  riskLevel: "green" | "yellow" | "red";
  reasons: { label: string; severity: "info" | "warning" | "danger" }[];
  suggestedActions: string[];
  finalDecision: "approve" | "clarify" | "reject";
  createdAt: string;
};

export type CounselingOutput = {
  prescriptionId: string;
  format: "short" | "standard" | "whatsapp";
  script: string;
  edited: boolean;
  createdAt: string;
};

export type DemandReport = {
  userId: string;
  category: string;
  drugRequested: string;
  region: string;
  createdAt: string;
};

export type TherapyFailureReport = {
  prescriptionId: string;
  region: string;
  summary: string;
  createdAt: string;
};

export type LearningRecord = {
  userId: string;
  moduleId: string;
  scorePre: number;
  scorePost: number;
  certificateUrl?: string;
  createdAt: string;
};


