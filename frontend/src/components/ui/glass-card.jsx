import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const GlassCard = React.forwardRef(({ className, children, hoverEffect = false, ...props }, ref) => {
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hoverEffect ? { y: -5, borderColor: 'rgba(255,255,255,0.3)' } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
                "glass-panel p-6 rounded-3xl",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
})
GlassCard.displayName = "GlassCard"

export default GlassCard
