'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
    { src: '/images/us1.png', alt: 'Our Special Moment', span: 'col-span-1 md:col-span-2 row-span-2' },
    { src: '/images/us3.png', alt: 'A Day to Remember', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: '/images/mosaic_park.png', alt: 'Park Memories', span: 'col-span-1 md:col-span-1 row-span-1' },
    { src: '/images/us2.png', alt: 'Beautiful Celebration', span: 'col-span-1 md:col-span-1 row-span-2' },
    { src: '/images/mosaic_ride.png', alt: 'Adventure Time', span: 'col-span-1 md:col-span-2 row-span-1' },
];

export default function PhotoGrid() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">Gallery of Love</h2>
                    <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full" />
                    <p className="mt-4 text-gray-600 italic">Snapshots of our journey together</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 ${img.span}`}
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-10 h-10" />
                    </button>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-5xl h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Gallery Preview"
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                </div>
            )}
        </section>
    );
}
