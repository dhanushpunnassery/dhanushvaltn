'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 animate-gradient-slow" />

            {/* Soft Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-300/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-[100px] animate-pulse-delayed" />

            {/* Floating Romantic Elements */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: '110vh',
                        x: `${Math.random() * 100}vw`,
                        scale: 0.5 + Math.random() * 0.5,
                        rotate: Math.random() * 360
                    }}
                    animate={{
                        opacity: [0, 0.4, 0.4, 0],
                        y: '-10vh',
                        rotate: (Math.random() > 0.5 ? 360 : -360)
                    }}
                    transition={{
                        duration: 15 + Math.random() * 15,
                        repeat: Infinity,
                        delay: Math.random() * 10,
                        ease: "linear"
                    }}
                    className="absolute text-rose-300/30"
                >
                    <Heart className="fill-current w-6 h-6 md:w-8 md:h-8" />
                </motion.div>
            ))}

            {/* Sparkle effects using CSS */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.15] mix-blend-overlay" />

            <style jsx global>{`
                @keyframes gradient-slow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-slow {
                    background-size: 200% 200%;
                    animation: gradient-slow 15s ease infinite;
                }
                @keyframes pulse-delayed {
                    0%, 100% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.1); opacity: 0.4; }
                }
                .animate-pulse-delayed {
                    animation: pulse-delayed 10s ease-in-out infinite;
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}
