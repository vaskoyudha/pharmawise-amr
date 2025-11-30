// src/lib/chatbot/redFlagDetection.ts

/**
 * Red Flag Detection System
 * Identifies emergency symptoms requiring immediate medical attention
 */

interface RedFlag {
    category: 'respiratory' | 'cardiovascular' | 'neurological' | 'gastrointestinal' | 'infection' | 'other';
    keywords: string[];
    severity: 'critical' | 'urgent';
}

const RED_FLAGS: RedFlag[] = [
    // Respiratory
    {
        category: 'respiratory',
        keywords: [
            'sesak napas parah', 'tidak bisa bernapas', 'bibir biru', 'kuku biru',
            'batuk darah', 'dahak berdarah', 'napas berbunyi ngik', 'wheezing parah',
            'tidak bisa bicara karena sesak', 'dada terasa sangat berat'
        ],
        severity: 'critical',
    },

    // Cardiovascular
    {
        category: 'cardiovascular',
        keywords: [
            'nyeri dada', 'dada terasa ditekan', 'dada seperti diremas',
            'nyeri menjalar ke lengan', 'keringat dingin', 'pingsan', 'jantung berdebar sangat kencang',
            'detak jantung tidak teratur', 'pusing berputar sangat hebat'
        ],
        severity: 'critical',
    },

    // Neurological
    {
        category: 'neurological',
        keywords: [
            'kejang', 'kaku kuduk', 'leher kaku', 'tidak sadarkan diri',
            'penurunan kesadaran', 'bingung mendadak', 'bicara pelo tiba-tiba',
            'wajah mencong', 'lengan lumpuh', 'sakit kepala sangat hebat tiba-tiba',
            'penglihatan kabur tiba-tiba', 'double vision'
        ],
        severity: 'critical',
    },

    // Gastrointestinal
    {
        category: 'gastrointestinal',
        keywords: [
            'muntah darah', 'BAB hitam', 'BAB berdarah', 'feses hitam seperti aspal',
            'nyeri perut sangat hebat', 'perut keras seperti papan', 'perut kembung sangat parah',
            'muntah terus menerus', 'tidak bisa BAB berhari-hari dengan nyeri'
        ],
        severity: 'critical',
    },

    // Infection/Fever
    {
        category: 'infection',
        keywords: [
            'demam 40', 'demam sangat tinggi', 'menggigil hebat', 'gemetar hebat',
            'ruam dengan demam', 'bintik merah dengan demam', 'bengkak merah menyebar cepat',
            'luka bernanah banyak', 'demam lebih dari 5 hari'
        ],
        severity: 'urgent',
    },

    // Other emergencies
    {
        category: 'other',
        keywords: [
            'alergi parah', 'gatal seluruh badan tiba-tiba', 'bengkak wajah tiba-tiba',
            'lidah bengkak', 'sulit menelan tiba-tiba', 'trauma kepala', 'jatuh keras',
            'luka dalam', 'pendarahan tidak berhenti', 'tulang patah'
        ],
        severity: 'critical',
    },
];

export interface RedFlagResult {
    isEmergency: boolean;
    detected: string[];
    category?: string;
    severity?: 'critical' | 'urgent';
    emergencyMessage: string;
}

/**
 * Detect red flags in user message
 */
export function detectRedFlags(message: string): RedFlagResult {
    const lowerMessage = message.toLowerCase();
    const detectedFlags: string[] = [];
    let highestSeverity: 'critical' | 'urgent' | null = null;
    let detectedCategory: string | null = null;

    // Check each red flag
    for (const flag of RED_FLAGS) {
        for (const keyword of flag.keywords) {
            // Fuzzy matching - check if keyword appears in message
            if (lowerMessage.includes(keyword.toLowerCase())) {
                detectedFlags.push(keyword);

                // Track highest severity
                if (!highestSeverity || flag.severity === 'critical') {
                    highestSeverity = flag.severity;
                    detectedCategory = flag.category;
                }
            }
        }
    }

    const isEmergency = detectedFlags.length > 0;

    // Generate emergency message
    let emergencyMessage = '';
    if (isEmergency) {
        if (highestSeverity === 'critical') {
            emergencyMessage = `🚨 **GEJALA DARURAT TERDETEKSI**

Anda melaporkan gejala yang memerlukan pertolongan medis segera:
${detectedFlags.map(flag => `• ${flag}`).join('\n')}

**SEGERA KE IGD ATAU HUBUNGI 119**

Jangan tunda! Gejala ini bisa mengancam jiwa.

Catatan: Bawa seseorang untuk menemani Anda. Jangan berkendara sendiri.`;
        } else {
            emergencyMessage = `⚠️ **GEJALA SERIUS TERDETEKSI**

Anda melaporkan gejala yang memerlukan pemeriksaan dokter segera:
${detectedFlags.map(flag => `• ${flag}`).join('\n')}

**Saran:**
✓ Segera ke dokter hari ini (jangan tunda >24 jam)
✓ Jika memburuk, langsung ke IGD
✓ Catat semua gejala yang Anda alami

Ini bukan untuk menakut-nakuti, tapi untuk keselamatan Anda.`;
        }
    }

    return {
        isEmergency,
        detected: detectedFlags,
        category: detectedCategory || undefined,
        severity: highestSeverity || undefined,
        emergencyMessage,
    };
}

/**
 * Calculate symptom severity score (1-10)
 */
export function calculateSeverityScore(symptoms: string[]): number {
    let score = 0;

    const severityKeywords = {
        mild: ['sedikit', 'ringan', 'kadang', 'sesekali'],
        moderate: ['lumayan', 'cukup', 'mengganggu'],
        severe: ['parah', 'hebat', 'sangat', 'sekali', 'tidak tertahankan'],
    };

    symptoms.forEach(symptom => {
        const lower = symptom.toLowerCase();

        if (severityKeywords.severe.some(kw => lower.includes(kw))) {
            score += 3;
        } else if (severityKeywords.moderate.some(kw => lower.includes(kw))) {
            score += 2;
        } else if (severityKeywords.mild.some(kw => lower.includes(kw))) {
            score += 1;
        } else {
            score += 1.5; // Default moderate if no severity mentioned
        }
    });

    return Math.min(10, score);
}

/**
 * Check if symptoms suggest viral vs bacterial infection
 */
export function suggestInfectionType(symptoms: string): 'likely-viral' | 'likely-bacterial' | 'unclear' {
    const lower = symptoms.toLowerCase();

    const viralIndicators = [
        'pilek', 'hidung meler', 'batuk kering', 'sakit tenggorokan ringan',
        'demam rendah', 'nyeri otot', 'lemas', 'tidak ada dahak'
    ];

    const bacterialIndicators = [
        'dahak kuning', 'dahak hijau', 'demam tinggi', 'menggigil',
        'nyeri telinga parah', 'tenggorokan bernanah', 'batuk berdahak'
    ];

    let viralScore = 0;
    let bacterialScore = 0;

    viralIndicators.forEach(indicator => {
        if (lower.includes(indicator)) viralScore++;
    });

    bacterialIndicators.forEach(indicator => {
        if (lower.includes(indicator)) bacterialScore++;
    });

    if (viralScore > bacterialScore && viralScore >= 2) {
        return 'likely-viral';
    } else if (bacterialScore > viralScore && bacterialScore >= 2) {
        return 'likely-bacterial';
    } else {
        return 'unclear';
    }
}
