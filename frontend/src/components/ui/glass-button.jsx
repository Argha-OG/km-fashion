import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const GlassButton = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "glass-btn relative overflow-hidden rounded-full font-display font-medium text-white",
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1s_infinite]" />
        </motion.button>
    )
})
GlassButton.displayName = "GlassButton"

export default GlassButton
