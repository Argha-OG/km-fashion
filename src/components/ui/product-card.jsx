import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Eye } from 'lucide-react'
import GlassButton from './glass-button'

const ProductCard = ({ product, index = 0 }) => {
    const navigate = useNavigate()

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative flex flex-col gap-4 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            {/* Image Container with advanced hover effects */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-4xl bg-glass-10 border border-white/5 shadow-2xl transition-all duration-500 group-hover:shadow-white/5 group-hover:border-white/20">
                {/* Background Gradient for depth */}
                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 z-20 flex items-end justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex w-full gap-2 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                        <GlassButton className="flex-1 text-xs py-3 bg-white/90 text-black hover:bg-white border-0 shadow-xl backdrop-blur-md rounded-xl">
                            <ShoppingBag size={14} className="mr-2" /> Add
                        </GlassButton>
                        <GlassButton className="w-12 py-3 bg-black/40 text-white hover:bg-black/60 border border-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Eye size={16} />
                        </GlassButton>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-1 px-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-display text-lg tracking-wide text-white transition-colors group-hover:text-white/80">
                        {product.name}
                    </h3>
                    <span className="font-medium text-white/90">RM {product.price}</span>
                </div>
                <p className="text-sm text-white/40 uppercase tracking-wider text-[10px]">{product.category}</p>
            </div>
        </motion.div>
    )
}

export default ProductCard
