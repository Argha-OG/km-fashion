import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Lock, User, ArrowRight } from 'lucide-react'
import GlassCard from '@/components/ui/glass-card'
import GlassButton from '@/components/ui/glass-button'
import GlassInput from '@/components/ui/glass-input'

const Login = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            navigate('/')
        }, 1500)
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center py-20 px-6 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <GlassCard className="p-8 md:p-10 backdrop-blur-xl bg-black/40 border-white/10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display text-white mb-2">
                            {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
                        </h1>
                        <p className="text-white/50 text-sm">
                            {isLogin ? 'Enter your details to access your account' : 'Join us for exclusive access and rewards'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode='wait'>
                            {!isLogin && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="relative mb-6">
                                        <GlassInput placeholder="Full Name" className="pl-12" required />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            <GlassInput type="email" placeholder="Email Address" className="pl-12" required />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        </div>

                        <div className="relative">
                            <GlassInput type="password" placeholder="Password" className="pl-12" required />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-white/50 hover:text-white transition-colors">
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <GlassButton
                            type="submit"
                            className="w-full justify-center py-4 rounded-xl group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </GlassButton>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1" />
                        <span className="text-xs text-white/30 uppercase tracking-widest">Or continue with</span>
                        <div className="h-px bg-white/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                            <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                            </svg>
                            <span className="text-sm text-white/70 group-hover:text-white">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                            <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.87v1.12h5.396c-.254 1.537-.57 2.735-.908 3.667h-4.488v7.98H9.101Z" />
                            </svg>
                            <span className="text-sm text-white/70 group-hover:text-white">Facebook</span>
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-white/40">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-white hover:underline underline-offset-4"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>
    )
}

export default Login
