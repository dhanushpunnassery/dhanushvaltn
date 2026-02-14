'use client';

import { motion } from 'framer-motion';
import FloatingPetals from './FloatingPetals';

export default function Hero() {
    return (
        <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-100 via-pink-100 to-red-50 text-center p-4 md:p-6">
            <FloatingPetals />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="z-10"
            >
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-rose-600 font-bold drop-shadow-sm mb-4 px-4">
                    Happy Valentine's Day Achu ❤️
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="z-10 max-w-lg"
            >
                <p className="text-xl md:text-3xl text-rose-800 font-light italic leading-relaxed">
                    "My beautiful Achu, today and forever, you are my Valentine. I love you more than words can say."
                </p>
                <motion.div
                    className="mt-12 text-5xl flex flex-col items-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <span>💖</span>
                    <span className="mt-4 text-lg text-rose-500 font-serif italic">
                        - your sweet Kuttan
                    </span>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <p className="text-rose-400 text-sm tracking-widest uppercase">Scroll for Love</p>
            </motion.div>
        </section>
    );
}
