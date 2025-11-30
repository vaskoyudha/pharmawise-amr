// src/lib/chatbot/educationContent.ts

/**
 * Educational Content Library
 * AMR awareness and antibiotic stewardship education
 */

export interface EducationTopic {
    id: string;
    title: string;
    content: string;
    emoji: string;
    relatedTopics?: string[];
    targetAudience?: 'general' | 'patient' | 'caregiver';
}

export const EDUCATION_LIBRARY: Record<string, EducationTopic> = {
    // Core AMR Concepts
    'what-is-amr': {
        id: 'what-is-amr',
        title: 'Apa itu Resistensi Antimikroba (AMR)?',
        emoji: '🦠',
        content: `Resistensi Antimikroba (AMR) terjadi ketika bakteri, virus, jamur menjadi "kebal" terhadap obat yang biasanya bisa membunuh mereka.

**Kenapa Berbahaya?**
• Infeksi jadi sulit diobati
• Pengobatan lebih lama dan mahal
• Risiko kematian meningkat

**Penyebab Utama:**
• Penggunaan antibiotik berlebihan
• Penggunaan antibiotik yang tidak tepat
• Tidak menghabiskan antibiotik sesuai resep

**Yang Bisa Kita Lakukan:**
✓ Gunakan antibiotik HANYA dengan resep dokter
✓ Habiskan antibiotik sesuai petunjuk (jangan berhenti sendiri)
✓ Jangan minta antibiotik untuk flu/batuk pilek
✓ Jaga kebersihan untuk cegah infeksi`,
        relatedTopics: ['why-not-for-flu', 'complete-course'],
        targetAudience: 'general',
    },

    'why-not-for-flu': {
        id: 'why-not-for-flu',
        title: 'Kenapa Antibiotik Tidak untuk Flu?',
        emoji: '🤧',
        content: `**Fakta:** Flu, pilek, dan kebanyakan batuk disebabkan oleh VIRUS, bukan bakteri.

**Antibiotik HANYA bekerja melawan BAKTERI.**

**Kalau minum antibiotik untuk flu:**
❌ Tidak akan mempercepat sembuh
❌ Malah membunuh bakteri baik di tubuh
❌ Meningkatkan risiko resistensi
❌ Bisa sebabkan efek samping (diare, alergi)

**Yang Benar untuk Flu/Pilek:**
✓ Istirahat cukup (tidur 7-8 jam)
✓ Minum banyak air putih
✓ Makan bergizi
✓ Kumur air garam untuk sakit tenggorokan
✓ Paracetamol jika demam/nyeri

**KAPAN PERLU KE DOKTER:**
• Demam >3 hari atau >39°C
• Sesak napas
• Dahak kuning/hijau kental
• Gejala memburuk setelah 7 hari`,
        relatedTopics: ['viral-vs-bacterial', 'self-care-tips'],
        targetAudience: 'patient',
    },

    'viral-vs-bacterial': {
        id: 'viral-vs-bacterial',
        title: 'Bedanya Infeksi Virus vs Bakteri',
        emoji: '🔬',
        content: `**INFEKSI VIRUS:**
• Biasanya sembuh sendiri 7-10 hari
• Gejala: pilek, batuk kering, nyeri otot, lemas
• Demam biasanya rendah (<38.5°C)
• Tidak butuh antibiotik
• Contoh: Flu, pilek, COVID-19

**INFEKSI BAKTERI:**
• Butuh antibiotik untuk sembuh
• Gejala: demam tinggi, dahak kuning/hijau, nyeri hebat
• Bisa jadi komplikasi dari infeksi virus
• Harus diresepkan dokter
• Contoh: Radang tenggorokan strep, pneumonia bakteri

**TANDA BUTUH ANTIBIOTIK (hanya dokter yang tahu pasti):**
• Demam tinggi berkepanjangan
• Dahak berwarna dengan konsistensi kental
• Gejala tidak membaik >10 hari
• Gejala memburuk setelah awalnya membaik

**INGAT:** Jangan self-diagnose! Konsultasi dokter untuk memastikan.`,
        relatedTopics: ['why-not-for-flu', 'when-antibiotics-needed'],
        targetAudience: 'general',
    },

    'complete-course': {
        id: 'complete-course',
        title: 'Kenapa Harus Habiskan Antibiotik?',
        emoji: '💊',
        content: `**MITOS:** "Sudah sembuh, antibiotik sisa dibuang saja"
**FAKTA:** Ini berbahaya!

**Kenapa Harus Dihabiskan:**
• Bakteri yang masih hidup bisa jadi resisten
• Infeksi bisa kembali lebih parah
• Bakteri resisten bisa menular ke orang lain

**Aturan Emas:**
✓ Minum sesuai jadwal (mis: 3x sehari tiap 8 jam)
✓ Habiskan semua tablet/kapsul
✓ Jangan skip dosis
✓ Jangan stop meski sudah merasa sembuh
✓ Set alarm untuk tidak lupa

**KAPAN BOLEH BERHENTI:**
• Hanya jika dokter bilang boleh berhenti
• Jika ada reaksi alergi parah (langsung ke dokter)

**JANGAN PERNAH:**
❌ Simpan antibiotik sisa untuk nanti
❌ Berbagi antibiotik dengan orang lain
❌ Beli antibiotik tanpa resep

**Ingat:** Menghabiskan antibiotik = melindungi diri sendiri dan orang lain dari AMR!`,
        relatedTopics: ['what-is-amr', 'proper-usage'],
        targetAudience: 'patient',
    },

    'self-care-respiratory': {
        id: 'self-care-respiratory',
        title: 'Perawatan Batuk Pilek di Rumah',
        emoji: '🏠',
        content: `**Untuk Batuk Pilek (Viral):**

**Yang Harus Dilakukan:**
✓ Istirahat cukup (7-8 jam tidur)
✓ Minum air putih 8-10 gelas/hari
✓ Makan bergizi (sayur, buah, protein)
✓ Kumur air garam hangat 3x sehari
✓ Hirup uap air hangat
✓ Madu 1-2 sendok untuk batuk (>1 tahun)

**Obat yang Aman:**
✓ Paracetamol untuk demam/nyeri (sesuai dosis)
✓ Lozenges untuk sakit tenggorokan
✓ Vitamin C 500mg/hari

**Yang Harus Dihindari:**
❌ Antibiotik tanpa resep
❌ Merokok
❌ Tempat ber-AC terlalu dingin
❌ Minum es/dingin
❌ Begadang

**KAPAN KE DOKTER:**
• Demam >39°C atau >3 hari
• Sesak napas / dada nyeri
• Batuk darah
• Gejala memburuk setelah 7 hari
• Dahak kuning/hijau kental`,
        relatedTopics: ['why-not-for-flu'],
        targetAudience: 'patient',
    },

    'when-antibiotics-needed': {
        id: 'when-antibiotics-needed',
        title: 'Kapan Antibiotik Benar-benar Diperlukan?',
        emoji: '⚕️',
        content: `**Antibiotik HANYA untuk infeksi BAKTERI yang terbukti.**

**Contoh Kondisi yang Mungkin Butuh Antibiotik:**
• Pneumonia (radang paru) bakteri
• Infeksi saluran kemih (ISK)
• Radang tenggorokan Strep
• Infeksi kulit bakteri
• Sinusitis bakteri (>10 hari)

**Yang TIDAK Butuh Antibiotik:**
• Flu dan pilek
• Kebanyakan batuk dan bronkitis
• Kebanyakan sakit tenggorokan
• Sakit telinga ringan
• Diare viral

**Proses yang Benar:**
1. Periksa ke dokter
2. Dokter diagnosis (mungkin perlu lab)
3. Jika bakteri → resep antibiotik
4. Beli di apotek dengan resep
5. Minum sesuai aturan sampai habis

**Red Flags (Langsung ke Dokter):**
🚨 Demam tinggi >3 hari
🚨 Sesak napas
🚨 Nyeri dada
🚨 Batuk darah
🚨 Gejala sangat memburuk

**Ingat:** Hanya dokter yang bisa memutuskan perlu antibiotik atau tidak!`,
        relatedTopics: ['viral-vs-bacterial', 'complete-course'],
        targetAudience: 'patient',
    },
};

