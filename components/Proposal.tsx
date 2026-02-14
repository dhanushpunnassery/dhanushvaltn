'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Proposal() {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNoHover = () => {
        // Random position within 150px
        const randomX = Math.random() * 300 - 150;
        const randomY = Math.random() * 200 - 100;
        setNoPosition({ x: randomX, y: randomY });
    };

    const handleYes = () => {
        setShowPopup(true);
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <section className="py-24 px-4 bg-rose-900 text-white relative overflow-hidden text-center">
            {/* Background floating hearts */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
                        animate={{ y: '-10vh' }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 10
                        }}
                        className="absolute"
                    >
                        <Heart className="fill-current w-8 h-8" />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="mb-12"
                >
                    <Heart className="w-20 h-20 text-rose-400 mx-auto mb-8 animate-pulse fill-current" />
                    <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">
                        One Last Question...
                    </h2>
                    <p className="text-rose-200 text-xl md:text-2xl font-serif italic max-w-2xl mx-auto mb-16">
                        "Every moment since I met you has been a dream come true. You're my today and all of my tomorrows."
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[150px]">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYes}
                        className="bg-white text-rose-900 px-12 py-5 rounded-full font-bold text-2xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-rose-50 transition-all flex items-center gap-3"
                    >
                        Yes, Forever! ❤️
                    </motion.button>

                    <motion.button
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onMouseEnter={handleNoHover}
                        onTouchStart={handleNoHover}
                        className="bg-rose-800/40 text-rose-200 border-2 border-rose-700/50 px-12 py-5 rounded-full font-bold text-2xl cursor-default"
                        style={{ position: 'relative' }}
                    >
                        No
                    </motion.button>
                </div>
            </div>

            {/* GRAND POPUP */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white rounded-[3rem] overflow-hidden max-w-2xl w-full relative p-8 md:p-16 text-center shadow-[0_0_50px_rgba(255,100,100,0.5)] border-4 border-rose-200"
                        >
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <div className="mb-8">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Heart className="w-24 h-24 text-rose-500 fill-current mx-auto" />
                                </motion.div>
                            </div>

                            <h3 className="text-4xl md:text-6xl font-serif font-bold text-rose-900 mb-8 leading-tight">
                                YOU'VE MADE ME THE HAPPIEST!
                            </h3>

                            <div className="space-y-6 text-gray-700 font-serif text-lg md:text-xl italic leading-relaxed">
                                <p>"Meeting you was fate, becoming your friend was a choice, but falling in love with you was beyond my control."</p>
                                <p>"I promise to cherish you, respect you, and love you more with every heartbeat. You are my home, my peace, and my everything."</p>
                                <p className="text-rose-600 font-bold not-italic text-2xl">Forever Yours, Kuttan ❤️</p>
                            </div>

                            <div className="mt-12 flex justify-center gap-4 text-rose-400">
                                <Sparkles className="w-8 h-8 animate-pulse" />
                                <Sparkles className="w-12 h-12" />
                                <Sparkles className="w-8 h-8 animate-pulse" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
