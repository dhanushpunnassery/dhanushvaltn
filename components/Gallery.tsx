'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, X, Eraser } from 'lucide-react';
import confetti from 'canvas-confetti';

const moments = [
    {
        id: 1,
        src: '/images/us1.png',
        title: 'A Special Connection',
        caption: 'Scratch to Reveal Our Memory ❤️',
        description: "Every moment with you is special. This day was just the beginning of our beautiful journey together. 💖"
    },
    {
        id: 2,
        src: '/images/us2.png',
        title: 'Growing Love',
        caption: 'Hold to Fill with Love 💖',
        description: "Celebrating life and love with you is my favorite thing to do. You bring so much color and joy into my world! 🌼✨"
    }
];

export default function Gallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof moments[0] | null>(null);

    // --- GAME 1: SCRATCH CARD (Fog of Love) ---
    const [isScratched, setIsScratched] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scratchPercent, setScratchPercent] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;

                // Redraw fog if not scratched
                if (!isScratched) {
                    ctx.fillStyle = '#9f1239'; // Rose-800 color
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.font = 'bold 20px serif';
                    ctx.fillStyle = '#ffe4e6'; // Rose-100
                    ctx.textAlign = 'center';
                    ctx.fillText("Rub to Reveal Memory", canvas.width / 2, canvas.height / 2);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isScratched]);

    const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
        if (isScratched) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Check progress slightly less often for performance
        if (Math.random() > 0.8) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) transparentPixels++;
            }
            const percent = (transparentPixels / (pixels.length / 4)) * 100;
            setScratchPercent(percent);

            if (percent > 40) {
                setIsScratched(true);
                confetti({ particleCount: 100, spread: 70, origin: { x: 0.3, y: 0.6 } });
            }
        }
    };

    // --- GAME 2: LOVE METER ---
    const [loveLevel, setLoveLevel] = useState(0);
    const [isFilled, setIsFilled] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startFilling = () => {
        if (isFilled) return;
        intervalRef.current = setInterval(() => {
            setLoveLevel((prev) => {
                const newLevel = prev + 2;
                if (newLevel >= 100) {
                    clearInterval(intervalRef.current!);
                    setIsFilled(true);
                    confetti({ particleCount: 150, spread: 100, origin: { x: 0.7, y: 0.6 }, colors: ['#FF004D', '#FFF'] });
                    return 100;
                }
                return newLevel;
            });
        }, 50);
    };

    const stopFilling = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    return (
        <section className="min-h-screen py-20 px-4 bg-transparent text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4 animate-fade-in-up">Our Beautiful Moments</h2>
            <p className="text-rose-700 mb-16 italic text-lg">Unlock our precious memories...</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                {/* 1. SCRATCH CARD MEMORY */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative group w-full max-w-[400px] mx-auto"
                >
                    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white/20 backdrop-blur-md">
                        {/* The Actual Image (Underneath) */}
                        <div className="absolute inset-0">
                            <Image
                                src={moments[0].src}
                                alt="Secret Memory"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* The Scratch Layer (Canvas) */}
                        <canvas
                            ref={canvasRef}
                            className={`absolute inset-0 z-10 touch-none cursor-pointer transition-opacity duration-1000 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            onMouseMove={handleScratch}
                            onTouchMove={handleScratch}
                        />

                        {/* Content Overlay (Once Revealed) */}
                        <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 text-left transition-opacity duration-500 ${isScratched ? 'opacity-100' : 'opacity-0'}`}>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{moments[0].title}</h3>
                            <p className="text-rose-100 text-xs md:text-sm mb-4 line-clamp-2">{moments[0].description}</p>
                            <button
                                onClick={() => setSelectedPhoto(moments[0])}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-sm text-xs md:text-sm transition-colors border border-white/50"
                            >
                                Read Full Note
                            </button>
                        </div>

                        {/* Instruction Hint (Floating) - Only if not scratched */}
                        {!isScratched && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce whitespace-nowrap">
                                <div className="bg-white/90 text-rose-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs md:text-sm font-bold">
                                    <Eraser className="w-4 h-4" />
                                    Rub screen to see!
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>


                {/* 2. LOVE METER MEMORY */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-[400px] mx-auto"
                >
                    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 bg-rose-950/40 backdrop-blur-md">

                        {/* The Image (Hidden initially) */}
                        <div className={`absolute inset-0 transition-all duration-1000 ${isFilled ? 'opacity-100 blur-0' : 'opacity-30 blur-2xl'}`}>
                            <Image
                                src={moments[1].src}
                                alt="Locked Memory"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        {/* Interactive Layer */}
                        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center p-4 md:p-6 transition-opacity duration-500 ${isFilled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <div className="relative cursor-pointer group scale-75 sm:scale-100"
                                onMouseDown={startFilling}
                                onMouseUp={stopFilling}
                                onMouseLeave={stopFilling}
                                onTouchStart={startFilling}
                                onTouchEnd={stopFilling}
                            >
                                {/* Beating Heart Background */}
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                >
                                    <Heart className="w-24 h-24 sm:w-32 sm:h-32 text-rose-700/50 fill-current" />
                                </motion.div>

                                {/* Filling Heart */}
                                <div className="absolute inset-0 overflow-hidden flex items-end justify-center">
                                    <div
                                        className="w-24 sm:w-32 bg-rose-500 transition-all duration-100 ease-linear"
                                        style={{ height: `${loveLevel}%` }}
                                    >
                                        <Heart className="w-24 h-24 sm:w-32 sm:h-32 text-rose-500 fill-current absolute bottom-0" />
                                    </div>
                                </div>

                                {/* Mask to shape the filling div into a heart */}
                                <div className="absolute inset-0 flex items-center justify-center mix-blend-destination-in">
                                    <Heart className="w-24 h-24 sm:w-32 sm:h-32 fill-black" />
                                </div>


                                <p className="mt-8 text-rose-100 font-bold text-base sm:text-lg animate-pulse select-none text-center">
                                    Hold to Fill with Love {Math.floor(loveLevel)}%
                                </p>
                            </div>
                        </div>

                        {/* Content Overlay (Once Unlocked) */}
                        <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 text-left transition-opacity duration-500 ${isFilled ? 'opacity-100' : 'opacity-0'}`}>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{moments[1].title}</h3>
                            <p className="text-rose-100 text-xs md:text-sm mb-4 line-clamp-2">{moments[1].description}</p>
                            <button
                                onClick={() => setSelectedPhoto(moments[1])}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-sm text-xs md:text-sm transition-colors border border-white/50"
                            >
                                Read Full Note
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* MODAL FOR FULL VIEW */}
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
                            className="bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col items-center relative border-4 border-white/50 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative w-full h-80 md:h-[500px]">
                                <Image
                                    src={selectedPhoto.src}
                                    alt="Detail"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-8 text-center bg-transparent w-full flex-1 flex flex-col justify-center">
                                <h3 className="text-2xl md:text-3xl font-serif text-rose-800 font-bold mb-4">
                                    {selectedPhoto.title}
                                </h3>
                                <p className="text-gray-700 font-serif text-lg leading-relaxed italic">
                                    "{selectedPhoto.description}"
                                </p>
                                <div className="mt-6 flex justify-center text-rose-400">
                                    <Sparkles className="w-8 h-8 animate-spin-slow" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}

