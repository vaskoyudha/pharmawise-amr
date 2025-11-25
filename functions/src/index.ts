import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { format } from "date-fns";
import { z } from "zod";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const prescriptionSchema = z.object({
  diagnosis: z.string().min(3),
  antibiotic: z.string().min(2),
  doseMg: z.number().nonnegative(),
  frequency: z.string().min(1),
  durationDays: z.number().positive(),
  route: z.string().min(1),
  patientAge: z.number().nonnegative(),
  patientWeight: z.number().nonnegative().optional(),
  allergies: z.array(z.string()).optional(),
});

const counselingSchema = prescriptionSchema.extend({
  literacyLevel: z.enum(["basic", "standard", "advanced"]),
  format: z.enum(["short", "standard", "whatsapp"]),
  language: z.enum(["id", "en"]),
});

const symptomSchema = z.object({
  mode: z.enum(["cekGejala", "tanyaAntibiotik"]),
  symptoms: z.array(z.string()).optional(),
  durationDays: z.number().optional(),
  redFlags: z.array(z.string()).optional(),
  question: z.string().optional(),
});

const demandForecastSchema = z.object({
  region: z.string(),
  horizonWeeks: z.number().min(4).max(12).default(8),
});

type Explainability = {
  label: string;
  severity: "info" | "warning" | "danger";
};

function buildExplainability(payload: z.infer<typeof prescriptionSchema>): Explainability[] {
  const reasons: Explainability[] = [];

  if (payload.durationDays > 7) {
    reasons.push({
      label: "Durasi melebihi rekomendasi umum (>7 hari)",
      severity: "warning",
    });
  }

  if (payload.patientAge < 8 && payload.route === "oral-capsule") {
    reasons.push({
      label: "Pasien anak <8 tahun diberikan sediaan kapsul",
      severity: "danger",
    });
  }

  if ((payload.allergies ?? []).some((item) => payload.antibiotic.toLowerCase().includes(item.toLowerCase()))) {
    reasons.push({
      label: "Antibiotik berpotensi menyebabkan alergi terlapor",
      severity: "danger",
    });
  }

  if (!payload.frequency.match(/\d+x/i)) {
    reasons.push({
      label: "Frekuensi tidak jelas, butuh klarifikasi",
      severity: "info",
    });
  }

  return reasons;
}

export const scorePrescription = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = prescriptionSchema.parse(req.body);
    const explainability = buildExplainability(payload);

    let score = 85;
    explainability.forEach((reason) => {
      score -= reason.severity === "danger" ? 30 : reason.severity === "warning" ? 15 : 5;
    });
    score = Math.max(20, Math.min(score, 100));

    const riskLevel = score >= 70 ? "green" : score >= 40 ? "yellow" : "red";

    res.json({
      score,
      riskLevel,
      explainability,
      suggestions: [
        "Konfirmasi indikasi klinis dengan dokter",
        "Pertimbangkan durasi minimal efektif",
        "Lengkapi data berat badan jika tersedia",
      ],
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export const generateCounselingScript = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = counselingSchema.parse(req.body);
    const intro =
      payload.language === "id"
        ? `Halo, saya ingin menjelaskan penggunaan ${payload.antibiotic}.`
        : `Hi, I'd like to walk you through ${payload.antibiotic}.`;
    const dosage = `Dosis: ${payload.doseMg} mg ${payload.frequency} selama ${payload.durationDays} hari via ${payload.route}.`;
    const adherence =
      payload.language === "id"
        ? "Mohon jangan menghentikan obat sebelum waktunya meski sudah membaik."
        : "Please avoid stopping early even when you feel better.";
    const redFlags =
      payload.language === "id"
        ? "Segera kembali bila muncul ruam berat, sesak napas, atau demam tidak turun."
        : "Return immediately if you develop severe rash, shortness of breath, or persistent fever.";

    const baseScript = [intro, dosage, adherence, redFlags].join(" ");
    const formatSuffix =
      payload.format === "short"
        ? " (Ringkasan 20 detik)"
        : payload.format === "whatsapp"
        ? " (Pesan siap kirim WhatsApp)"
        : " (Penjelasan standar 60 detik)";

    res.json({
      script: `${baseScript}${formatSuffix}`,
      keyPoints: [
        "Tujuan obat dan cara kerja ringkas",
        "Cara minum dan larangan menghentikan dini",
        "Efek samping umum + red flags",
      ],
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export const publicChatbot = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = symptomSchema.parse(req.body);
    const responses: string[] = [];

    if (payload.mode === "cekGejala") {
      const hasRedFlag = (payload.redFlags ?? []).some((flag) =>
        ["sesak", "kejang", "darah", "demam tinggi"].includes(flag.toLowerCase())
      );
      if (hasRedFlag) {
        responses.push("Terdapat tanda bahaya. Segera ke IGD atau fasilitas kesehatan terdekat.");
      } else if ((payload.durationDays ?? 0) <= 3) {
        responses.push("Gejala masih ringan, fokus pada istirahat, hidrasi, dan terapi suportif.");
      } else {
        responses.push("Pertimbangkan konsultasi dokter bila keluhan tak membaik >3 hari.");
      }
      responses.push("Antibiotik tidak diperlukan untuk mayoritas infeksi virus seperti flu.");
    } else {
      responses.push("Antibiotik harus sesuai resep dokter dan hasil pemeriksaan.");
      responses.push(
        `Pertanyaan Anda: ${payload.question ?? "tidak ada detail"} — sarankan konsultasi farmasis/dokter.`
      );
    }

    res.json({
      replies: responses,
      suggestedActions: ["Jaga pola hidup sehat", "Hindari membeli antibiotik tanpa resep"],
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export const demandForecast = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const payload = demandForecastSchema.parse(req.body);
    const today = new Date();
    const weeks = payload.horizonWeeks;

    const points = Array.from({ length: weeks }).map((_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() + index * 7);
      const base = 50 + 20 * Math.sin(index / 2);
      const random = Math.random() * 10;
      return {
        week: format(date, "dd MMM"),
        pressureIndex: Math.round(base + random),
      };
    });

    res.json({
      region: payload.region,
      generatedAt: today.toISOString(),
      horizonWeeks: weeks,
      points,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});


