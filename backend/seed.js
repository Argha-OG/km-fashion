const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    // Shirts (Casual/Formal)
    { name: "Oxford Classic", price: 120, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"], colors: ["white", "blue"], fit: "Regular", description: "Classic Oxford shirt.", isBestSeller: false, isNewArrival: false },
    { name: "Midnight Linen", price: 140, category: "Shirt", type: "Formal", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"], colors: ["black", "navy"], fit: "Slim", description: "Premium linen shirt.", isBestSeller: false, isNewArrival: false },
    { name: "Utility Overshirt", price: 180, category: "Shirt", type: "Layering", images: ["https://images.unsplash.com/photo-1512353087810-66de8b4433d1?q=80&w=1000&auto=format&fit=crop"], colors: ["olive", "khaki"], fit: "Relaxed", description: "Versatile overshirt.", isNewArrival: true },
    { name: "Grandad Collar", price: 130, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop"], colors: ["white", "beige"], fit: "Standard", description: "Relaxed grandad collar shirt.", isBestSeller: false, isNewArrival: false },
    { name: "Denim Western", price: 160, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=1000&auto=format&fit=crop"], colors: ["indigo"], fit: "Slim", description: "Rugged denim shirt.", isNewArrival: true },

    // T-Shirts
    { name: "Essential Crew", price: 45, category: "T-Shirt", type: "Basics", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"], colors: ["black", "white", "grey"], fit: "Regular", description: "Everyday crew neck.", isBestSeller: false, isNewArrival: false },
    { name: "Heavyweight Boxy", price: 65, category: "T-Shirt", type: "Streetwear", images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"], colors: ["cream", "charcoal"], fit: "Oversized", description: "Trendy boxy fit tee.", isBestSeller: false, isNewArrival: false },
    { name: "Vintage Wash", price: 55, category: "T-Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop"], colors: ["faded-black", "navy"], fit: "Relaxed", description: "Soft vintage wash tee.", isBestSeller: false, isNewArrival: false },
    { name: "Graphic Tech", price: 70, category: "T-Shirt", type: "Performance", images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop"], colors: ["white"], fit: "Athletic", description: "Moisture-wicking graphic tee.", isBestSeller: false, isNewArrival: false },
    { name: "Striped Mariner", price: 60, category: "T-Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1525459524646-c74388e36746?q=80&w=1000&auto=format&fit=crop"], colors: ["navy-white"], fit: "Standard", description: "Classic striped tee.", isBestSeller: false, isNewArrival: false },

    // Pants
    { name: "Tech Cargo", price: 220, category: "Pant", type: "Utility", images: ["https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000&auto=format&fit=crop"], colors: ["black", "olive"], fit: "Tapered", description: "Functional tech cargo pants.", isNewArrival: true },
    { name: "Selvedge Denim", price: 280, category: "Pant", type: "Jeans", images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop"], colors: ["raw-indigo"], fit: "Slim Straight", description: "High-quality selvedge denim.", isBestSeller: true },
    { name: "Pleated Chino", price: 150, category: "Pant", type: "Smart Casual", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop"], colors: ["khaki", "navy"], fit: "Relaxed", description: "Smart casual pleated chinos.", isBestSeller: false, isNewArrival: false },
    { name: "Track Jogger", price: 110, category: "Pant", type: "Athleisure", images: ["https://images.unsplash.com/photo-1552066344-24201b805e6a?q=80&w=1000&auto=format&fit=crop"], colors: ["grey", "black"], fit: "Slim", description: "Comfortable track joggers.", isBestSeller: false, isNewArrival: false },
    { name: "Wool Dress Pant", price: 250, category: "Pant", type: "Formal", images: ["https://images.unsplash.com/photo-1507680434567-5739c8a97801?q=80&w=1000&auto=format&fit=crop"], colors: ["charcoal", "black"], fit: "Tailored", description: "Elegant wool dress pants.", isBestSeller: false, isNewArrival: false },

    // Short Pants
    { name: "Nylon Active Short", price: 85, category: "Short Pant", type: "Sport", images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop"], colors: ["black", "neon-green"], fit: "Athletic", description: "Lightweight active shorts.", isBestSeller: false, isNewArrival: false },
    { name: "Chino Short", price: 90, category: "Short Pant", type: "Casual", images: ["https://images.unsplash.com/photo-1563229617-a065476d0541?q=80&w=1000&auto=format&fit=crop"], colors: ["beige", "navy"], fit: "Regular", description: "Classic chino shorts.", isBestSeller: false, isNewArrival: false },
    { name: "Sweat Short", price: 75, category: "Short Pant", type: "Lounge", images: ["https://images.unsplash.com/photo-1598263595568-17a7837890ec?q=80&w=1000&auto=format&fit=crop"], colors: ["grey"], fit: "Relaxed", description: "Cozy sweat shorts.", isBestSeller: false, isNewArrival: false },
    { name: "Cargo Short", price: 110, category: "Short Pant", type: "Utility", images: ["https://images.unsplash.com/photo-1582236531981-2244229988a8?q=80&w=1000&auto=format&fit=crop"], colors: ["camo", "khaki"], fit: "Loose", description: "Utility cargo shorts.", isBestSeller: false, isNewArrival: false },

    // Socks
    { name: "Performance Crew", price: 25, category: "Socks", type: "Sport", images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000&auto=format&fit=crop"], colors: ["white", "black"], fit: "One Size", description: "Moisture-wicking crew socks.", isBestSeller: false, isNewArrival: false },
    { name: "Merino Hiker", price: 35, category: "Socks", type: "Outdoor", images: ["https://images.unsplash.com/photo-1582966551893-ec14e82df4d6?q=80&w=1000&auto=format&fit=crop"], colors: ["grey-marl"], fit: "One Size", description: "Durable merino wool hiking socks.", isBestSeller: false, isNewArrival: false },
    { name: "No-Show Loafer", price: 20, category: "Socks", type: "Invisible", images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "One Size", description: "Invisible loafer socks.", isBestSeller: false, isNewArrival: false },

    // Shoes
    { name: "Runner VS1", price: 320, category: "Shoes", type: "Sneaker", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"], colors: ["red", "white"], fit: "True to Size", description: "High-performance running shoes.", isBestSeller: true, isNewArrival: false },
    { name: "Urban Boot", price: 450, category: "Shoes", type: "Boot", images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop"], colors: ["wheat", "black"], fit: "Standard", description: "Stylish urban boots.", isBestSeller: false, isNewArrival: false },
    { name: "Court Minimal", price: 280, category: "Shoes", type: "Sneaker", images: ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1000&auto=format&fit=crop"], colors: ["white"], fit: "True to Size", description: "Minimalist court sneakers.", isBestSeller: false, isNewArrival: false },
    { name: "Suede Loafer", price: 350, category: "Shoes", type: "Formal", images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"], colors: ["navy"], fit: "Wide", description: "Elegant suede loafers.", isBestSeller: false, isNewArrival: false },

    // Head Cap
    { name: "Stealth Dad Cap", price: 55, category: "Head Cap", type: "Casual", images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Adjustable", description: "Low-profile dad cap.", isBestSeller: true, isNewArrival: false },
    { name: "5-Panel Camper", price: 60, category: "Head Cap", type: "Street", images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop"], colors: ["olive", "navy"], fit: "Clip", description: "Urban 5-panel cap.", isBestSeller: false, isNewArrival: false },
    { name: "Wool Beanie", price: 45, category: "Head Cap", type: "Winter", images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop"], colors: ["orange", "black"], fit: "One Size", description: "Warm wool beanie.", isBestSeller: false, isNewArrival: false },
    { name: "Bucket Hat", price: 50, category: "Head Cap", type: "Summer", images: ["https://images.unsplash.com/photo-1509303698263-a61f52b7b51f?q=80&w=1000&auto=format&fit=crop"], colors: ["white", "tie-dye"], fit: "M/L", description: "Trendy bucket hat.", isBestSeller: false, isNewArrival: false },
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/km-fashion', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('MongoDB Connected');
        await Product.deleteMany({});
        console.log('Cleared existing products');
        await Product.insertMany(products);
        console.log('Seeded products');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
