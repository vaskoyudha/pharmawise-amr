import { ChatInterface } from '@/components/chatbot/ChatInterface';

export default function ChatbotPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-midnight via-midnight to-aurora-900 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(94,252,232,0.05),transparent_50%)]" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 py-8 relative z-10 max-w-5xl h-screen flex flex-col">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-aurora-300 bg-clip-text text-transparent font-premium mb-3">
                        Chatbot Edukasi AMR
                    </h1>
                    <p className="text-white/60 text-sm md:text-base">
                        Tanya tentang gejala Anda dan pelajari kapan antibiotik benar-benar diperlukan
                    </p>
                </div>

                {/* Chat Container */}
                <div className="flex-1 glass-panel border border-white/10 rounded-3xl overflow-hidden flex flex-col min-h-0">
                    <ChatInterface />
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="glass-panel p-4 border border-white/5 rounded-2xl">
                        <div className="text-2xl mb-2">🦠</div>
                        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Aman & Terpercaya</p>
                        <p className="text-xs text-white/50">Berbasis panduan WHO & CDC</p>
                    </div>

                    <div className="glass-panel p-4 border border-white/5 rounded-2xl">
                        <div className="text-2xl mb-2">🚨</div>
                        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Deteksi Darurat</p>
                        <p className="text-xs text-white/50">Alert otomatis untuk gejala serius</p>
                    </div>

                    <div className="glass-panel p-4 border border-white/5 rounded-2xl">
                        <div className="text-2xl mb-2">📚</div>
                        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Edukatif</p>
                        <p className="text-xs text-white/50">Pelajari tentang resistensi antibiotik</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
