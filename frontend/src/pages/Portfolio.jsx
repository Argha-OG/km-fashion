import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import GlassCard from '@/components/ui/glass-card'

const items = [
    {
        id: 1,
        title: "THE CROWN CAMPAIGN",
        year: "2024",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        desc: "A study in monochromatic texture and industrial backdrops."
    },
    {
        id: 2,
        title: "URBAN NOMAD",
        year: "2023",
        image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2073&auto=format&fit=crop",
        desc: "Functionality meets high fashion in the heart of Tokyo."
    },
    {
        id: 3,
        title: "ETHERIAL",
        year: "2023",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
        desc: "Lightweight fabrics designed for the changing seasons."
    }
]

const Portfolio = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-32">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-display text-white mb-6 uppercase tracking-tighter"
                    >
                        Lookbook
                    </motion.h1>
                    <p className="text-xl text-white/60 font-light">
                        Retrospective visual archives of our defining collections.
                    </p>
                </div>

                <div className="space-y-40">
                    {items.map((item, idx) => (
                        <PortfolioItem key={item.id} item={item} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const PortfolioItem = ({ item, index }) => {
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
        >
            <div className="flex-1 w-full">
                <div className="aspect-4/5 overflow-hidden rounded-sm relative group">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
            </div>

            <div className="flex-1 text-center md:text-left">
                <span className="text-sm font-light text-white/40 tracking-widest block mb-4">COLLECTION {item.year}</span>
                <h2 className="text-4xl md:text-6xl font-display text-white mb-6">{item.title}</h2>
                <div className="w-12 h-px bg-white/20 mx-auto md:mx-0 mb-6" />
                <p className="text-lg text-white/70 font-light leading-relaxed max-w-md mx-auto md:mx-0">
                    {item.desc}
                </p>
            </div>
        </motion.div>
    )
}

export default Portfolio
