'use client';

import { motion } from 'framer-motion';
import { Heart, Stars, ShieldCheck, Sun, Moon, CloudRain, Sparkles } from 'lucide-react';

const PROMISES = [
    {
        title: "I Promise to Listen",
        text: "Whenever you need to talk, I'll be there with all my attention and an open heart.",
        icon: ShieldCheck,
        color: "rose"
    },
    {
        title: "I Promise to Support",
        text: "I'll be your biggest cheerleader in everything you do, through every dream you chase.",
        icon: Stars,
        color: "pink"
    },
    {
        title: "I Promise to Care",
        text: "I'll look after you in health and in sickness, making sure you always feel safe and loved.",
        icon: Heart,
        color: "rose"
    },
    {
        title: "I Promise to Brighten",
        text: "I'll strive to make you smile every single day, especially when the world feels dark.",
        icon: Sun,
        color: "yellow"
    },
    {
        title: "I Promise to Stay",
        text: "Through every storm and every sunny day, I'm staying right by your side, forever.",
        icon: Moon,
        color: "indigo"
    },
    {
        title: "I Promise to Grow",
        text: "I'll keep working on myself so I can be the person you truly deserve.",
        icon: Sparkles,
        color: "rose"
    }
];

export default function Promises() {
    return (
        <section className="py-24 px-4 bg-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-rose-50/50 to-transparent" />

            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-rose-900 mb-4">My Promises to You</h2>
                    <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full mb-6" />
                    <p className="text-rose-700 italic text-lg max-w-2xl mx-auto">
                        These are not just words, but the foundations of my love for you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROMISES.map((promise, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:border-rose-300 hover:shadow-2xl transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                                <promise.icon className={`w-8 h-8 text-rose-500`} />
                            </div>
                            <h3 className="text-xl font-bold text-rose-900 mb-3">{promise.title}</h3>
                            <p className="text-rose-700/80 leading-relaxed font-serif text-lg">
                                "{promise.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-rose-900 text-white rounded-full font-serif italic text-lg shadow-lg">
                        <Heart className="w-5 h-5 fill-current text-rose-400" />
                        And most of all, I promise to love you always.
                        <Heart className="w-5 h-5 fill-current text-rose-400" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
