'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface QuickRepliesProps {
    options: string[];
    onSelect: (option: string) => void;
}

export function QuickReplies({ options, onSelect }: QuickRepliesProps) {
    if (options.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-4"
        >
            {options.map((option, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <Button
                        onClick={() => onSelect(option)}
                        variant="secondary"
                        className="rounded-full bg-white/5 border border-white/20 text-white/80 hover:bg-aurora-500/20 hover:border-aurora-400 hover:text-white text-sm px-4 py-2 h-auto"
                    >
                        {option}
                    </Button>
                </motion.div>
            ))}
        </motion.div>
    );
}
