'use client';

import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = 'Ketik gejala atau pertanyaan Anda...' }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-white/10 bg-midnight/50 backdrop-blur-xl p-4">
            <div className="flex items-end gap-3">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={1}
                    className="flex-1 resize-none rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-white placeholder:text-white/30 focus:border-aurora-300 focus:outline-none focus:ring-2 focus:ring-aurora-300/40 max-h-32"
                    style={{
                        minHeight: '48px',
                        height: 'auto',
                    }}
                />

                <Button
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                    className="h-12 w-12 rounded-2xl bg-gradient-to-r from-aurora-500 to-purple-600 p-0 flex items-center justify-center shadow-lg shadow-aurora-500/20 hover:shadow-aurora-500/40 transition-all"
                >
                    {disabled ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </Button>
            </div>
        </div>
    );
}
