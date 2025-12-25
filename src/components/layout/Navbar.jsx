import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'

const Navbar = () => {
    const { items, toggleCart } = useCartStore()
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center justify-between",
                    isScrolled
                        ? "top-4 px-6 py-3 glass-panel border border-white/20 rounded-full bg-glass-10/80 backdrop-blur-xl w-[90%] max-w-5xl shadow-2xl"
                        : "top-6 px-8 py-5 glass-panel border border-white/10 rounded-full bg-glass-10/40 backdrop-blur-md w-[95%] max-w-7xl"
                )}
            >
                <div className="flex items-center gap-12">
                    <Link to="/" className="text-xl font-display font-medium tracking-widest text-primary uppercase whitespace-nowrap">
                        KM Fashion
                    </Link>

                    <div className="hidden md:flex items-center gap-8 font-light tracking-wide text-sm text-white/80">
                        <Link to="/" className="hover:text-white transition-colors relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                        </Link>
                        <Link to="/shop" className="hover:text-white transition-colors relative group">
                            Shop
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                        </Link>
                        <Link to="/portfolio" className="hover:text-white transition-colors relative group">
                            Collections
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-white/80">
                    <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors"><Search size={20} strokeWidth={1.5} /></button>
                    <button onClick={toggleCart} className="hover:text-white transition-colors relative">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[10px] text-black font-bold">
                                {itemCount}
                            </span>
                        )}
                    </button>
                    <Link to="/login" className="hidden md:block hover:text-white transition-colors"><User size={20} strokeWidth={1.5} /></Link>
                    <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white">
                        <Menu size={24} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8"
                    >
                        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white">
                            <X size={32} />
                        </button>
                        <Link to="/" className="text-3xl font-display text-white">HOME</Link>
                        <Link to="/shop" className="text-3xl font-display text-white">SHOP</Link>
                        <Link to="/portfolio" className="text-3xl font-display text-white">COLLECTIONS</Link>
                        <Link to="/contact" className="text-3xl font-display text-white">CONTACT</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
