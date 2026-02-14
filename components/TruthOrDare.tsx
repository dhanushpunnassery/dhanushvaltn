'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles, Wand2 } from 'lucide-react';

const TRUTH_PROMPTS = [
    "What was your first impression of me?",
    "What's your favorite memory of us together?",
    "What is the one thing that always makes you think of me?",
    "If you could describe our love in one word, what would it be?",
    "What's a small thing I do that makes you feel loved?",
    "What's the best dream you've ever had about us?",
    "What's one thing about our relationship that makes you proud?"
];

const DARE_PROMPTS = [
    "Send me a voice note saying 'I love you' in the most romantic way.",
    "Post a picture of us (or just me) with a sweet caption.",
    "Give me a 10-second virtual hug right now!",
    "Tell me three things you want us to do this year.",
    "Write a short, 4-line poem for me right now.",
    "Send me your favorite photo of us together.",
    "Tell me a secret you've never told me before."
];

export default function TruthOrDare() {
    const [mode, setMode] = useState<'selection' | 'result'>('selection');
    const [type, setType] = useState<'truth' | 'dare' | null>(null);
    const [prompt, setPrompt] = useState('');

    const handleSelect = (selectedType: 'truth' | 'dare') => {
        const prompts = selectedType === 'truth' ? TRUTH_PROMPTS : DARE_PROMPTS;
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setType(selectedType);
        setPrompt(randomPrompt);
        setMode('result');
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">Truth or Dare</h2>
                    <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full mb-6" />
                    <p className="text-rose-700 italic text-lg">A little game to bring us closer... ❤️</p>
                </motion.div>

                <div className="min-h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {mode === 'selection' ? (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, translateY: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSelect('truth')}
                                    className="group relative bg-white p-10 rounded-3xl shadow-xl border-2 border-rose-100 hover:border-rose-400 transition-all text-center"
                                >
                                    <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-500 transition-colors">
                                        <Sparkles className="w-8 h-8 text-rose-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-rose-900 mb-2">Truth</h3>
                                    <p className="text-rose-600/70 text-sm">Open your heart and speak the truth.</p>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, translateY: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSelect('dare')}
                                    className="group relative bg-white p-10 rounded-3xl shadow-xl border-2 border-pink-100 hover:border-pink-400 transition-all text-center"
                                >
                                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-500 transition-colors">
                                        <Wand2 className="w-8 h-8 text-pink-600 group-hover:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-rose-900 mb-2">Dare</h3>
                                    <p className="text-rose-600/70 text-sm">Take a romantic challenge for me.</p>
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-4 border-rose-100 max-w-xl w-full relative overflow-hidden"
                            >
                                {/* Decorative hearts */}
                                <div className="absolute top-4 left-4 text-rose-100">
                                    <Heart className="w-8 h-8 fill-current" />
                                </div>
                                <div className="absolute bottom-4 right-4 text-rose-100">
                                    <Heart className="w-8 h-8 fill-current" />
                                </div>

                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${type === 'truth' ? 'bg-rose-100 text-rose-600' : 'bg-pink-100 text-pink-600'
                                        }`}
                                >
                                    Your {type}
                                </motion.span>

                                <h3 className="text-2xl md:text-3xl font-serif text-rose-800 leading-relaxed mb-8">
                                    "{prompt}"
                                </h3>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setMode('selection')}
                                    className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-colors"
                                >
                                    Play Again
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
