'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Lock, Key, Sparkles, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const photos = [
    {
        src: '/images/us1.jpg',
        caption: 'Our First Hand Hold (Park Day) ❤️',
        description: "The moment I held your hand in the park, I knew I never wanted to let go. The world faded away, and it was just you and me. My heart beat faster, and I felt truly complete. 💖"
    },
    {
        src: '/images/us2.jpg',
        caption: 'Our Memorable Onam Celebration 🌼',
        description: "Our Onam celebration was so colorful, just like the joy you bring into my life! Your smile outshined every pookalam that day. A beautiful festival with my beautiful Anjoosey. 🌼✨"
    },
    {
        src: '/images/us3.jpg',
        caption: 'That Memorable Day ✨',
        description: "A day etched in my heart forever. Every second spent with you is my favorite memory. You make ordinary moments feel like magic. I love you! 😘"
    },
];

export default function Gallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

    // Game 1 State (Photo 1)
    const [isUnlocked1, setIsUnlocked1] = useState(false);
    const [keysCollected, setKeysCollected] = useState(0);
    const [keys, setKeys] = useState<{ id: number; x: number; y: number }[]>([
        { id: 1, x: 20, y: 30 },
        { id: 2, x: 70, y: 20 },
        { id: 3, x: 50, y: 70 },
    ]);

    // Game 2 State (Photo 2 - Onam)
    const [isUnlocked2, setIsUnlocked2] = useState(false);
    const [tiles, setTiles] = useState(Array.from({ length: 9 }, (_, i) => i)); // 3x3 Grid

    // Game 3 State (Photo 3)
    const [isUnlocked3, setIsUnlocked3] = useState(false);
    const [loveLevel, setLoveLevel] = useState(0);

    const handleCollectKey = (id: number) => {
        setKeys((prev) => prev.filter((k) => k.id !== id));
        setKeysCollected((prev) => {
            const newCount = prev + 1;
            if (newCount === 3) {
                setTimeout(() => {
                    setIsUnlocked1(true);
                    confetti({ particleCount: 100, spread: 70, origin: { x: 0.2, y: 0.6 }, colors: ['#FFD700'] });
                }, 500);
            }
            return newCount;
        });
    };

    const handleTileClick = (index: number) => {
        setTiles((prev) => {
            const newTiles = prev.filter((t) => t !== index);
            if (newTiles.length === 0) {
                setTimeout(() => {
                    setIsUnlocked2(true);
                    confetti({ particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.6 }, colors: ['#FFA500', '#FFF'] }); // Orange/White for Onam
                }, 300);
            }
            return newTiles;
        });
    };

    const handlePumpLove = () => {
        if (isUnlocked3) return;
        setLoveLevel((prev) => {
            const newLevel = Math.min(prev + 10, 100);
            if (newLevel === 100 && prev < 100) {
                setIsUnlocked3(true);
                confetti({ particleCount: 150, spread: 100, origin: { x: 0.8, y: 0.6 }, colors: ['#FF004D', '#FFF'] });
            }
            return newLevel;
        });
    };

    return (
        <section className="min-h-screen py-20 px-4 bg-white text-center">
            <h2 className="text-4xl font-serif text-rose-800 mb-12">Our Beautiful Moments</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="rounded-xl overflow-hidden shadow-lg border-4 border-rose-50 relative group"
                    >
                        {/* PHOTO 1: KEY HUNT */}
                        {index === 0 && !isUnlocked1 ? (
                            <div className="relative h-96 w-full bg-gray-900 overflow-hidden">
                                <div className="absolute inset-0 opacity-30 blur-xl">
                                    <Image src={photo.src} alt="Locked Memory" fill className="object-cover" />
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
                                    <Lock className="w-16 h-16 text-rose-200 mb-4 animate-bounce" />
                                    <p className="text-rose-200 text-sm mb-8 font-bold">Find 3 Keys to Reveal</p>
                                    <AnimatePresence>
                                        {keys.map((key) => (
                                            <motion.button
                                                key={key.id}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1, y: [0, -10, 0], x: [0, 5, -5, 0] }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                onClick={(e) => { e.stopPropagation(); handleCollectKey(key.id); }}
                                                className="absolute p-3 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-300 cursor-pointer"
                                                style={{ left: `${key.x}%`, top: `${key.y}%` }}
                                            >
                                                <Key className="w-6 h-6 text-yellow-900" />
                                            </motion.button>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) :
                            /* PHOTO 2: TILE REVEAL (ONAM) */
                            index === 1 && !isUnlocked2 ? (
                                <div className="relative h-96 w-full bg-gray-200 cursor-pointer">
                                    {/* Background Image (Hidden) */}
                                    <div className="absolute inset-0">
                                        <Image src={photo.src} alt="Onam Memory" fill className="object-cover" />
                                    </div>

                                    {/* Grid Overlay */}
                                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 z-10">
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 1, scale: 1 }}
                                                animate={tiles.includes(i) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, rotate: 90 }}
                                                onClick={() => handleTileClick(i)}
                                                className={`bg-orange-100 border border-orange-200 flex items-center justify-center cursor-pointer transition-all hover:bg-orange-50 ${!tiles.includes(i) ? 'pointer-events-none' : ''}`}
                                            >
                                                {tiles.includes(i) && <span className="text-2xl">🌼</span>}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 left-0 right-0 z-20 pointer-events-none">
                                        <p className="text-orange-600 font-bold bg-white/80 inline-block px-4 py-1 rounded-full shadow-md">
                                            Tap tiles to Reveal Memory!
                                        </p>
                                    </div>
                                </div>
                            ) :
                                /* PHOTO 3: LOVE PUMP */
                                index === 2 && !isUnlocked3 ? (
                                    <div
                                        className="relative h-96 w-full bg-rose-950 overflow-hidden cursor-pointer"
                                        onClick={handlePumpLove}
                                    >
                                        <div className="absolute inset-0 opacity-30 blur-xl">
                                            <Image src={photo.src} alt="Locked Memory" fill className="object-cover" />
                                        </div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 select-none">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            >
                                                <Heart
                                                    className="w-24 h-24 text-rose-500 fill-current"
                                                    style={{ opacity: 0.5 + (loveLevel / 200) }}
                                                />
                                            </motion.div>
                                            <div className="w-48 h-4 bg-gray-700 rounded-full mt-6 overflow-hidden border border-rose-500">
                                                <motion.div
                                                    className="h-full bg-rose-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${loveLevel}%` }}
                                                />
                                            </div>
                                            <p className="text-rose-200 text-lg mt-4 font-bold animate-pulse">Tap to Fill with Love! ❤️ {loveLevel}%</p>
                                        </div>
                                    </div>
                                ) : (
                                    /* UNLOCKED / NORMAL VIEW */
                                    <div
                                        className="relative h-96 w-full cursor-pointer"
                                        onClick={() => setSelectedPhoto(photo)}
                                    >
                                        <Image
                                            src={photo.src}
                                            alt={`Memory ${index + 1}`}
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Flash effect on unlock */}
                                        {((index === 0) || (index === 1) || (index === 2)) && (
                                            <motion.div
                                                initial={{ opacity: 1 }}
                                                animate={{ opacity: 0 }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="absolute inset-0 bg-white pointer-events-none"
                                            />
                                        )}
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white font-serif italic flex items-center justify-center gap-2">
                                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                                {photo.caption}
                                            </p>
                                            <p className="text-rose-200 text-xs mt-1">(Tap for details)</p>
                                        </div>
                                    </div>
                                )}
                    </motion.div>
                ))}
            </div>

            {/* DETAILED MODAL */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <div
                            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col items-center relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative w-full h-80 md:h-96">
                                <Image
                                    src={selectedPhoto.src}
                                    alt="Detail"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-8 text-center bg-rose-50 w-full flex-1 flex flex-col justify-center">
                                <h3 className="text-2xl md:text-3xl font-serif text-rose-800 font-bold mb-4">
                                    {selectedPhoto.caption}
                                </h3>
                                <p className="text-gray-700 font-serif text-lg leading-relaxed italic">
                                    "{selectedPhoto.description}"
                                </p>
                                <div className="mt-6 flex justify-center text-rose-400">
                                    <Heart className="w-8 h-8 fill-current animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="mt-12 text-gray-400 text-sm italic">Collect moments, not things.</p>
        </section>
    );
}
