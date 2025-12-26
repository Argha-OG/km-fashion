const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
    // --- SHIRTS (10) ---
    { name: "Oxford Classic White", price: 120, category: "Shirt", type: "Formal", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"], colors: ["white"], fit: "Regular", description: "The essential white Oxford shirt for every wardrobe.", isBestSeller: true, isNewArrival: false },
    { name: "Midnight Navy Linen", price: 140, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"], colors: ["navy"], fit: "Slim", description: "Breathable linen shirt in a deep midnight navy.", isBestSeller: false, isNewArrival: true },
    { name: "Chambray Workshirt", price: 135, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"], colors: ["blue"], fit: "Relaxed", description: "Rugged chambray fabric with utility pockets.", isBestSeller: false, isNewArrival: false },
    { name: "Satin Silk Tuxedo", price: 250, category: "Shirt", type: "Formal", images: ["https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Tailored", description: "Premium silk shirt for evening wear.", isBestSeller: false, isNewArrival: false },
    { name: "Vintage Flannel Plaid", price: 110, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop"], colors: ["red/black"], fit: "Regular", description: "Soft brushed cotton flannel in classic plaid.", isBestSeller: true, isNewArrival: false },
    { name: "Grandad Collar Striped", price: 125, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"], colors: ["white/blue"], fit: "Slim", description: "Modern collarless design with subtle stripes.", isBestSeller: false, isNewArrival: true },
    { name: "Cuban Collar Resort", price: 95, category: "Shirt", type: "Summer", images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop"], colors: ["beige"], fit: "Boxy", description: "Short sleeve resort shirt for summer days.", isBestSeller: false, isNewArrival: false },
    { name: "Denim Western Snap", price: 155, category: "Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?q=80&w=1000&auto=format&fit=crop"], colors: ["indigo"], fit: "Slim", description: "Authentic western detailing with pearl snaps.", isBestSeller: false, isNewArrival: false },
    { name: "Tactical Overshirt", price: 190, category: "Shirt", type: "Layering", images: ["https://images.unsplash.com/photo-1512353087810-66de8b4433d1?q=80&w=1000&auto=format&fit=crop"], colors: ["olive"], fit: "Oversized", description: "Heavyweight cotton with multiple cargo pockets.", isBestSeller: false, isNewArrival: true },
    { name: "Bamboo Viscose Tee", price: 60, category: "Shirt", type: "Basics", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"], colors: ["sage"], fit: "Regular", description: "Ultra-soft sustainable bamboo fabric.", isBestSeller: false, isNewArrival: false },

    // --- T-SHIRTS (10) ---
    { name: "Heavyweight Boxy Black", price: 55, category: "T-Shirt", type: "Streetwear", images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Oversized", description: "Thick cotton jersey with a structured fit.", isBestSeller: true, isNewArrival: false },
    { name: "Essential White Crew", price: 35, category: "T-Shirt", type: "Basics", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"], colors: ["white"], fit: "Regular", description: "The perfect white tee, combed cotton.", isBestSeller: true, isNewArrival: false },
    { name: "Vintage Wash Grey", price: 45, category: "T-Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop"], colors: ["grey"], fit: "Relaxed", description: "Faded look for that lived-in feel.", isBestSeller: false, isNewArrival: false },
    { name: "Graphic Art Print", price: 65, category: "T-Shirt", type: "Statement", images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop"], colors: ["cream"], fit: "Boxy", description: "Limited edition abstract art screenprint.", isBestSeller: false, isNewArrival: true },
    { name: "Striped Mariner Blue", price: 50, category: "T-Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1525459524646-c74388e36746?q=80&w=1000&auto=format&fit=crop"], colors: ["navy/white"], fit: "Standard", description: "Classic Breton stripes.", isBestSeller: false, isNewArrival: false },
    { name: "Performance Tech Tee", price: 55, category: "T-Shirt", type: "Sport", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"], colors: ["charcoal"], fit: "Athletic", description: "Moisture-wicking mesh back panel.", isBestSeller: false, isNewArrival: false },
    { name: "Mock Neck Long Sleeve", price: 70, category: "T-Shirt", type: "Formal", images: ["https://images.unsplash.com/photo-1618354691438-25bc04584c23?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Slim", description: "Sophisticated mock neck silhouette.", isBestSeller: false, isNewArrival: false },
    { name: "Henley Waffle Knit", price: 60, category: "T-Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"], colors: ["olive"], fit: "Regular", description: "Textured waffle fabric for warmth.", isBestSeller: false, isNewArrival: false },
    { name: "Pocket Tee Mustard", price: 40, category: "T-Shirt", type: "Casual", images: ["https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop"], colors: ["mustard"], fit: "Relaxed", description: "Heavy cotton with chest pocket.", isBestSeller: false, isNewArrival: false },
    { name: "Tie-Dye Summer", price: 55, category: "T-Shirt", type: "Feature", images: ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000&auto=format&fit=crop"], colors: ["multi"], fit: "Oversized", description: "Hand-dyed psychedelic pattern.", isBestSeller: false, isNewArrival: true },

    // --- PANTS (10) ---
    { name: "Tech Cargo Jogger", price: 160, category: "Pant", type: "Utility", images: ["https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Tapered", description: "Water repellent with ankle cuffs.", isBestSeller: true, isNewArrival: false },
    { name: "Raw Denim Selvedge", price: 220, category: "Pant", type: "Jeans", images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop"], colors: ["indigo"], fit: "Straight", description: "14oz Japanese denim, stiff and durable.", isBestSeller: false, isNewArrival: false },
    { name: "Pleated Dress Trouser", price: 180, category: "Pant", type: "Formal", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop"], colors: ["grey"], fit: "Tailored", description: "Double pleats with high rise waist.", isBestSeller: false, isNewArrival: false },
    { name: "Classic Chino Khaki", price: 90, category: "Pant", type: "Smart Casual", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop"], colors: ["khaki"], fit: "Slim", description: "Office appropriate stretch cotton.", isBestSeller: true, isNewArrival: false },
    { name: "Wide Leg Linen", price: 130, category: "Pant", type: "Summer", images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop"], colors: ["beige"], fit: "Wide", description: "Flowy silhouette for hot weather.", isBestSeller: false, isNewArrival: true },
    { name: "Corduroy Carpenter", price: 150, category: "Pant", type: "Streetwear", images: ["https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000&auto=format&fit=crop"], colors: ["brown"], fit: "Relaxed", description: "Vintage workwear style in corduroy.", isBestSeller: false, isNewArrival: false },
    { name: "Distressed Skinny Jean", price: 110, category: "Pant", type: "Jeans", images: ["https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop"], colors: ["light-wash"], fit: "Skinny", description: "Rock n roll vibe with knee rips.", isBestSeller: false, isNewArrival: false },
    { name: "Track Pant Nylon", price: 100, category: "Pant", type: "Sport", images: ["https://images.unsplash.com/photo-1552066344-24201b805e6a?q=80&w=1000&auto=format&fit=crop"], colors: ["navy/red"], fit: "Relaxed", description: "Retro 90s sportswear aesthetic.", isBestSeller: false, isNewArrival: false },
    { name: "Wool Flannel Trousers", price: 200, category: "Pant", type: "Formal", images: ["https://images.unsplash.com/photo-1507680434567-5739c8a97801?q=80&w=1000&auto=format&fit=crop"], colors: ["charcoal"], fit: "Slim", description: "Warm and elegant for winter.", isBestSeller: false, isNewArrival: false },
    { name: "Stretch Commuter", price: 140, category: "Pant", type: "Functional", images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Slim", description: "Looks like dress pants, feels like yoga pants.", isBestSeller: false, isNewArrival: true },

    // --- SHORTS (5) ---
    { name: "Active Running Short", price: 60, category: "Short Pant", type: "Sport", images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop"], colors: ["black/neon"], fit: "Athletic", description: "Brief liner included, 5 inch inseam.", isBestSeller: false, isNewArrival: false },
    { name: "Chino Short Navy", price: 70, category: "Short Pant", type: "Casual", images: ["https://images.unsplash.com/photo-1563229617-a065476d0541?q=80&w=1000&auto=format&fit=crop"], colors: ["navy"], fit: "Regular", description: "Mid-length, goes with everything.", isBestSeller: true, isNewArrival: false },
    { name: "French Terry Sweatshort", price: 65, category: "Short Pant", type: "Lounge", images: ["https://images.unsplash.com/photo-1598263595568-17a7837890ec?q=80&w=1000&auto=format&fit=crop"], colors: ["grey"], fit: "Relaxed", description: "Ultimate comfort for home.", isBestSeller: false, isNewArrival: false },
    { name: "Camo Cargo Short", price: 85, category: "Short Pant", type: "Utility", images: ["https://images.unsplash.com/photo-1582236531981-2244229988a8?q=80&w=1000&auto=format&fit=crop"], colors: ["camo"], fit: "Loose", description: "Extra pockets for gear.", isBestSeller: false, isNewArrival: false },
    { name: "Resort Swim Trunk", price: 75, category: "Short Pant", type: "Swim", images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop"], colors: ["floral"], fit: "Standard", description: "Quick dry fabric with mesh lining.", isBestSeller: false, isNewArrival: true },

    // --- SHOES (10) ---
    { name: "Minimalist Leather Sneaker", price: 180, category: "Shoes", type: "Casual", images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"], colors: ["white"], fit: "Standard", description: "Premium leather low top.", isBestSeller: true, isNewArrival: false },
    { name: "Chunky Daddy Runner", price: 160, category: "Shoes", type: "Sneaker", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"], colors: ["multi/grey"], fit: "Wide", description: "Thick sole trend sneaker.", isBestSeller: false, isNewArrival: true },
    { name: "Chelsea Boot Suede", price: 220, category: "Shoes", type: "Boot", images: ["https://images.unsplash.com/photo-1620862663969-a864ae2579df?q=80&w=1000&auto=format&fit=crop"], colors: ["tan"], fit: "Narrow", description: "Elegant profile with elastic gore.", isBestSeller: false, isNewArrival: false },
    { name: "Combat Boot Leather", price: 250, category: "Shoes", type: "Boot", images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Standard", description: "Military inspired lace-up.", isBestSeller: false, isNewArrival: false },
    { name: "Loafer Horsebit", price: 195, category: "Shoes", type: "Formal", images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Standard", description: "Classic gold horsebit detail.", isBestSeller: false, isNewArrival: false },
    { name: "Canvas High Top", price: 85, category: "Shoes", type: "Sneaker", images: ["https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop"], colors: ["black/white"], fit: "Standard", description: "Timeless canvas silhouette.", isBestSeller: true, isNewArrival: false },
    { name: "Oxford Brogue", price: 210, category: "Shoes", type: "Formal", images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"], colors: ["brown"], fit: "Standard", description: "Detailed perforation on leather.", isBestSeller: false, isNewArrival: false },
    { name: "Sport Trainer", price: 140, category: "Shoes", type: "Sport", images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"], colors: ["neon/black"], fit: "Athletic", description: "High performance gym shoe.", isBestSeller: false, isNewArrival: false },
    { name: "Sandal Slide", price: 45, category: "Shoes", type: "Summer", images: ["https://images.unsplash.com/photo-1603487742131-4160d698725d?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Wide", description: "Rubber slide for poolside.", isBestSeller: false, isNewArrival: false },
    { name: "Velvet Slipper", price: 300, category: "Shoes", type: "Formal", images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"], colors: ["navy"], fit: "Standard", description: "Luxury embroidered house shoe.", isBestSeller: false, isNewArrival: true },

    // --- ACCS / CAPS (5) ---
    { name: "Classic Dad Cap Black", price: 35, category: "Head Cap", type: "Casual", images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"], colors: ["black"], fit: "Adjustable", description: "Curved brim unconstructed.", isBestSeller: true, isNewArrival: false },
    { name: "Wool Knit Beanie", price: 40, category: "Head Cap", type: "Winter", images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop"], colors: ["maroon"], fit: "One Size", description: "Chunky knit for cold days.", isBestSeller: false, isNewArrival: false },
    { name: "Bucket Hat Denim", price: 45, category: "Head Cap", type: "Summer", images: ["https://images.unsplash.com/photo-1509303698263-a61f52b7b51f?q=80&w=1000&auto=format&fit=crop"], colors: ["blue"], fit: "M/L", description: "Stonewashed denim fabric.", isBestSeller: false, isNewArrival: true },
    { name: "5-Panel Nylon Cap", price: 50, category: "Head Cap", type: "Street", images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop"], colors: ["green"], fit: "Clip", description: "Technical fabric rain resistant.", isBestSeller: false, isNewArrival: false },
    { name: "Snapback Trucker", price: 30, category: "Head Cap", type: "Casual", images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"], colors: ["red/white"], fit: "Adjustable", description: "Classic mesh back foam front.", isBestSeller: false, isNewArrival: false },
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
        console.log(`Seeded ${products.length} products successfully`);
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
