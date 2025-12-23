const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Create `uploads` directory if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// GET all products
router.get('/', async (req, res) => {
    try {
        const { category, isBestSeller, isNewArrival, search } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (isBestSeller) {
            query.isBestSeller = isBestSeller === 'true';
        }
        if (isNewArrival) {
            query.isNewArrival = isNewArrival === 'true';
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new product
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { name, price, description, category, type, colors, fit, details, isBestSeller, isNewArrival } = req.body;

        let imagePaths = [];
        if (req.files) {
            imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        } else if (req.body.imageUrls) {
            // Handle if URLs are passed directly (optional)
            imagePaths = JSON.parse(req.body.imageUrls);
        }

        const product = new Product({
            name,
            price,
            description,
            category,
            type,
            images: imagePaths,
            colors: colors ? (typeof colors === 'string' ? JSON.parse(colors) : colors) : [],
            fit,
            details,
            isBestSeller: isBestSeller === 'true' || isBestSeller === true,
            isNewArrival: isNewArrival === 'true' || isNewArrival === true
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.error(error);
    }
});

// PUT update product
router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, price, description, category, type, colors, fit, details, isBestSeller, isNewArrival, existingImages } = req.body;

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.category = category || product.category;
        product.type = type || product.type;
        product.fit = fit || product.fit;
        product.details = details || product.details;

        if (isBestSeller !== undefined) product.isBestSeller = isBestSeller === 'true' || isBestSeller === true;
        if (isNewArrival !== undefined) product.isNewArrival = isNewArrival === 'true' || isNewArrival === true;

        if (colors) {
            product.colors = (typeof colors === 'string' ? JSON.parse(colors) : colors);
        }

        // Handle Images: Mix of existing and new
        let currentImages = existingImages ? (typeof existingImages === 'string' ? [existingImages] : existingImages) : []; // URLs of images to keep
        if (typeof existingImages === 'string' && existingImages.startsWith('[')) {
            currentImages = JSON.parse(existingImages);
        }

        let newImagePaths = [];
        if (req.files) {
            newImagePaths = req.files.map(file => `/uploads/${file.filename}`);
        }

        product.images = [...currentImages, ...newImagePaths];

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
