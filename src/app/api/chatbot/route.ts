// src/app/api/chatbot/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { detectRedFlags } from '@/lib/chatbot/redFlagDetection';
import { getRelevantEducation } from '@/lib/chatbot/educationContent';

const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('⚠️ GEMINI_API_KEY is not set in environment variables');
}

const SYSTEM_PROMPT = `Kamu adalah asisten kesehatan virtual PharmaWise-AMR yang fokus pada edukasi AMR dan triage gejala yang aman.

PRINSIP UTAMA:
1. Keselamatan First: JANGAN PERNAH rekomendasikan antibiotik spesifik atau dosis
2. Empati: Bersikap hangat, pengertian, dan tidak menghakimi
3. Edukasi: Selalu jelaskan KENAPA, tidak hanya APA
4. Evidence-based: Gunakan panduan WHO/CDC untuk triage
5. Sensitif Budaya: Hormati kepercayaan kesehatan Indonesia

KEMAMPUAN ANDA:
- Assess gejala dan berikan panduan triage yang aman
- Edukasi tentang AMR dan penggunaan antibiotik yang tepat
- Deteksi red flags yang butuh perawatan darurat
- Berikan saran self-care berbasis evidensi
- Jawab pertanyaan tentang antibiotik dan infeksi

BATASAN ANDA:
- Anda TIDAK BISA mendiagnosis penyakit
- Anda TIDAK BISA meresepkan obat
- Anda TIDAK BISA menggantikan konsultasi dokter

FORMAT RESPON:
- Gunakan Bahasa Indonesia yang jelas
- Jawaban ringkas (maks 150 kata per pesan)
- Gunakan bullet points untuk list
- Gunakan emoji dengan hemat (😊, ✓, ⚠️)
- Selalu akhiri dengan pertanyaan atau langkah selanjutnya`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

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

    // 1. Red flag detection
    const redFlagResult = detectRedFlags(message);

    if (redFlagResult.isEmergency) {
      return NextResponse.json({
        role: 'bot',
        content: redFlagResult.emergencyMessage,
        isEmergency: true,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chatHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Baik, saya siap membantu dengan aman dan empati!' }] },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    let botMessage = response.text();

    // 3. Safety filter
    botMessage = applySafetyFilter(botMessage);

    // 4. Education content
    const education = getRelevantEducation(message, botMessage);

    // 5. Quick replies
    const quickReplies = generateQuickReplies(botMessage);

    return NextResponse.json({
      role: 'bot',
      content: botMessage,
      education: education ? {
        title: education.title,
        emoji: education.emoji,
        preview: education.content.substring(0, 200) + '...',
      } : null,
      quickReplies,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Chatbot API Error:', {
      message: error?.message,
      status: error?.status,
      stack: error?.stack,
      error: error
    });

    return NextResponse.json({
      role: 'bot',
      content: 'Maaf, saya mengalami gangguan. Untuk keselamatan Anda, silakan konsultasi dokter atau farmasis. 🙏',
      isError: true,
      errorDetail: process.env.NODE_ENV === 'development' ? error?.message : undefined,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

function applySafetyFilter(text: string): string {
  let filtered = text;

  // Remove dangerous patterns
  if (/(dosis|minum|pakai).*(amoxicillin|ciprofloxacin|azithromycin)/gi.test(filtered)) {
    filtered = filtered.replace(/(dosis|minum|pakai).*(amoxicillin|ciprofloxacin|azithromycin)/gi,
      '[REMOVED FOR SAFETY - Konsultasi dokter untuk dosis yang tepat]');
  }

  if (!filtered.includes('dokter')) {
    filtered += '\n\n⚠️ Konsultasi dokter/farmasis untuk diagnosis dan pengobatan yang tepat.';
  }

  return filtered;
}

function generateQuickReplies(botMessage: string): string[] {
  const lower = botMessage.toLowerCase();

  if (lower.includes('demam')) {
    return ['Ya, ada demam', 'Tidak demam'];
  }

  if (lower.includes('batuk')) {
    return ['Batuk kering', 'Batuk berdahak'];
  }

  return ['Ceritakan lebih', 'Pertanyaan lain', 'Terima kasih'];
}
