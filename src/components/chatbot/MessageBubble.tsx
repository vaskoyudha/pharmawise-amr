'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
    isEmergency?: boolean;
}

export function MessageBubble({ role, content, timestamp, isEmergency }: MessageBubbleProps) {
    const isUser = role === 'user';
    const [formattedTime, setFormattedTime] = useState<string>('');

    useEffect(() => {
        // Format timestamp on client side only to avoid hydration mismatch
        setFormattedTime(timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, [timestamp]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
                {/* Message Bubble */}
                <div
                    className={`rounded-2xl px-5 py-3 ${isEmergency
                        ? 'bg-red-500/20 border-2 border-red-500'
                        : isUser
                            ? 'bg-aurora-500/20 border border-aurora-400/30'
                            : 'bg-white/10 border border-white/10'
                        }`}
                >
                    {/* Emergency Icon */}
                    {isEmergency && (
                        <div className="flex items-center gap-2 mb-2 text-red-400 font-bold">
                            <span className="text-2xl">🚨</span>
                            <span className="text-xs uppercase tracking-wider">Gejala Darurat</span>
                        </div>
                    )}

                    {/* Content with markdown-like formatting */}
                    <div className={`text-sm ${isUser ? 'text-white' : 'text-white/90'} whitespace-pre-wrap leading-relaxed`}>
                        {content.split('\n').map((line, i) => {
                            // Bold text **text**
                            if (line.includes('**')) {
                                const parts = line.split('**');
                                return (
                                    <p key={i} className="mb-1">
                                        {parts.map((part, j) => (
                                            j % 2 === 1 ? <strong key={j} className="font-bold text-aurora-200">{part}</strong> : part
                                        ))}
                                    </p>
                                );
                            }

                            // Bullet points
                            if (line.trim().startsWith('•') || line.trim().startsWith('✓') || line.trim().startsWith('❌')) {
                                return <p key={i} className="ml-2 mb-1">{line}</p>;
                            }

                            return <p key={i} className="mb-1">{line}</p>;
                        })}
                    </div>
                </div>

                {/* Timestamp */}
                <div className={`text-xs text-white/30 mt-1 ${isUser ? 'text-right' : 'text-left'} px-2`}>
                    {formattedTime}
                </div>
            </div>
        </motion.div>
    );
}
