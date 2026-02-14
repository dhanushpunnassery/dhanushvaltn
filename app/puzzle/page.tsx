'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PUZZLE_PHOTOS } from '@/lib/puzzleData';

const PUZZLE_SIZE = 4; // 4x4 grid (16 pieces)

function PuzzleDataWrapper() {
    const searchParams = useSearchParams();
    const photoId = searchParams.get('id');
    const router = useRouter();

    // Find the photo config, fallback to first if invalid
    const selectedPhotoKey = (photoId && photoId in PUZZLE_PHOTOS) ? photoId as keyof typeof PUZZLE_PHOTOS : null;
    const photoConfig = selectedPhotoKey ? PUZZLE_PHOTOS[selectedPhotoKey] : null;

    useEffect(() => {
        if (!photoConfig) {
            router.push('/');
        }
    }, [photoConfig, router]);

    if (!photoConfig) return null;

    return <GameLogic photoConfig={photoConfig} />;
}

function GameLogic({ photoConfig }: { photoConfig: typeof PUZZLE_PHOTOS['park'] }) {
    const [gameState, setGameState] = useState<'playing' | 'won'>('playing');
    const [pieces, setPieces] = useState<{ id: number; currentPos: number; contentPos: number }[]>([]);
    const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

    // Initialize Puzzle on Mount
    useEffect(() => {
        let initialPieces = Array.from({ length: PUZZLE_SIZE * PUZZLE_SIZE }, (_, i) => ({
            id: i,
            currentPos: -1, // -1 means "scattered" / not on grid
            contentPos: i, // The correct position in the image
        }));

        // Shuffle the pieces array so they appear disordered in the tray
        initialPieces = initialPieces.sort(() => Math.random() - 0.5);

        setPieces(initialPieces);
    }, []);

    const handleDragMove = (point: { x: number, y: number }) => {
        // Continuous collision detection during drag
        const dropZones = document.querySelectorAll('[data-drop-zone="true"]');
        let bestSlot = -1;
        let minDistance = 100000;

        dropZones.forEach((zone) => {
            const rect = zone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dist = Math.hypot(point.x - centerX, point.y - centerY);

            if (dist < minDistance) {
                minDistance = dist;
                bestSlot = parseInt(zone.getAttribute('data-slot-index') || '-1');
            }
        });

        if (bestSlot !== -1 && minDistance < 60) {
            setHoveredSlot(bestSlot);
        } else {
            setHoveredSlot(null);
        }
    };

    const handleDrop = (pieceId: number) => {
        if (hoveredSlot !== null) {
            const slotIndex = hoveredSlot;
            setPieces((prev) => {
                const draggedPiece = prev.find(p => p.id === pieceId);
                if (!draggedPiece) return prev;
                const existingPieceInSlot = prev.find(p => p.currentPos === slotIndex);

                return prev.map((p) => {
                    if (p.id === pieceId) return { ...p, currentPos: slotIndex };
                    if (existingPieceInSlot && p.id === existingPieceInSlot.id) return { ...p, currentPos: draggedPiece.currentPos };
                    return p;
                });
            });
            setHoveredSlot(null);
        }
    };

    // Check Win Condition
    useEffect(() => {
        if (pieces.length === 0) return;
        const allCorrect = pieces.every((p) => p.currentPos === p.contentPos);
        if (allCorrect) {
            setTimeout(() => {
                setGameState('won');
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            }, 500);
        }
    }, [pieces]);

    return (
        <main className="min-h-screen bg-transparent flex flex-col items-center py-8">
            <div className="w-full max-w-6xl px-4 mb-4 flex justify-between items-center">
                <Link href="/" className="flex items-center text-rose-600 font-bold hover:underline">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
                </Link>
                <h1 className="text-2xl md:text-3xl font-serif text-rose-800 font-bold">
                    {photoConfig.title}
                </h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full max-w-6xl flex-grow">
                {/* Puzzle Grid */}
                <div className="bg-white p-4 rounded-xl shadow-2xl border-4 border-rose-200 order-1 lg:order-none">
                    <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
                        {/* Guide Image */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <Image src={photoConfig.src} alt="Guide" fill className="object-cover blur-sm" />
                        </div>

                        <div id="puzzle-grid" className="grid grid-cols-4 gap-0.5 w-full h-full relative z-10">
                            {Array.from({ length: 16 }).map((_, index) => {
                                const piece = pieces.find(p => p.currentPos === index);
                                const isHovered = hoveredSlot === index;

                                return (
                                    <div
                                        key={index}
                                        data-drop-zone="true"
                                        data-slot-index={index}
                                        className={`border flex items-center justify-center relative bg-white/10 z-0 transition-colors duration-200 ${isHovered ? 'border-rose-500 bg-rose-200/50 scale-105 z-20 shadow-lg' : 'border-rose-100'}`}
                                    >
                                        {piece && (
                                            <PuzzlePiece
                                                piece={piece}
                                                photoSrc={photoConfig.src}
                                                onDragMove={handleDragMove}
                                                onDrop={() => handleDrop(piece.id)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Tray */}
                <div className="bg-white/50 p-6 rounded-xl border-2 border-rose-100 w-full lg:w-96 min-h-[200px] lg:h-[500px] overflow-y-auto order-2 lg:order-none">
                    <h3 className="text-rose-800 font-bold mb-4 text-center sticky top-0 bg-white/50 backdrop-blur-sm py-2 z-10">
                        Pieces ({pieces.filter(p => p.currentPos === -1).length} left)
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {pieces.map((piece) => {
                            if (piece.currentPos !== -1) return null;
                            return (
                                <div key={piece.id} className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
                                    <PuzzlePiece
                                        piece={piece}
                                        photoSrc={photoConfig.src}
                                        onDragMove={handleDragMove}
                                        onDrop={() => handleDrop(piece.id)}
                                        isInTray={true}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Win Popup */}
            <AnimatePresence>
                {gameState === 'won' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full text-center border-4 border-rose-200 relative overflow-hidden"
                        >
                            <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden shadow-inner">
                                <Image src={photoConfig.src} alt="Won" fill className="object-cover" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif text-rose-600 font-bold mb-6">Memory Unlocked! 🔓❤️</h3>
                            <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic mb-8 font-serif">"{photoConfig.message}"</p>
                            <div className="flex gap-4 justify-center">
                                <Link href="/" className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                    Home
                                </Link>
                                <button onClick={() => window.location.reload()} className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-600 transition-transform hover:scale-105">
                                    Replay
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

function PuzzlePiece({ piece, photoSrc, onDragMove, onDrop, isInTray = false }: {
    piece: { id: number, contentPos: number },
    photoSrc: string,
    onDragMove: (point: { x: number, y: number }) => void,
    onDrop: () => void,
    isInTray?: boolean
}) {
    const row = Math.floor(piece.contentPos / 4);
    const col = piece.contentPos % 4;
    const bgX = col * (100 / 3);
    const bgY = row * (100 / 3);

    return (
        <motion.div
            layoutId={`piece-${piece.id}`}
            drag
            dragSnapToOrigin // Always snap back if not dropped successfully
            dragElastic={0.1}
            dragMomentum={false}
            whileDrag={{ scale: 1.1, zIndex: 100, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
            onDrag={(e, info) => onDragMove(info.point)}
            onDragEnd={() => onDrop()}
            className={`w-full h-full cursor-grab active:cursor-grabbing shadow-sm border border-white/20 ${isInTray ? 'relative rounded-md' : 'absolute inset-0'}`}
            style={{
                backgroundImage: `url(${photoSrc})`,
                backgroundSize: '400%',
                backgroundPosition: `${bgX}% ${bgY}%`,
            }}
        />
    );
}

export default function PuzzlePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-rose-500">Loading Memory...</div>}>
            <PuzzleDataWrapper />
        </Suspense>
    );
}
