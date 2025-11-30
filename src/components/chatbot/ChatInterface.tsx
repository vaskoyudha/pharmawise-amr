'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { QuickReplies } from './QuickReplies';
import { Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
    isEmergency?: boolean;
}

const INITIAL_MESSAGE: Message = {
    role: 'bot',
    content: `Halo! 👋 Saya asisten virtual PharmaWise-AMR.

Saya di sini untuk membantu Anda memahami kapan antibiotik diperlukan dan kapan tidak.

**Apa yang bisa saya bantu hari ini?**
• Tanya tentang gejala yang Anda alami
• Pelajari tentang resistensi antibiotik
• Cari tahu kapan perlu ke dokter
• Dapatkan tips self-care yang aman`,
    timestamp: new Date(),
};

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [quickReplies, setQuickReplies] = useState<string[]>([
        'Saya punya gejala batuk pilek',
        'Kapan harus minum antibiotik?',
        'Apa itu resistensi antibiotik?',
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (userMessage: string) => {
        // Add user message
        const newUserMessage: Message = {
            role: 'user',
            content: userMessage,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newUserMessage]);
        setQuickReplies([]);
        setIsLoading(true);

        try {
            // Call chatbot API
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(1).map(msg => ({ // Skip initial message
                        role: msg.role,
                        content: msg.content,
                    })),
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText
                });
                throw new Error(`API request failed: ${response.status} - ${errorText.substring(0, 100)}`);
            }

            const data = await response.json();

            // Add bot response
            const botMessage: Message = {
                role: data.role,
                content: data.content,
                timestamp: new Date(data.timestamp),
                isEmergency: data.isEmergency,
            };

            setMessages(prev => [...prev, botMessage]);

            // Update quick replies
            if (data.quickReplies && data.quickReplies.length > 0) {
                setQuickReplies(data.quickReplies);
            }

        } catch (error) {
            console.error('Chat error:', error);

            // Error message
            setMessages(prev => [...prev, {
                role: 'bot',
                content: 'Maaf, saya mengalami gangguan teknis. Untuk keselamatan Anda, silakan konsultasi langsung dengan dokter atau farmasis terdekat. 🙏',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuickReplyClick = (reply: string) => {
        handleSendMessage(reply);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-midnight/50 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-white">PharmaWise Chatbot</h3>
                    <p className="text-xs text-white/50">Asisten Edukasi AMR</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                    <MessageBubble
                        key={index}
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                        isEmergency={message.isEmergency}
                    />
                ))}

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-white/50 text-sm"
                        >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sedang mengetik...</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick Replies */}
                {!isLoading && quickReplies.length > 0 && (
                    <QuickReplies
                        options={quickReplies}
                        onSelect={handleQuickReplyClick}
                    />
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput
                onSend={handleSendMessage}
                disabled={isLoading}
            />

            {/* Disclaimer */}
            <div className="px-6 py-3 border-t border-white/10 bg-midnight/30">
                <p className="text-xs text-white/30 text-center">
                    ⚠️ Chatbot ini untuk edukasi, bukan pengganti konsultasi dokter.
                </p>
            </div>
        </div>
    );
}
