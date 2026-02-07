'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Simple petal SVG shape
const Petal = ({ delay, duration, x }: { delay: number; duration: number; x: number }) => (
    <motion.div
        initial={{ y: -20, x: `${x}vw`, opacity: 0, rotate: 0 }}
        animate={{
            y: '105vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
            x: [`${x}vw`, `${x + (Math.random() * 10 - 5)}vw`], // Drift slightly
        }}
        transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            ease: 'linear',
        }}
        className="fixed top-0 pointer-events-none z-0"
        style={{
            width: Math.random() * 20 + 10 + 'px',
            height: Math.random() * 20 + 10 + 'px',
        }}
    >
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M25 50C25 50 10 35 10 20C10 8.9543 16.7157 0 25 0C33.2843 0 40 8.9543 40 20C40 35 25 50 25 50Z"
                fill="#FF004D" // Deep rose red
                fillOpacity="0.6"
            />
        </svg>
    </motion.div>
);

export default function FloatingPetals() {
    const [petals, setPetals] = useState<number[]>([]);

    useEffect(() => {
        // Generate a fixed number of petals only on the client to avoid hydration mismatch
        const petalCount = 30;
        setPetals(Array.from({ length: petalCount }, (_, i) => i));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {petals.map((i) => (
                <Petal
                    key={i}
                    delay={Math.random() * 10}
                    duration={Math.random() * 10 + 10}
                    x={Math.random() * 100}
                />
            ))}
        </div>
    );
}
