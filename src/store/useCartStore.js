import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,
            toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
            setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
            addToCart: (product, size) => set((state) => {
                const existingItem = state.items.find(item => item.id === product.id && item.size === size)
                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.id === product.id && item.size === size
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    }
                }
                return { items: [...state.items, { ...product, size, quantity: 1 }] }
            }),
            removeFromCart: (id, size) => set((state) => ({
                items: state.items.filter(item => !(item.id === id && item.size === size))
            })),
            updateQuantity: (id, size, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.id === id && item.size === size ? { ...item, MathDefault: Math.max(1, quantity) } : item
                )
            })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'km-fashion-cart',
        }
    )
)
