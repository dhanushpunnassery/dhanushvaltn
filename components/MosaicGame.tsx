'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PUZZLE_PHOTOS } from '@/lib/puzzleData';

export default function MosaicGame() {
    return (
        <section className="py-16 px-4 bg-gradient-to-r from-rose-50 to-pink-50 min-h-[400px] flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-serif text-rose-800 mb-8 font-bold">
                🧩 Our Love Puzzle
            </h2>
            <p className="text-rose-600 mb-8 text-center max-w-2xl">
                Select a memory to unlock a special message! Piece together the moments we cherish. ❤️
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
                {Object.entries(PUZZLE_PHOTOS).map(([key, photo]) => (
                    <Link href={`/puzzle?id=${key}`} key={key}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white p-4 rounded-2xl shadow-xl border-4 border-white hover:border-rose-300 transition-colors group cursor-pointer"
                        >
                            <div className="relative h-64 w-full overflow-hidden rounded-xl mb-4">
                                <Image
                                    src={photo.src}
                                    alt={photo.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500 blur-md"
                                />
                                {/* Overlay to look like puzzle pieces */}
                                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-30">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div key={i} className="border border-white/50" />
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-rose-600 font-serif">{photo.title}</h3>
                            <p className="text-gray-500 text-sm mt-2">Click to Play</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
