import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { ImagePlus, X } from 'lucide-react';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addProduct, getProduct, updateProduct, loading: storeLoading } = useProductStore();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Shirt',
        type: '',
        fit: '',
        details: '',
        isBestSeller: false,
        isNewArrival: false,
        colors: [],
        existingImages: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const product = await getProduct(id);
                if (product) {
                    setFormData({
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        category: product.category,
                        type: product.type || '',
                        fit: product.fit || '',
                        details: product.details || '',
                        isBestSeller: product.isBestSeller,
                        isNewArrival: product.isNewArrival,
                        colors: product.colors || [],
                        existingImages: product.images || []
                    });
                }
            };
            fetchProduct();
        }
    }, [id, getProduct]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index, isExisting) => {
        if (isExisting) {
            setFormData(prev => ({
                ...prev,
                existingImages: prev.existingImages.filter((_, i) => i !== index)
            }));
        } else {
            setImageFiles(prev => prev.filter((_, i) => i !== index));
            setImagePreviews(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'colors' || key === 'existingImages') {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        });

        imageFiles.forEach(file => {
            data.append('images', file);
        });

        try {
            if (id) {
                await updateProduct(id, data);
            } else {
                await addProduct(data);
            }
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-20 px-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-heading font-medium mb-8">
                {id ? 'Edit Product' : 'Add New Product'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-md">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-2 focus:outline-none focus:border-primary" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price</label>
                        <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-2 focus:outline-none focus:border-primary" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-2 focus:outline-none focus:border-primary text-primary">
                            <option value="Shirt">Shirt</option>
                            <option value="T-Shirt">T-Shirt</option>
                            <option value="Pant">Pant</option>
                            <option value="Short Pant">Short Pant</option>
                            <option value="Socks">Socks</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Head Cap">Head Cap</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Type (e.g. Casual, Formal)</label>
                        <input name="type" value={formData.type} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-2 focus:outline-none focus:border-primary" />
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Images</label>
                    <div className="flex gap-2 flex-wrap mb-2">
                        {formData.existingImages.map((img, i) => (
                            <div key={`exist-${i}`} className="relative w-20 h-20 rounded overflow-hidden group">
                                <img src={img.startsWith('http') ? img : `http://localhost:5000${img}`} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeImage(i, true)} className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        {imagePreviews.map((img, i) => (
                            <div key={`new-${i}`} className="relative w-20 h-20 rounded overflow-hidden group">
                                <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeImage(i, false)} className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        <label className="w-20 h-20 flex items-center justify-center border border-dashed border-white/20 rounded cursor-pointer hover:border-primary hover:text-primary transition-colors">
                            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                            <ImagePlus size={24} />
                        </label>
                    </div>
                </div>

                {/* Description & Details */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-2 focus:outline-none focus:border-primary h-24" required />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Details (Specs/Material)</label>
                    <textarea name="details" value={formData.details} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded p-2 focus:outline-none focus:border-primary h-24" />
                </div>

                {/* Toggles */}
                <div className="flex gap-8">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={handleChange} className="w-4 h-4 accent-primary" />
                        <span className="text-sm">Best Seller</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="isNewArrival" checked={formData.isNewArrival} onChange={handleChange} className="w-4 h-4 accent-primary" />
                        <span className="text-sm">New Arrival</span>
                    </label>
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={loading || storeLoading} className="w-full bg-primary text-secondary py-3 rounded font-medium hover:bg-primary/90 transition-colors">
                        {loading || storeLoading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProductForm;
