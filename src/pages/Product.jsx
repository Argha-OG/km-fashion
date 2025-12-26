import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, ShoppingBag, Plus, Minus, Star, ChevronDown } from 'lucide-react'
import GlassCard from '@/components/ui/glass-card'
import GlassButton from '@/components/ui/glass-button'
import { products } from '@/data/products'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'

const Product = () => {
    const { id } = useParams()
    // ID in data is string, useParams is string. Loose equality or direct match.
    // Also falling back to useProductStore logic if needed, but for now products is direct import
    const product = products.find(p => p.id == id || p._id == id)
    const { addToCart, toggleCart } = useCartStore()

    const [selectedSize, setSelectedSize] = useState("M")
    const sizes = ["S", "M", "L", "XL"]

    // Get related products (exclude current)
    const relatedProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 3)

    const [activeTab, setActiveTab] = useState('details')

    if (!product) return <div className="text-primary pt-32 text-center text-xl">Product not found</div>

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 mb-32">

                {/* Left: Static Image */}
                <div className="md:w-1/2 sticky top-32 h-[calc(100vh-10rem)]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full rounded-3xl overflow-hidden border border-primary/10 relative group"
                    >
                        <img
                            src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/600"}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                </div>

                {/* Right: Scrolling Details */}
                <div className="md:w-1/2 flex flex-col justify-center space-y-10 py-10">
                    <div className="space-y-4">
                        <Link to="/shop" className="text-primary/50 hover:text-primary flex items-center gap-2 text-sm uppercase tracking-widest mb-6">
                            <ArrowLeft size={16} /> Back to Shop
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-medium text-primary tracking-tighter"
                        >
                            {product.name}
                        </motion.h1>
                        <div className="flex items-center gap-6">
                            <p className="text-3xl text-primary/90 font-light">RM {product.price}</p>
                            <div className="flex items-center gap-2 glass-panel px-3 py-1 bg-primary/5 rounded-full">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} fill="currentColor" />)}
                                </div>
                                <span className="text-primary/60 text-xs font-medium tracking-wide">4.8 (42)</span>
                            </div>
                        </div>
                    </div>

                    <GlassCard className="space-y-8 bg-glass-10/30 backdrop-blur-xl border-primary/10">
                        <div>
                            <div className="flex border-b border-primary/10 mb-8 overflow-x-auto">
                                {['details', 'fabric', 'shipping', 'reviews'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            "pb-4 px-6 text-xs font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap",
                                            activeTab === tab ? "text-primary" : "text-primary/40 hover:text-primary"
                                        )}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-primary/70 font-light leading-relaxed min-h-[150px]"
                                >
                                    {activeTab === 'details' && (
                                        <div className="space-y-4">
                                            <p>
                                                Engineered for the modern industrial landscape. The {product.name} features advanced materials
                                                and a precision cut that adapts to your movement. A staple for the Crown Series collection,
                                                designed to bridge the gap between utility and luxury.
                                            </p>
                                            <p>
                                                Features reinforced seams, hidden utility pockets, and our signature matte finish hardware.
                                            </p>
                                        </div>
                                    )}
                                    {activeTab === 'fabric' && (
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> Premium Japanese Cotton (80%)</li>
                                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> Poly-Lyocell Blend (20%)</li>
                                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> Water-resistant DWR coating</li>
                                            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> Breathable weave structure</li>
                                        </ul>
                                    )}
                                    {activeTab === 'shipping' && (
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
                                                <div className="mt-1"><ShoppingBag size={18} /></div>
                                                <div>
                                                    <h4 className="text-primary text-sm font-medium mb-1">Free Global Shipping</h4>
                                                    <p className="text-xs">On all orders over RM 500 via DHL Express.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl">
                                                <div className="mt-1"><Check size={18} /></div>
                                                <div>
                                                    <h4 className="text-primary text-sm font-medium mb-1">30-Day Returns</h4>
                                                    <p className="text-xs">No questions asked return policy.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'reviews' && (
                                        <div className="space-y-6">
                                            {[1, 2].map((review) => (
                                                <div key={review} className="border-b border-primary/5 pb-6 last:border-0 last:pb-0">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">AM</div>
                                                            <div>
                                                                <h4 className="text-primary text-sm font-medium">Alex M.</h4>
                                                                <div className="flex text-yellow-500">
                                                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={10} fill="currentColor" />)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs text-primary/30">2 weeks ago</span>
                                                    </div>
                                                    <p className="text-sm text-primary/60 mt-3">
                                                        Absolutely love the quality. The fit is perfect for the oversized look I was going for. Highly recommend!
                                                    </p>
                                                </div>
                                            ))}
                                            <button className="w-full py-3 text-xs uppercase tracking-widest text-primary/50 hover:text-primary border border-primary/10 rounded-xl hover:bg-primary/5 transition-colors">
                                                Read All 42 Reviews
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-primary/50 mb-4">Select Size</h3>
                            <div className="flex flex-wrap gap-4">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            "w-14 h-14 flex items-center justify-center border rounded-2xl transition-all duration-300 font-medium",
                                            selectedSize === size
                                                ? "bg-primary text-background border-primary scale-110 shadow-lg shadow-primary/10"
                                                : "bg-transparent text-primary border-primary/10 hover:border-primary/40 hover:bg-primary/5"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-primary/10">
                            <GlassButton
                                onClick={() => {
                                    addToCart(product, selectedSize)
                                    toggleCart()
                                }}
                                className="w-full py-5 text-base flex justify-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-shadow text-primary"
                            >
                                Add to Bag — RM {product.price}
                            </GlassButton>
                        </div>
                    </GlassCard>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs tracking-widest text-primary/30 uppercase font-medium">
                        <div className="flex items-center gap-3"><Check size={14} className="text-green-400" /> Free Shipping</div>
                        <div className="flex items-center gap-3"><Check size={14} className="text-green-400" /> 30-Day Returns</div>
                        <div className="flex items-center gap-3"><Check size={14} className="text-green-400" /> Secure Checkout</div>
                        <div className="flex items-center gap-3"><Check size={14} className="text-green-400" /> 24/7 Support</div>
                    </div>
                </div>
            </div>

            {/* Recommended Section */}
            <div className="max-w-7xl mx-auto border-t border-primary/10 pt-24">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl font-display text-primary">COMPLETE THE LOOK</h2>
                    <Link to="/shop" className="text-sm text-primary/50 hover:text-primary uppercase tracking-widest hidden md:block">View All</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedProducts.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} className="group cursor-pointer">
                            <div className="aspect-3/4 rounded-3xl overflow-hidden mb-6 relative bg-glass-10 border border-primary/5">
                                <img
                                    src={p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/400"}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg text-primary font-medium mb-1 group-hover:underline decoration-primary/30 underline-offset-4">{p.name}</h3>
                                    <p className="text-xs text-primary/50 uppercase tracking-widest">{p.category}</p>
                                </div>
                                <p className="text-primary/90 font-light">RM {p.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product
