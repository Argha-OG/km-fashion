import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Eye } from 'lucide-react'
import GlassButton from './glass-button'

const ProductCard = ({ product, index = 0 }) => {
    const navigate = useNavigate()

    const id = product._id || product.id
    // Simple image fallback logic: Array[0] -> String -> Placeholder
    const image = (product.images && product.images.length > 0)
        ? product.images[0]
        : (product.image || "https://via.placeholder.com/600")

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative flex flex-col gap-4 cursor-pointer"
            onClick={() => navigate(`/product/${id}`)}
        >
            {/* Image Container with advanced hover effects */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-4xl bg-glass-10 border border-primary/5 shadow-2xl transition-all duration-500 group-hover:shadow-primary/5 group-hover:border-primary/20">
                {/* Background Gradient for depth */}
                <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <img
                    src={image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 z-20 flex items-end justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex w-full gap-2 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                        <GlassButton className="flex-1 text-xs py-3 bg-primary text-background hover:bg-primary/90 border-0 shadow-xl backdrop-blur-md rounded-xl">
                            <ShoppingBag size={14} className="mr-2" /> Add
                        </GlassButton>
                        <GlassButton className="w-12 py-3 bg-background/40 text-primary hover:bg-background/60 border border-primary/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Eye size={16} />
                        </GlassButton>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-1 px-2">
                <div className="flex justify-between items-start">
                    <h3 className="font-display text-lg tracking-wide text-primary transition-colors group-hover:text-primary/80">
                        {product.name}
                    </h3>
                    <span className="font-medium text-primary/90">RM {product.price}</span>
                </div>
                <p className="text-sm text-primary/40 uppercase tracking-wider text-[10px]">{product.category}</p>
            </div>
        </motion.div>
    )
}

export default ProductCard
