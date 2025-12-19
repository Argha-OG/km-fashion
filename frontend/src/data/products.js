export const products = [
    // Shirts (Casual/Formal)
    { id: 101, name: "Oxford Classic", price: 120, category: "Shirt", type: "Casual", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop", colors: ["white", "blue"], fit: "Regular" },
    { id: 102, name: "Midnight Linen", price: 140, category: "Shirt", type: "Formal", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop", colors: ["black", "navy"], fit: "Slim" },
    { id: 103, name: "Utility Overshirt", price: 180, category: "Shirt", type: "Layering", image: "https://images.unsplash.com/photo-1512353087810-66de8b4433d1?q=80&w=1000&auto=format&fit=crop", colors: ["olive", "khaki"], fit: "Relaxed" },
    { id: 104, name: "Grandad Collar", price: 130, category: "Shirt", type: "Casual", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop", colors: ["white", "beige"], fit: "Standard" },
    { id: 105, name: "Denim Western", price: 160, category: "Shirt", type: "Casual", image: "https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=1000&auto=format&fit=crop", colors: ["indigo"], fit: "Slim" },

    // T-Shirts
    { id: 201, name: "Essential Crew", price: 45, category: "T-Shirt", type: "Basics", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop", colors: ["black", "white", "grey"], fit: "Regular" },
    { id: 202, name: "Heavyweight Boxy", price: 65, category: "T-Shirt", type: "Streetwear", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop", colors: ["cream", "charcoal"], fit: "Oversized" },
    { id: 203, name: "Vintage Wash", price: 55, category: "T-Shirt", type: "Casual", image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop", colors: ["faded-black", "navy"], fit: "Relaxed" },
    { id: 204, name: "Graphic Tech", price: 70, category: "T-Shirt", type: "Performance", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", colors: ["white"], fit: "Athletic" },
    { id: 205, name: "Striped Mariner", price: 60, category: "T-Shirt", type: "Casual", image: "https://images.unsplash.com/photo-1525459524646-c74388e36746?q=80&w=1000&auto=format&fit=crop", colors: ["navy-white"], fit: "Standard" },

    // Pants
    { id: 301, name: "Tech Cargo", price: 220, category: "Pant", type: "Utility", image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000&auto=format&fit=crop", colors: ["black", "olive"], fit: "Tapered" },
    { id: 302, name: "Selvedge Denim", price: 280, category: "Pant", type: "Jeans", image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop", colors: ["raw-indigo"], fit: "Slim Straight" },
    { id: 303, name: "Pleated Chino", price: 150, category: "Pant", type: "Smart Casual", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop", colors: ["khaki", "navy"], fit: "Relaxed" },
    { id: 304, name: "Track Jogger", price: 110, category: "Pant", type: "Athleisure", image: "https://images.unsplash.com/photo-1552066344-24201b805e6a?q=80&w=1000&auto=format&fit=crop", colors: ["grey", "black"], fit: "Slim" },
    { id: 305, name: "Wool Dress Pant", price: 250, category: "Pant", type: "Formal", image: "https://images.unsplash.com/photo-1507680434567-5739c8a97801?q=80&w=1000&auto=format&fit=crop", colors: ["charcoal", "black"], fit: "Tailored" },

    // Short Pants
    { id: 401, name: "Nylon Active Short", price: 85, category: "Short Pant", type: "Sport", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop", colors: ["black", "neon-green"], fit: "Athletic" },
    { id: 402, name: "Chino Short", price: 90, category: "Short Pant", type: "Casual", image: "https://images.unsplash.com/photo-1563229617-a065476d0541?q=80&w=1000&auto=format&fit=crop", colors: ["beige", "navy"], fit: "Regular" },
    { id: 403, name: "Sweat Short", price: 75, category: "Short Pant", type: "Lounge", image: "https://images.unsplash.com/photo-1598263595568-17a7837890ec?q=80&w=1000&auto=format&fit=crop", colors: ["grey"], fit: "Relaxed" },
    { id: 404, name: "Cargo Short", price: 110, category: "Short Pant", type: "Utility", image: "https://images.unsplash.com/photo-1582236531981-2244229988a8?q=80&w=1000&auto=format&fit=crop", colors: ["camo", "khaki"], fit: "Loose" },

    // Socks
    { id: 501, name: "Performance Crew", price: 25, category: "Socks", type: "Sport", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000&auto=format&fit=crop", colors: ["white", "black"], fit: "One Size" },
    { id: 502, name: "Merino Hiker", price: 35, category: "Socks", type: "Outdoor", image: "https://images.unsplash.com/photo-1582966551893-ec14e82df4d6?q=80&w=1000&auto=format&fit=crop", colors: ["grey-marl"], fit: "One Size" },
    { id: 503, name: "No-Show Loafer", price: 20, category: "Socks", type: "Invisible", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000&auto=format&fit=crop", colors: ["black"], fit: "One Size" },

    // Shoes
    { id: 601, name: "Runner VS1", price: 320, category: "Shoes", type: "Sneaker", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop", colors: ["red", "white"], fit: "True to Size" },
    { id: 602, name: "Urban Boot", price: 450, category: "Shoes", type: "Boot", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop", colors: ["wheat", "black"], fit: "Standard" },
    { id: 603, name: "Court Minimal", price: 280, category: "Shoes", type: "Sneaker", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1000&auto=format&fit=crop", colors: ["white"], fit: "True to Size" },
    { id: 604, name: "Suede Loafer", price: 350, category: "Shoes", type: "Formal", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop", colors: ["navy"], fit: "Wide" },

    // Head Cap
    { id: 701, name: "Stealth Dad Cap", price: 55, category: "Head Cap", type: "Casual", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop", colors: ["black"], fit: "Adjustable" },
    { id: 702, name: "5-Panel Camper", price: 60, category: "Head Cap", type: "Street", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop", colors: ["olive", "navy"], fit: "Clip" },
    { id: 703, name: "Wool Beanie", price: 45, category: "Head Cap", type: "Winter", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop", colors: ["orange", "black"], fit: "One Size" },
    { id: 704, name: "Bucket Hat", price: 50, category: "Head Cap", type: "Summer", image: "https://images.unsplash.com/photo-1509303698263-a61f52b7b51f?q=80&w=1000&auto=format&fit=crop", colors: ["white", "tie-dye"], fit: "M/L" },
]
