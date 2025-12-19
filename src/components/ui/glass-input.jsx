import React from 'react'
import { cn } from '@/lib/utils'

const GlassInput = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors",
                className
            )}
            {...props}
        />
    )
})
GlassInput.displayName = "GlassInput"

export default GlassInput
