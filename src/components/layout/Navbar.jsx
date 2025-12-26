import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, User, Menu, X, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'

const Navbar = () => {
    const { items, toggleCart } = useCartStore()
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Theme state initialization
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme')
            if (savedTheme) {
                return savedTheme === 'dark'
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return true // Default fallback
    })

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const root = window.document.documentElement
        if (isDark) {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [isDark])

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    // Text color logic:
    // Home Page: White at top (transparent), Primary when scrolled
    // Other Pages: Always Primary (visible on light background)
    const isHome = location.pathname === '/'
    const isTransparent = isHome && !isScrolled

    const textColor = isTransparent ? "text-white" : "text-primary"
    const hoverColor = isTransparent ? "hover:text-white" : "hover:text-primary"
    const borderColor = isTransparent ? "border-white/10" : "border-primary/20"
    const subTextColor = isTransparent ? "text-white/80" : "text-primary/80"

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center justify-between",
                    isTransparent
                        ? `top-6 px-8 py-5 glass-panel ${borderColor} rounded-full bg-transparent border-0 backdrop-blur-none w-[95%] max-w-7xl shadow-none`
                        : `top-4 px-6 py-3 glass-panel ${borderColor} rounded-full bg-glass-10/80 backdrop-blur-xl w-[90%] max-w-5xl shadow-2xl`
                )}
            >
                <div className="flex items-center gap-12">
                    <Link to="/" className={cn("text-xl font-display font-medium tracking-widest uppercase whitespace-nowrap", textColor)}>
                        KM Fashion
                    </Link>

                    <div className={cn("hidden md:flex items-center gap-8 font-light tracking-wide text-sm", subTextColor)}>
                        <Link to="/" className={cn("transition-colors relative group", hoverColor)}>
                            Home
                            <span className={cn("absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full", isTransparent ? "bg-white" : "bg-primary")} />
                        </Link>
                        <Link to="/shop" className={cn("transition-colors relative group", hoverColor)}>
                            Shop
                            <span className={cn("absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full", isTransparent ? "bg-white" : "bg-primary")} />
                        </Link>
                        <Link to="/portfolio" className={cn("transition-colors relative group", hoverColor)}>
                            Collections
                            <span className={cn("absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full", isTransparent ? "bg-white" : "bg-primary")} />
                        </Link>
                    </div>
                </div>

                <div className={cn("flex items-center gap-6", subTextColor)}>
                    <button onClick={toggleTheme} className={cn("transition-colors", hoverColor)}>
                        {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
                    </button>
                    <button onClick={() => navigate('/shop')} className={cn("transition-colors", hoverColor)}><Search size={20} strokeWidth={1.5} /></button>
                    <button onClick={toggleCart} className={cn("transition-colors relative", hoverColor)}>
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <span className={cn("absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold", isTransparent ? "bg-white text-black" : "bg-primary text-background")}>
                                {itemCount}
                            </span>
                        )}
                    </button>
                    <Link to="/login" className={cn("hidden md:block transition-colors", hoverColor)}><User size={20} strokeWidth={1.5} /></Link>
                    <button onClick={() => setIsMobileMenuOpen(true)} className={cn("md:hidden", textColor)}>
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
                        className="fixed inset-0 z-60 bg-background/90 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8"
                    >
                        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-primary/50 hover:text-primary">
                            <X size={32} />
                        </button>
                        <Link to="/" className="text-3xl font-display text-primary">HOME</Link>
                        <Link to="/shop" className="text-3xl font-display text-primary">SHOP</Link>
                        <Link to="/portfolio" className="text-3xl font-display text-primary">COLLECTIONS</Link>
                        <Link to="/contact" className="text-3xl font-display text-primary">CONTACT</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
