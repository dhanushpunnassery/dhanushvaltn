'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Heart, Trophy, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const REWARDS = [
    { text: "A Big Hug", color: "#fb7185" }, // rose-400
    { text: "A Sweet Kiss", color: "#f43f5e" }, // rose-500
    { text: "Dinner Date", color: "#e11d48" }, // rose-600
    { text: "One Surprise Gift", color: "#be123c" }, // rose-700
    { text: "Day of Pampering", color: "#9f1239" }, // rose-800
    { text: "A Love Letter", color: "#881337" }, // rose-900
    { text: "Movie Night", color: "#fb7185" }, // rose-400
    { text: "100 Warm Kisses", color: "#f43f5e" }, // rose-500
];

export default function LoveWheel() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const controls = useAnimation();
    const wheelRef = useRef<HTMLDivElement>(null);

    const spinWheel = async () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setResult(null);

        // Random rotation (between 5 and 10 full turns + random slice)
        const totalSlices = REWARDS.length;
        const randomTurns = 5 + Math.floor(Math.random() * 5);
        const randomSliceIndex = Math.floor(Math.random() * totalSlices);
        const degreesPerSlice = 360 / totalSlices;

        // We want the result to be centered at the top pointer (index 0 is at 0 degrees)
        // Correction: index 0 is at 0-45 degrees, we want to pointer at the top
        const targetRotation = (randomTurns * 360) + (randomSliceIndex * degreesPerSlice);

        await controls.start({
            rotate: targetRotation,
            transition: { duration: 5, ease: [0.13, 0, 0, 1] }
        });

        // Calculate the actual result
        // The slice that lands under the pointer (at the top) is the negative of the rotation
        const finalRotation = targetRotation % 360;
        const normalizedRotation = (360 - (finalRotation % 360)) % 360;
        const winningIndex = Math.floor(normalizedRotation / degreesPerSlice);

        setResult(REWARDS[winningIndex].text);
        setIsSpinning(false);

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#fb7185', '#be123c']
        });
    };

    return (
        <section className="py-20 px-4 bg-transparent text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">The Love Wheel</h2>
                <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full mb-6" />
                <p className="text-rose-700 italic text-lg mb-12">Spin to see what reward awaits you! 🎡💖</p>

                <div className="relative inline-block mt-8 mb-16">
                    {/* The Pointer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-rose-500">
                            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-rose-500" />
                        </div>
                    </div>

                    {/* The Wheel */}
                    <motion.div
                        animate={controls}
                        className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border-[10px] border-white shadow-2xl relative overflow-hidden"
                        style={{ transformOrigin: 'center center' }}
                    >
                        {REWARDS.map((reward, i) => (
                            <div
                                key={i}
                                className="absolute top-0 left-0 w-full h-full"
                                style={{
                                    transform: `rotate(${i * (360 / REWARDS.length)}deg)`,
                                    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 10%)', // More complex clip path to create slice
                                    // A simpler way for generic CSS slices is using skewed divs, but we'll use a conic gradient-like approach visually
                                }}
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundColor: reward.color,
                                        transformOrigin: '50% 50%',
                                        transform: `rotate(${360 / (REWARDS.length * 2)}deg)`
                                    }}
                                />
                                <span
                                    className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[75deg] text-white font-bold text-xs sm:text-sm whitespace-nowrap"
                                    style={{ transform: `rotate(22deg) translateY(-20px)` }}
                                >
                                    {reward.text}
                                </span>
                            </div>
                        ))}

                        {/* Better approach for slice colors using SVG or conic-gradient */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: `conic-gradient(${REWARDS.map((r, i) => `${r.color} ${i * (100 / REWARDS.length)}% ${(i + 1) * (100 / REWARDS.length)}%`).join(', ')})`
                            }}
                        />

                        {/* Labels on top of conic gradient */}
                        {REWARDS.map((reward, i) => (
                            <div
                                key={`label-${i}`}
                                className="absolute top-1/2 left-1/2 w-1/2 h-0 flex items-center justify-end pr-8 sm:pr-12"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${i * (360 / REWARDS.length) + (360 / (REWARDS.length * 2)) - 90}deg)`,
                                    transformOrigin: '0% 50%'
                                }}
                            >
                                <span className="text-white font-bold text-[10px] sm:text-xs rotate-0 origin-center whitespace-nowrap">
                                    {reward.text}
                                </span>
                            </div>
                        ))}

                        {/* Center Hub */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-inner z-10 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-rose-500 fill-current" />
                        </div>
                    </motion.div>

                    {/* Result Card */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                className="mt-8 bg-white p-6 rounded-2xl shadow-xl border-2 border-rose-200"
                            >
                                <p className="text-rose-800 font-bold text-xl uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    You Won!
                                </p>
                                <h3 className="text-3xl font-serif text-rose-600 font-bold">{result}</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Spin Button */}
                    <div className="mt-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={isSpinning}
                            onClick={spinWheel}
                            className={`px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-all flex items-center gap-3 mx-auto ${isSpinning
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-rose-500 text-white hover:bg-rose-600'
                                }`}
                        >
                            <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                            {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
