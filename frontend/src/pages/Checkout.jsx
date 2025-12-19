import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronRight, CreditCard, MapPin, Package, Truck, ShoppingBag } from 'lucide-react'
import GlassCard from '@/components/ui/glass-card'
import GlassInput from '@/components/ui/glass-input'
import GlassButton from '@/components/ui/glass-button'
import { useCartStore } from '@/store/useCartStore'
import { Link, useNavigate } from 'react-router-dom'

const steps = [
    { id: 1, title: 'Shipping', icon: MapPin },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Confirmation', icon: Check }
]

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)
    const { items, clearCart } = useCartStore()
    const navigate = useNavigate()

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
    const shippingCost = 0 // Free shipping
    const total = subtotal + shippingCost

    const handleShippingSubmit = (e) => {
        e.preventDefault()
        setCurrentStep(2)
    }

    const handlePaymentSubmit = (e) => {
        e.preventDefault()
        setIsProcessing(true)
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false)
            setCurrentStep(3)
            clearCart()
        }, 2000)
    }

    if (items.length === 0 && currentStep !== 3) {
        return (
            <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl text-white font-display mb-4">Your bag is empty</h2>
                <GlassButton onClick={() => navigate('/shop')}>Continue Shopping</GlassButton>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">

                {/* Progress Steps */}
                <div className="flex justify-between items-center mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />
                    {steps.map((step) => {
                        const Icon = step.icon
                        const isActive = step.id === currentStep
                        const isCompleted = step.id < currentStep

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-3 bg-background px-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isActive || isCompleted ? 'bg-white text-black border-white' : 'bg-black text-white/30 border-white/20'}`}>
                                    {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                                </div>
                                <span className={`text-xs uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/30'}`}>{step.title}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Forms */}
                    <div className="md:col-span-2">
                        <AnimatePresence mode='wait'>
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <GlassCard className="space-y-6">
                                        <h2 className="text-xl text-white font-display tracking-wide mb-6">Shipping Details</h2>
                                        <form onSubmit={handleShippingSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <GlassInput placeholder="First Name" required />
                                                <GlassInput placeholder="Last Name" required />
                                            </div>
                                            <GlassInput placeholder="Address" required />
                                            <GlassInput placeholder="Apartment, suite, etc." />
                                            <div className="grid grid-cols-2 gap-4">
                                                <GlassInput placeholder="City" required />
                                                <GlassInput placeholder="Postal Code" required />
                                            </div>
                                            <GlassInput placeholder="Phone" required />
                                            <div className="pt-4 flex justify-end">
                                                <GlassButton type="submit" className="flex items-center gap-2">
                                                    Continue to Payment <ChevronRight size={16} />
                                                </GlassButton>
                                            </div>
                                        </form>
                                    </GlassCard>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <GlassCard className="space-y-6">
                                        <h2 className="text-xl text-white font-display tracking-wide mb-6">Payment Method</h2>
                                        <form onSubmit={handlePaymentSubmit} className="space-y-6">
                                            <div className="p-4 border border-white/20 rounded bg-white/5 flex items-center gap-4">
                                                <CreditCard size={24} className="text-white" />
                                                <div>
                                                    <p className="text-white text-sm font-medium">Credit Card</p>
                                                    <p className="text-white/50 text-xs">Secure encrypted transaction</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <GlassInput placeholder="Card Number" />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <GlassInput placeholder="MM / YY" />
                                                    <GlassInput placeholder="CVC" />
                                                </div>
                                                <GlassInput placeholder="Cardholder Name" />
                                            </div>

                                            <div className="pt-4 flex justify-between items-center">
                                                <button type="button" onClick={() => setCurrentStep(1)} className="text-white/50 hover:text-white text-sm">
                                                    Back to Shipping
                                                </button>
                                                <GlassButton type="submit" disabled={isProcessing} className="w-48 justify-center">
                                                    {isProcessing ? 'Processing...' : `Pay $${total}`}
                                                </GlassButton>
                                            </div>
                                        </form>
                                    </GlassCard>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center text-center space-y-6 py-10"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 border border-green-500/50 mb-4">
                                        <Check size={40} />
                                    </div>
                                    <h2 className="text-3xl text-white font-display">Order Confirmed!</h2>
                                    <p className="text-white/60 max-w-md">
                                        Thank you for your purchase. Your order <span className="text-white">#KM-{Math.floor(Math.random() * 10000)}</span> has been received and is being processed.
                                    </p>
                                    <GlassButton onClick={() => navigate('/shop')} className="mt-8">
                                        Continue Shopping
                                    </GlassButton>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Order Summary */}
                    {currentStep !== 3 && (
                        <div className="md:col-span-1">
                            <GlassCard className="sticky top-24 space-y-6 bg-glass-10/30">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">Order Summary</h3>

                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {items.map(item => (
                                        <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                            <div className="w-16 h-20 bg-white/5 rounded overflow-hidden shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-medium line-clamp-1">{item.name}</p>
                                                <p className="text-white/50 text-xs mt-1">Size: {item.size} x {item.quantity}</p>
                                                <p className="text-white/80 text-sm mt-1">${item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/10 space-y-2">
                                    <div className="flex justify-between text-sm text-white/60">
                                        <span>Subtotal</span>
                                        <span>${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-white/60">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between text-base font-medium text-white pt-4 border-t border-white/5">
                                        <span>Total</span>
                                        <span>${total}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-white/40 justify-center pt-2">
                                    <Truck size={12} /> Free Shipping via DHL Express
                                </div>
                            </GlassCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Checkout
