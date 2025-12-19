import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/glass-card'

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-display text-white mb-12">PRIVACY POLICY</h1>

                    <GlassCard className="space-y-8 p-10 text-white/70 font-light leading-relaxed">
                        <section>
                            <h2 className="text-xl text-white font-medium mb-4">1. Information We Collect</h2>
                            <p>We collect information you provide directly to us when you create an account, make a purchase, or sign up for our newsletter. This includes your name, email address, shipping address, and payment information.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-medium mb-4">2. How We Use Your Information</h2>
                            <p>We use the information we collect to process your orders, send you transactional emails, and improve our services. We do not sell your personal data to third parties.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-medium mb-4">3. Data Security</h2>
                            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or destruction.</p>
                        </section>

                        <section>
                            <h2 className="text-xl text-white font-medium mb-4">4. Updates to This Policy</h2>
                            <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and will be effective as soon as it is accessible.</p>
                        </section>

                        <div className="pt-8 border-t border-white/10 text-sm opacity-50">
                            Last Updated: December 2024
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    )
}

export default Privacy
