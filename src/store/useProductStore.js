import { create } from 'zustand';
import { products as demoProducts } from '@/data/products';

const API_URL = 'http://localhost:5000/api/products';

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async (filters = {}) => {
        set({ loading: true, error: null });
        try {
            // Attempt to fetch from API
            const queryParams = new URLSearchParams();
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.isBestSeller) queryParams.append('isBestSeller', filters.isBestSeller);
            if (filters.isNewArrival) queryParams.append('isNewArrival', filters.isNewArrival);
            if (filters.search) queryParams.append('search', filters.search);

            const response = await fetch(`${API_URL}?${queryParams}`);

            if (!response.ok) {
                console.warn("Backend not connected, using demo data.");
                // Simply return demo data if backend fails, applying basic frontend filtering if needed
                let data = demoProducts;
                if (filters.category) data = data.filter(p => p.category === filters.category);
                if (filters.isBestSeller) data = data.filter(p => p.isBestSeller);
                if (filters.isNewArrival) data = data.filter(p => p.isNewArrival);
                if (filters.search) data = data.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));

                set({ products: data, loading: false });
                return;
            }

            const data = await response.json();
            set({ products: data, loading: false });
        } catch (error) {
            console.warn("Backend not reachable, defaulting to demo data.", error);
            // Fallback to demo data on network error
            let data = demoProducts;
            if (filters.category) data = data.filter(p => p.category === filters.category);
            if (filters.isBestSeller) data = data.filter(p => p.isBestSeller);
            if (filters.isNewArrival) data = data.filter(p => p.isNewArrival);
            if (filters.search) data = data.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()));

            set({ products: data, loading: false, error: null });
        }
    },

    getProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            const data = await response.json();
            set({ loading: false });
            return data;
        } catch (error) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    addProduct: async (productData) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: productData, // FormData
            });
            if (!response.ok) throw new Error('Failed to add product');
            const newProduct = await response.json();
            set((state) => ({ products: [newProduct, ...state.products], loading: false }));
            return newProduct;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    updateProduct: async (id, productData) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                body: productData, // FormData
            });
            if (!response.ok) throw new Error('Failed to update product');
            const updatedProduct = await response.json();
            set((state) => ({
                products: state.products.map((p) => (p._id === id ? updatedProduct : p)),
                loading: false,
            }));
            return updatedProduct;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete product');
            set((state) => ({
                products: state.products.filter((p) => p._id !== id),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
}));
