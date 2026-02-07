'use client';

import { motion } from 'framer-motion';
import FloatingPetals from './FloatingPetals';

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50 to-red-50 text-center p-6">
            <FloatingPetals />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="z-10"
            >
                <h1 className="text-6xl md:text-8xl font-serif text-rose-600 font-bold drop-shadow-sm mb-4">
                    Happy Rose Day Anjoosey 🌹
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="z-10 max-w-lg"
            >
                <p className="text-xl md:text-2xl text-rose-800 font-light italic">
                    "My beautiful wife, my forever love... You are the only Rose that makes my world complete."
                </p>
                <motion.div
                    className="mt-8 text-4xl flex flex-col items-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <span>🌹</span>
                    <span className="mt-2 text-lg text-rose-500 font-serif italic">
                        - your sweet mio
                    </span>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <p className="text-rose-400 text-sm">Scroll Down</p>
            </motion.div>
        </section>
    );
}
