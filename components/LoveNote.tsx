'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export default function LoveNote() {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'won'>('idle');
    const [score, setScore] = useState(0);
    const TARGET_SCORE = 10;
    const [targets, setTargets] = useState<{ id: number; x: number; y: number; type: 'normal' | 'medium' | 'fast' | 'boss' }[]>([]);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'playing') return;

        // Logic for spawning hearts based on score
        const spawnHeart = () => {
            // Clean up old hearts to keep game performant
            setTargets(prev => prev.filter(t => Date.now() - t.id < 4000));

            // Spawn BOSS Heart (10th Heart)
            if (score === TARGET_SCORE - 1) {
                if (!targets.find(t => t.type === 'boss')) {
                    setTargets([{ id: Date.now(), x: 50, y: 50, type: 'boss' }]);
                }
                return;
            }

            // Difficulty Tiers
            const isFast = score === 8; // 9th Heart (Hard)
            const isMedium = score === 6 || score === 7; // 7th & 8th Hearts (Medium)

            const newHeart = {
                id: Date.now(),
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                type: isFast ? 'fast' as const : isMedium ? 'medium' as const : 'normal' as const,
            };

            setTargets((prev) => [...prev, newHeart]);
        };

        // Spawn rate based on difficulty
        let spawnRate = 1000; // Normal
        if (score === 6 || score === 7) spawnRate = 800; // Medium
        if (score === 8) spawnRate = 600; // Fast
        const interval = setInterval(spawnHeart, spawnRate);

        return () => clearInterval(interval);
    }, [gameState, score, targets]);

    const handleClickTarget = (id: number, type: string) => {
        // Special effects for high scores
        if (score === 8) { // Catching the 9th heart
            confetti({ particleCount: 50, spread: 50, origin: { x: 0.5, y: 0.5 }, colors: ['#FFD700'] }); // Gold confetti
        }

        setTargets((prev) => prev.filter((t) => t.id !== id));
        setScore((prev) => {
            const newScore = prev + 1;
            if (newScore >= TARGET_SCORE) {
                setGameState('won');
                // Grand Final Confetti
                const duration = 3000;
                const end = Date.now() + duration;
                const frame = () => {
                    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FF004D', '#FFF'] });
                    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FF004D', '#FFF'] });
                    if (Date.now() < end) requestAnimationFrame(frame);
                };
                frame();
            }
            return newScore;
        });
    };

    return (
        <section className="min-h-screen py-20 px-4 bg-rose-50 flex flex-col items-center justify-center relative overflow-hidden">

            <AnimatePresence mode="wait">
                {gameState === 'idle' && (
                    <motion.div
                        key="start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center z-10"
                    >
                        <h2 className="text-4xl font-serif text-rose-800 mb-6">A Secret Message Awaits...</h2>
                        <p className="text-lg text-rose-600 mb-8">Catch {TARGET_SCORE} Hearts to unlock your surprise!</p>
                        <button
                            onClick={() => setGameState('playing')}
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 text-xl"
                        >
                            Start Game 🎮
                        </button>
                    </motion.div>
                )}

                {gameState === 'playing' && (
                    <div className="fixed inset-0 z-20 bg-rose-50/90 cursor-crosshair overflow-hidden">
                        <div className="absolute top-10 left-0 right-0 text-center pointer-events-none">
                            <h3 className="text-3xl font-bold text-rose-600">Score: {score} / {TARGET_SCORE}</h3>
                            {score >= 6 && score <= 7 && <p className="text-orange-500 font-bold animate-pulse">Getting Faster! ⚡</p>}
                            {score === 8 && <p className="text-red-500 font-bold animate-pulse">Catch the Fast One! 🔥</p>}
                            {score === 9 && <p className="text-gold-500 text-2xl font-bold animate-bounce text-yellow-600">The Final Rose... ❤️</p>}
                        </div>

                        {targets.map((target) => (
                            <motion.button
                                key={target.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={
                                    target.type === 'boss'
                                        ? { scale: [1, 1.5, 1], opacity: 1, rotate: [0, 10, -10, 0] }
                                        : target.type === 'fast'
                                            ? { x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100], opacity: [1, 1, 0], scale: 1 }
                                            : { scale: 1, opacity: 1 }
                                }
                                transition={
                                    target.type === 'boss' ? { duration: 2, repeat: Infinity } :
                                        target.type === 'fast' ? { duration: 0.8 } :
                                            target.type === 'medium' ? { duration: 1.5 } : { duration: 3 }
                                }
                                whileHover={target.type !== 'fast' ? { scale: 1.2 } : {}}
                                onClick={() => handleClickTarget(target.id, target.type)}
                                className={`absolute text-rose-500 flex items-center justify-center ${target.type === 'boss' ? 'z-50' : 'z-30'}`}
                                style={{
                                    left: target.type === 'boss' ? '50%' : `${target.x}%`,
                                    top: target.type === 'boss' ? '50%' : `${target.y}%`,
                                    transform: target.type === 'boss' ? 'translate(-50%, -50%)' : 'none'
                                }}
                            >
                                <Heart
                                    className={`fill-current drop-shadow-lg ${target.type === 'boss' ? 'w-40 h-40 text-red-600 filter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]' :
                                        target.type === 'fast' ? 'w-12 h-12 text-rose-400' :
                                            'w-16 h-16'
                                        }`}
                                />
                            </motion.button>
                        ))}
                    </div>
                )}

                {gameState === 'won' && (
                    <motion.div
                        key="won"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl max-w-2xl text-center border-4 border-rose-200 z-30 m-4"
                    >
                        <h3 className="text-3xl md:text-5xl font-serif text-rose-600 font-bold mb-6">My Dearest Achu,</h3>
                        <p className="text-gray-800 text-lg md:text-2xl leading-relaxed font-serif font-medium mb-8">
                            "On this Rose Day, I want to say that you are the most beautiful flower in my life.
                            Every moment with you is a blessing. I love you so much! 😘😘"
                        </p>
                        <p className="text-rose-500 font-bold text-xl md:text-2xl">- Your Kuttan</p>

                        <button
                            onClick={() => { setScore(0); setGameState('idle'); setTargets([]); }}
                            className="mt-8 text-sm text-gray-400 hover:text-rose-500 underline"
                        >
                            Play Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
