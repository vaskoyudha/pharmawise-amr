"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type ChatResponse = {
  replies: string[];
  suggestedActions: string[];
};

export function ChatbotPanel({ mode }: { mode: "cekGejala" | "tanyaAntibiotik" }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);

  const ask = async () => {
    if (!question) return;
    setLoading(true);
    const result = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, question, symptoms: [question], durationDays: 2 }),
    });
    const data = await result.json();
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Textarea
        rows={5}
        value={question}
        placeholder={mode === "cekGejala" ? "Tulis gejala dan durasinya..." : "Tulis pertanyaan seputar antibiotik..."}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button onClick={ask} disabled={loading}>
        {loading ? "Sedang memikirkan..." : "Kirim ke Chatbot"}
      </Button>
      {response && (
        <motion.div className="space-y-3 rounded-2xl border border-white/10 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {response.replies?.map((line: string, idx: number) => (
            <p key={idx} className="text-sm text-white/80">
              {line}
            </p>
          ))}
          <div className="text-xs text-white/50">
            {response.suggestedActions?.map((action) => (
              <span key={action} className="mr-2 rounded-full border border-white/10 px-3 py-1">
                {action}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

