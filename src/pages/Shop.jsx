import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react'
import GlassInput from '@/components/ui/glass-input'
import GlassCard from '@/components/ui/glass-card'
import ProductCard from '@/components/ui/product-card'
import GlassButton from '@/components/ui/glass-button'
import { useProductStore } from '@/store/useProductStore'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

const FilterAccordion = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-white/10 last:border-0">
        <button
            onClick={onToggle}
            className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-white hover:text-white/80 transition-colors"
        >
            {title}
            <ChevronDown size={16} className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "")} />
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pb-4 space-y-2">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
)

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className={cn(
            "w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200",
            checked ? "bg-white border-white text-black" : "bg-transparent border-white/20 group-hover:border-white/50"
        )}>
            {checked && <Check size={12} strokeWidth={3} />}
        </div>
        <span className={cn("text-sm transition-colors", checked ? "text-white" : "text-white/60 group-hover:text-white")}>
            {label}
        </span>
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
    </label>
)

const Shop = () => {
    const navigate = useNavigate()
    const { products, fetchProducts } = useProductStore()

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilters, setActiveFilters] = useState({
        categories: [],
        colors: [],
        priceRange: 1000
    })
    const [openSections, setOpenSections] = useState({ category: true, price: true, color: false })

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const toggleFilter = (type, value) => {
        setActiveFilters(prev => {
            const current = prev[type]
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value]
            return { ...prev, [type]: updated }
        })
    }

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = activeFilters.categories.length === 0 || activeFilters.categories.includes(product.category)
            const matchesColor = activeFilters.colors.length === 0 || product.colors.some(c => activeFilters.colors.includes(c))
            const matchesPrice = product.price <= activeFilters.priceRange
            return matchesSearch && matchesCategory && matchesColor && matchesPrice
        })
    }, [searchQuery, activeFilters])

    const allCategories = [...new Set(products.map(p => p.category))]
    const allColors = [...new Set(products.flatMap(p => p.colors))]

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Search Header */}
                <div className="mb-16 text-center max-w-2xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-5xl font-display text-white">COLLECTION</h1>
                    <div className="relative">
                        <GlassInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="pl-12 py-5 rounded-full bg-white/5 border-white/10 focus:bg-black/50 transition-all text-lg"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                    </div>
                    <p className="text-white/40 text-sm">Showing {filteredProducts.length} results</p>
                </div>

                {/* Trending Section */}
                <div className="mb-20">
                    <h2 className="text-xl font-display tracking-widest text-white mb-8 border-b border-white/10 pb-4">TRENDING NOW</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.filter(p => p.price > 200).slice(0, 3).map((product, idx) => (
                            <ProductCard key={`trending-${product.id}`} product={product} index={idx} />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Advanced Sidebar */}
                    <div className="w-full md:w-64 shrink-0 space-y-8">
                        <GlassCard className="sticky top-28 p-6 rounded-3xl bg-glass-10/30 backdrop-blur-xl">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                                <SlidersHorizontal size={18} className="text-white" />
                                <span className="font-display font-bold tracking-widest text-sm text-white">FILTERS</span>
                            </div>

                            <div className="space-y-2">
                                <FilterAccordion title="Category" isOpen={openSections.category} onToggle={() => toggleSection('category')}>
                                    {allCategories.map(cat => (
                                        <Checkbox
                                            key={cat}
                                            label={cat}
                                            checked={activeFilters.categories.includes(cat)}
                                            onChange={() => toggleFilter('categories', cat)}
                                        />
                                    ))}
                                </FilterAccordion>

                                <FilterAccordion title="Price" isOpen={openSections.price} onToggle={() => toggleSection('price')}>
                                    <div className="px-2 pt-4 pb-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            value={activeFilters.priceRange}
                                            onChange={(e) => setActiveFilters(prev => ({ ...prev, priceRange: Number(e.target.value) }))}
                                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                        />
                                        <div className="flex justify-between text-xs text-white/50 mt-4 font-mono">
                                            <span>RM 0</span>
                                            <span>RM {activeFilters.priceRange}</span>
                                        </div>
                                    </div>
                                </FilterAccordion>

                                <FilterAccordion title="Colors" isOpen={openSections.color} onToggle={() => toggleSection('color')}>
                                    <div className="grid grid-cols-2 gap-2">
                                        {allColors.map(color => (
                                            <Checkbox
                                                key={color}
                                                label={color}
                                                checked={activeFilters.colors.includes(color)}
                                                onChange={() => toggleFilter('colors', color)}
                                            />
                                        ))}
                                    </div>
                                </FilterAccordion>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredProducts.map((product, idx) => (
                                    <ProductCard key={product.id} product={product} index={idx} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredProducts.length === 0 && (
                            <div className="py-20 text-center space-y-4">
                                <p className="text-white/40 text-lg">No products match your filters.</p>
                                <button
                                    onClick={() => setActiveFilters({ categories: [], colors: [], priceRange: 1000 })}
                                    className="text-white underline underline-offset-4 hover:text-white/80"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
