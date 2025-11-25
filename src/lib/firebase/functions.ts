const baseUrl = process.env.FIREBASE_FUNCTIONS_BASE_URL;

type FetchOptions = {
  path: string;
  payload: unknown;
};

async function callFunction<T>({ path, payload }: FetchOptions): Promise<T> {
  if (!baseUrl) {
    // Fallback mock to keep local dev working without Firebase functions.
    return mockResponses(path) as T;
  }

  const response = await fetch(`${baseUrl}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error ?? "Unknown error from Firebase Function");
  }

  return response.json() as Promise<T>;
}

export async function scorePrescription(payload: Record<string, unknown>) {
  return callFunction<{ score: number; riskLevel: string; explainability: unknown; suggestions: string[] }>({
    path: "scorePrescription",
    payload,
  });
}

export async function generateCounseling(payload: Record<string, unknown>) {
  return callFunction<{ script: string; keyPoints: string[] }>({
    path: "generateCounselingScript",
    payload,
  });
}

export async function askChatbot(payload: Record<string, unknown>) {
  return callFunction<{ replies: string[]; suggestedActions: string[] }>({
    path: "publicChatbot",
    payload,
  });
}

export async function forecastDemand(payload: Record<string, unknown>) {
  return callFunction<{ points: Array<{ week: string; pressureIndex: number }> }>({
    path: "demandForecast",
    payload,
  });
}

function mockResponses(path: string) {
  if (path === "scorePrescription") {
    return {
      score: 78,
      riskLevel: "yellow",
      explainability: [
        { label: "Durasi >7 hari", severity: "warning" },
        { label: "Spektrum luas untuk ISPA ringan", severity: "danger" },
      ],
      suggestions: ["Evaluasi ulang indikasi", "Pertimbangkan de-eskalasi"],
    };
  }

  if (path === "generateCounselingScript") {
    return {
      script:
        "Halo, penggunaan amoksisilin 500 mg, diminum 3x sehari selama 5 hari. Tolong habiskan obat, jangan hentikan dini. Segera kembali jika muncul ruam atau demam tidak turun. (Ringkasan 20 detik)",
      keyPoints: ["Tujuan terapi", "Cara minum", "Red flags"],
    };
  }

  if (path === "publicChatbot") {
    return {
      replies: ["Kemungkinan besar infeksi virus, cukup istirahat & hidrasi.", "Antibiotik tidak diperlukan."],
      suggestedActions: ["Pantau gejala 48 jam", "Temui dokter jika makin berat"],
    };
  }

  if (path === "demandForecast") {
    return {
      points: Array.from({ length: 8 }).map((_, idx) => ({
        week: `Minggu ${idx + 1}`,
        pressureIndex: 50 + idx * 3,
      })),
    };
  }

  return {};
}

