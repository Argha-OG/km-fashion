import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import GlassButton from '@/components/ui/glass-button'
import { useNavigate } from 'react-router-dom'

const CartSheet = () => {
    const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useCartStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isCartOpen])

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-glass-10 backdrop-blur-3xl border-l border-white/10 z-60 flex flex-col shadow-2xl"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="font-display text-xl tracking-widest text-white">YOUR BAG ({items.length})</h2>
                            <button onClick={toggleCart} className="text-white/50 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/50 space-y-4">
                                    <p className="text-lg">Your bag is empty.</p>
                                    <GlassButton onClick={toggleCart}>Start Shopping</GlassButton>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                        <div className="w-20 h-24 bg-white/5 rounded overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-white font-medium">{item.name}</h3>
                                                    <p className="text-white/50 text-sm">{item.category} | Size {item.size}</p>
                                                </div>
                                                <p className="text-white font-medium">${item.price * item.quantity}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-white/5 rounded px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                                                        className="text-white/50 hover:text-white"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        className="text-white/50 hover:text-white"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                    className="text-white/30 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-black/20 space-y-4">
                                <div className="flex justify-between items-center text-white">
                                    <span className="text-sm uppercase tracking-widest text-white/50">Subtotal</span>
                                    <span className="text-xl font-medium">${subtotal}</span>
                                </div>
                                <p className="text-xs text-white/40 text-center">Shipping & taxes calculated at checkout</p>
                                <GlassButton
                                    onClick={() => {
                                        toggleCart()
                                        navigate('/checkout')
                                    }}
                                    className="w-full py-4 flex justify-between group"
                                >
                                    Checkout <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </GlassButton>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default CartSheet
