// src/app/api/counseling/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
    console.warn('⚠️ GEMINI_API_KEY is not set in environment variables');
}

interface CounselingParams {
    diagnosis: string;
    antibiotic: string;
    doseMg: number;
    frequency: string;
    durationDays: number;
    format: 'short' | 'standard' | 'whatsapp';
    language: 'id' | 'en';
    literacyLevel: 'basic' | 'standard' | 'advanced';
}

export async function POST(request: NextRequest) {
    try {
        // Check API key
        if (!API_KEY) {
            return NextResponse.json(
                {
                    error: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env.local',
                    details: 'Check the .env.local file and restart the dev server'
                },
                { status: 500 }
            );
        }

        // Parse request body
        const params: CounselingParams = await request.json();

        // Validate required fields
        if (!params.diagnosis || !params.antibiotic || !params.doseMg) {
            return NextResponse.json(
                { error: 'Missing required fields: diagnosis, antibiotic, doseMg' },
                { status: 400 }
            );
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Build prompt
        const prompt = buildPrompt(params);

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract key points
        const keyPoints = extractKeyPoints(text);

        return NextResponse.json({
            script: text,
            keyPoints,
        });
    } catch (error: any) {
        console.error('Gemini API Error:', error);

        // Handle specific API errors
        if (error?.message?.includes('API_KEY')) {
            return NextResponse.json(
                {
                    error: 'Invalid or missing Gemini API key',
                    details: 'Please verify your GEMINI_API_KEY in .env.local'
                },
                { status: 401 }
            );
        }

        return NextResponse.json(
            {
                error: 'Failed to generate counseling script',
                details: error.message || 'Unknown error'
            },
            { status: 500 }
        );
    }
}

function buildPrompt(params: CounselingParams): string {
    const {
        diagnosis,
        antibiotic,
        doseMg,
        frequency,
        durationDays,
        format,
        language,
        literacyLevel,
    } = params;

    // Language instruction
    const languageInstruction = language === 'id'
        ? 'Tuliskan dalam Bahasa Indonesia yang jelas dan mudah dipahami'
        : 'Write in clear and easy-to-understand English';

    // Literacy level instruction
    const literacyInstruction = {
        basic: 'Gunakan kata-kata yang sangat sederhana, hindari istilah medis',
        standard: 'Gunakan bahasa sehari-hari dengan sedikit istilah medis yang dijelaskan',
        advanced: 'Boleh gunakan terminologi medis yang tepat',
    }[literacyLevel];

    // Format instruction
    const formatInstruction = {
        short: 'Ringkas, maksimal 100 kata, fokus pada poin penting saja',
        standard: 'Penjelasan lengkap tapi tetap concise',
        whatsapp: 'Format untuk WhatsApp dengan emoji dan poin-poin pendek',
    }[format];

    return `Kamu adalah farmasis klinis yang expert dalam memberikan konseling obat kepada pasien.

Buat script konseling untuk pasien dengan informasi berikut:
- Diagnosis: ${diagnosis}
- Antibiotik: ${antibiotic} ${doseMg}mg
- Frekuensi: ${frequency} sehari
- Durasi: ${durationDays} hari

Instruksi:
- ${languageInstruction}
- ${literacyInstruction}
- ${formatInstruction}
- Wajib mencakup:
  1. Cara minum obat (waktu, dengan/tanpa makanan)
  2. Efek samping yang mungkin terjadi
  3. Kapan harus berhenti dan hubungi dokter
  4. Pentingnya menghabiskan antibiotik
- Gunakan tone yang empati dan suportif
- Hindari menakut-nakuti pasien
- Fokus pada kepatuhan pengobatan

${format === 'whatsapp' ? 'Gunakan format: emoji untuk setiap poin, paragraf pendek dengan line breaks' : ''}

Script:`;
}

function extractKeyPoints(script: string): string[] {
    // Simple extraction: split by numbers or bullets
    const lines = script.split('\n').filter(line => line.trim().length > 0);

    const keyPoints: string[] = [];

    for (const line of lines) {
        // Match lines starting with numbers (1., 2., etc.) or bullets (-,*)
        if (/^[\d\-\*•]\.?\s/.test(line.trim()) || /^[\-\*•]\s/.test(line.trim())) {
            keyPoints.push(line.trim().replace(/^[\d\-\*•]\.?\s/, '').replace(/^[\-\*•]\s/, ''));
        }
    }

    // If no key points found, take first 5 sentences
    if (keyPoints.length === 0) {
        const sentences = script.split(/[.!?]+/).filter(s => s.trim().length > 20);
        return sentences.slice(0, 5).map(s => s.trim());
    }

    return keyPoints.slice(0, 6); // Max 6 key points
}
