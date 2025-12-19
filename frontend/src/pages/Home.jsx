import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import GlassButton from '@/components/ui/glass-button'
import GlassCard from '@/components/ui/glass-card'
import ProductCard from '@/components/ui/product-card'
import { products } from '@/data/products'

const slides = [
    {
        id: 1,
        image: "https://lesdeuxboutique.ch/site/assets/files/4898/les_deux_men_6177.2000x0.jpg?q=80&w=2070&auto=format&fit=crop",
        title: "MODERN ESSENTIALS",
        subtitle: "Industrial Luxury for the Bold"
    },
    {
        id: 2,
        image: "https://cdn.sanity.io/images/vxy259ii/production/15f7db48a676b281efea321fd8b33d7496baf067-2560x1707.jpg?q=80&w=1974&auto=format&fit=crop",
        title: "CROWN SERIES",
        subtitle: "Elevated Streetwear Redefined"
    },
    {
        id: 3,
        image: "https://static.vecteezy.com/system/resources/previews/030/640/022/large_2x/modern-men-fashion-in-retail-boutique-store-free-photo.jpg?q=80&w=1974&auto=format&fit=crop",
        title: "URBAN UTILITY",
        subtitle: "Engineered for the City"
    }
]

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={slides[current].image}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
                <div className="max-w-4xl space-y-8">
                    <motion.div
                        key={`text-${current}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="glass-panel p-12 md:p-16 border-white/10 bg-black/30 backdrop-blur-md"
                    >
                        <h1 className="text-5xl md:text-8xl font-display font-medium tracking-tighter text-white mb-4">
                            {slides[current].title}
                        </h1>
                        <p className="text-xl md:text-2xl font-light tracking-widest text-white/90 mb-8 uppercase">
                            {slides[current].subtitle}
                        </p>
                        <GlassButton onClick={() => navigate('/shop')} className="mx-auto text-lg px-8 py-4">
                            Shop Collection <ArrowRight size={20} />
                        </GlassButton>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx ? "w-8 bg-white" : "bg-white/30 hover:bg-white/50"}`}
                    />
                ))}
            </div>
        </div>
    )
}

const BestSelling = () => {
    // Select specific products for Best Selling (e.g., Runner VS1, Selvedge Denim, Stealth Dad Cap)
    const bestSellers = products.filter(p => [601, 302, 701].includes(p.id))

    return (
        <section className="py-24 px-6 bg-glass-10 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display text-white tracking-tighter mb-2">
                            BEST SELLING
                        </h2>
                        <p className="text-white/50 font-light">
                            Customer favorites that define the season.
                        </p>
                    </motion.div>
                    <Link to="/shop" className="text-white/50 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest transition-colors mb-2">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bestSellers.map((product, idx) => (
                        <ProductCard key={product.id} product={product} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const FeaturedCollection = () => {
    // Select specific products for New Arrivals (e.g., Utility Overshirt, Denim Western, Tech Cargo)
    const newArrivals = products.filter(p => [103, 105, 301].includes(p.id))

    return (
        <section className="py-24 px-6 bg-background relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display text-white tracking-tighter"
                    >
                        NEW ARRIVALS
                    </motion.h2>
                    <Link to="/shop" className="text-white/50 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newArrivals.map((product, idx) => (
                        <ProductCard key={product.id} product={product} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const BrandStory = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    return (
        <section ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
                    alt="Brand Story"
                    className="w-full h-full object-cover opacity-60"
                />
            </motion.div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <GlassCard className="bg-black/40 border-white/10 backdrop-blur-sm p-12 md:p-20">
                    <span className="text-sm uppercase tracking-[0.3em] text-white/70 mb-6 block">Our Philosophy</span>
                    <h2 className="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
                        DESIGNED FOR THE<br />MODERN ARCHITECT
                    </h2>
                    <p className="text-lg text-white/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                        KM Fashion bridges the gap between high-end utility and industrial aesthetics.
                        Every piece is crafted with precision, using materials that endure and styles that define the future.
                    </p>
                    <Link to="/about">
                        <GlassButton className="px-8">Read Our Story</GlassButton>
                    </Link>
                </GlassCard>
            </div>
        </section>
    )
}

const Newsletter = () => {
    return (
        <section className="py-24 px-6 bg-background border-t border-white/5">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-display text-white mb-4">JOIN THE MOVEMENT</h2>
                <p className="text-white/50 font-light mb-8">Sign up for exclusive access to drops and editorial content.</p>
                <form className="flex gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-4 outline-none focus:border-white/30 transition-colors"
                    />
                    <button className="bg-white text-black px-8 py-4 font-medium tracking-wide hover:bg-white/90 transition-colors uppercase text-sm">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    )
}

const Process = () => {
    const steps = [
        { id: 1, title: "Design", desc: "Conceptualized in our Paris studio, focusing on silhouette and utility." },
        { id: 2, title: "Material", desc: "Sourced from sustainable mills in Japan and Italy." },
        { id: 3, title: "Craft", desc: "Assembled by master tailors with reinforced construction." }
    ]

    return (
        <section className="py-24 px-6 bg-black relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="md:w-1/3">
                        <span className="text-sm uppercase tracking-widest text-white/50 block mb-4">The Process</span>
                        <h2 className="text-4xl md:text-5xl font-display text-white mb-6">ENGINEERED<br />PERFECTION</h2>
                        <p className="text-white/60 font-light leading-relaxed">
                            We don't just make clothes; we engineer garments. Every stitch is calculated, every fabric is tested.
                        </p>
                    </div>
                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map(step => (
                            <GlassCard key={step.id} className="bg-white/5 border-white/5 p-8" hoverEffect>
                                <span className="text-4xl font-display text-white/20 mb-4 block">0{step.id}</span>
                                <h3 className="text-xl text-white font-medium mb-2">{step.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const Home = () => {
    return (
        <div className="bg-background">
            <HeroCarousel />
            <BestSelling />
            <FeaturedCollection />
            <BrandStory />
            <Process />
            <Newsletter />
        </div>
    )
}

export default Home