/**
 * Get education content based on context
 */
export function getRelevantEducation(symptoms: string, conversationContext?: string): EducationTopic | null {
    const lower = symptoms.toLowerCase() + ' ' + (conversationContext || '').toLowerCase();

    // Flu/cold symptoms → explain why not antibiotics
    if (lower.includes('flu') || lower.includes('pilek') || lower.includes('batuk') && lower.includes('kering')) {
        return EDUCATION_LIBRARY['why-not-for-flu'];
    }

    // Questions about AMR
    if (lower.includes('resisten') || lower.includes('amr') || lower.includes('kebal')) {
        return EDUCATION_LIBRARY['what-is-amr'];
    }

    // Questions about stopping antibiotics
    if (lower.includes('berhenti') || lower.includes('sisa') || lower.includes('habiskan')) {
        return EDUCATION_LIBRARY['complete-course'];
    }

    // Self-care questions
    if (lower.includes('cara') && (lower.includes('rawat') || lower.includes('obati'))) {
        return EDUCATION_LIBRARY['self-care-respiratory'];
    }

    return null;
}

/**
 * Get all education topics
 */
export function getAllTopics(): EducationTopic[] {
    return Object.values(EDUCATION_LIBRARY);
}

/**
 * Get topic by ID
 */
export function getTopicById(id: string): EducationTopic | null {
    return EDUCATION_LIBRARY[id] || null;
}
