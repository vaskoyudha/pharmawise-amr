import "dotenv/config";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type {
  DemandReport,
  Prescription,
  ReviewResult,
  UserProfile,
} from "../../src/types/firestore";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
  throw new Error("Missing Firebase admin credentials in env variables.");
}

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

const db = getFirestore();

async function seed() {
  const users: Record<string, UserProfile> = {
    pharmCommunity: {
      displayName: "Alya, Apt.",
      email: "alya@example.com",
      role: "community",
      organization: "Apotek Sehat Sentosa",
      location: "Jakarta",
      createdAt: new Date().toISOString(),
    },
    pharmHospital: {
      displayName: "Drg. Bram",
      email: "bram@example.com",
      role: "hospital",
      organization: "RS Harapan Bangsa",
      location: "Bandung",
      createdAt: new Date().toISOString(),
    },
    regulator: {
      displayName: "Ditjen Farmalkes",
      email: "regulator@example.com",
      role: "regulator",
      organization: "Kemenkes",
      location: "Nasional",
      createdAt: new Date().toISOString(),
    },
  };

  const batch = db.batch();

  Object.entries(users).forEach(([id, profile]) => {
    batch.set(db.collection("users").doc(id), profile);
  });

  const guidelineRef = db.collection("guidelines").doc("pediatric-ispa");
  batch.set(guidelineRef, {
    title: "PPOK & ISPA ringan",
    summary: "Gunakan amoksisilin 5-7 hari bila indikasi bakteri kuat.",
    updatedAt: new Date().toISOString(),
    link: "https://example.com/guidelines/ispa",
  });

  const campaignAssetRef = db.collection("campaignAssets").doc("flu-season");
  batch.set(campaignAssetRef, {
    title: "Poster Flu Musim Hujan",
    type: "poster",
    url: "https://storage.googleapis.com/pharmawise-assets/poster-flu.png",
    tags: ["flu", "ISPA", "edukasi"],
    updatedAt: new Date().toISOString(),
  });

  const prescriptionRef = db.collection("prescriptions").doc();
  const prescription: Prescription = {
    diagnosis: "ISPA ringan",
    antibiotic: "Amoxicillin",
    dose: "500 mg",
    duration: 7,
    route: "oral",
    patientAge: 32,
    patientWeight: 58,
    allergies: [],
    createdAt: new Date().toISOString(),
    userId: "pharmCommunity",
  };

  batch.set(prescriptionRef, prescription);

  const review: ReviewResult = {
    prescriptionId: prescriptionRef.id,
    score: 72,
    riskLevel: "yellow",
    reasons: [
      { label: "Durasi perlu dikonfirmasi", severity: "warning" },
      { label: "Data alergi tidak lengkap", severity: "info" },
    ],
    suggestedActions: ["Hubungi dokter untuk klarifikasi", "Edukasi pasien soal durasi"],
    finalDecision: "clarify",
    createdAt: new Date().toISOString(),
  };

  batch.set(db.collection("reviewResults").doc(), review);

  const demandReports: DemandReport[] = [
    {
      userId: "pharmCommunity",
      category: "Flu",
      drugRequested: "Ciprofloxacin",
      region: "Jakarta Timur",
      createdAt: new Date().toISOString(),
    },
    {
      userId: "pharmCommunity",
      category: "Sakit gigi",
      drugRequested: "Amoxicillin",
      region: "Jakarta Timur",
      createdAt: new Date().toISOString(),
    },
  ];

  demandReports.forEach((report) => {
    batch.set(db.collection("demandReports").doc(), report);
  });

  await batch.commit();
  console.log("Firestore seed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

