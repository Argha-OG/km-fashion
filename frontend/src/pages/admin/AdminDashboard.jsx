import { useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
    const { products, fetchProducts, deleteProduct, loading } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    if (loading && products.length === 0) return <div className="container py-20 text-center">Loading...</div>;

    return (
        <div className="container py-20 px-4 md:px-0">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-medium">Product Dashboard</h1>
                <Link to="/admin/products/new" className="bg-primary text-secondary px-6 py-2 rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
                <table className="w-full text-left">
                    <thead className="bg-white/10 border-b border-white/10">
                        <tr>
                            <th className="p-4 font-medium">Image</th>
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Category</th>
                            <th className="p-4 font-medium">Price</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="w-12 h-12 rounded bg-white/10 overflow-hidden">
                                        {product.images && product.images[0] ? (
                                            <img
                                                src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : <div className="w-full h-full bg-gray-700" />}
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">${product.price}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {product.isBestSeller && <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded">Best Seller</span>}
                                        {product.isNewArrival && <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded">New</span>}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <Link to={`/admin/products/edit/${product._id}`} className="p-2 hover:bg-white/10 rounded-full transition-colors text-blue-400">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-red-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="text-center py-10 text-muted">No products found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
