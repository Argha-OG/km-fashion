import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/glass-card'
import GlassInput from '@/components/ui/glass-input'
import GlassButton from '@/components/ui/glass-button'
import { Mail, MapPin, Phone } from 'lucide-react'

const Contact = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-2 gap-12"
                >
                    <div className="space-y-8">
                        <h1 className="text-5xl font-display text-white tracking-tight">GET IN TOUCH</h1>
                        <p className="text-xl text-white/60 font-light">
                            For inquiries, press, or collaboration opportunities.
                        </p>

                        <div className="space-y-6 pt-8">
                            <div className="flex items-center gap-4 text-white/80">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <Mail size={18} />
                                </div>
                                <span>hello@kmfashion.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-white/80">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <Phone size={18} />
                                </div>
                                <span>+1 (555) 000-0000</span>
                            </div>
                            <div className="flex items-center gap-4 text-white/80">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <MapPin size={18} />
                                </div>
                                <span>123 Fashion Dist, New York, NY</span>
                            </div>
                        </div>
                    </div>

                    <GlassCard className="p-10 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <GlassInput placeholder="First Name" />
                            <GlassInput placeholder="Last Name" />
                        </div>
                        <GlassInput placeholder="Email Address" />
                        <textarea
                            rows={5}
                            placeholder="Your Message..."
                            className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 focus:border-white outline-none resize-none py-2 transition-colors"
                        />
                        <div className="pt-4">
                            <GlassButton className="w-full justify-center py-4">Send Message</GlassButton>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    )
}

export default Contact
