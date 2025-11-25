"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.demandForecast = exports.publicChatbot = exports.generateCounselingScript = exports.scorePrescription = void 0;
const admin = __importStar(require("firebase-admin"));
const functions = __importStar(require("firebase-functions"));
const date_fns_1 = require("date-fns");
const zod_1 = require("zod");
if (admin.apps.length === 0) {
    admin.initializeApp();
}
const prescriptionSchema = zod_1.z.object({
    diagnosis: zod_1.z.string().min(3),
    antibiotic: zod_1.z.string().min(2),
    doseMg: zod_1.z.number().nonnegative(),
    frequency: zod_1.z.string().min(1),
    durationDays: zod_1.z.number().positive(),
    route: zod_1.z.string().min(1),
    patientAge: zod_1.z.number().nonnegative(),
    patientWeight: zod_1.z.number().nonnegative().optional(),
    allergies: zod_1.z.array(zod_1.z.string()).optional(),
});
const counselingSchema = prescriptionSchema.extend({
    literacyLevel: zod_1.z.enum(["basic", "standard", "advanced"]),
    format: zod_1.z.enum(["short", "standard", "whatsapp"]),
    language: zod_1.z.enum(["id", "en"]),
});
const symptomSchema = zod_1.z.object({
    mode: zod_1.z.enum(["cekGejala", "tanyaAntibiotik"]),
    symptoms: zod_1.z.array(zod_1.z.string()).optional(),
    durationDays: zod_1.z.number().optional(),
    redFlags: zod_1.z.array(zod_1.z.string()).optional(),
    question: zod_1.z.string().optional(),
});
const demandForecastSchema = zod_1.z.object({
    region: zod_1.z.string(),
    horizonWeeks: zod_1.z.number().min(4).max(12).default(8),
});
function buildExplainability(payload) {
    const reasons = [];
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
exports.scorePrescription = functions.https.onRequest(async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.generateCounselingScript = functions.https.onRequest((req, res) => {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
    try {
        const payload = counselingSchema.parse(req.body);
        const intro = payload.language === "id"
            ? `Halo, saya ingin menjelaskan penggunaan ${payload.antibiotic}.`
            : `Hi, I'd like to walk you through ${payload.antibiotic}.`;
        const dosage = `Dosis: ${payload.doseMg} mg ${payload.frequency} selama ${payload.durationDays} hari via ${payload.route}.`;
        const adherence = payload.language === "id"
            ? "Mohon jangan menghentikan obat sebelum waktunya meski sudah membaik."
            : "Please avoid stopping early even when you feel better.";
        const redFlags = payload.language === "id"
            ? "Segera kembali bila muncul ruam berat, sesak napas, atau demam tidak turun."
            : "Return immediately if you develop severe rash, shortness of breath, or persistent fever.";
        const baseScript = [intro, dosage, adherence, redFlags].join(" ");
        const formatSuffix = payload.format === "short"
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.publicChatbot = functions.https.onRequest((req, res) => {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }
    try {
        const payload = symptomSchema.parse(req.body);
        const responses = [];
        if (payload.mode === "cekGejala") {
            const hasRedFlag = (payload.redFlags ?? []).some((flag) => ["sesak", "kejang", "darah", "demam tinggi"].includes(flag.toLowerCase()));
            if (hasRedFlag) {
                responses.push("Terdapat tanda bahaya. Segera ke IGD atau fasilitas kesehatan terdekat.");
            }
            else if ((payload.durationDays ?? 0) <= 3) {
                responses.push("Gejala masih ringan, fokus pada istirahat, hidrasi, dan terapi suportif.");
            }
            else {
                responses.push("Pertimbangkan konsultasi dokter bila keluhan tak membaik >3 hari.");
            }
            responses.push("Antibiotik tidak diperlukan untuk mayoritas infeksi virus seperti flu.");
        }
        else {
            responses.push("Antibiotik harus sesuai resep dokter dan hasil pemeriksaan.");
            responses.push(`Pertanyaan Anda: ${payload.question ?? "tidak ada detail"} — sarankan konsultasi farmasis/dokter.`);
        }
        res.json({
            replies: responses,
            suggestedActions: ["Jaga pola hidup sehat", "Hindari membeli antibiotik tanpa resep"],
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.demandForecast = functions.https.onRequest((req, res) => {
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
                week: (0, date_fns_1.format)(date, "dd MMM"),
                pressureIndex: Math.round(base + random),
            };
        });
        res.json({
            region: payload.region,
            generatedAt: today.toISOString(),
            horizonWeeks: weeks,
            points,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
