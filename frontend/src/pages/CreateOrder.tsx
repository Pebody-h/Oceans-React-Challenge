import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export default function CreateOrder() {
    const [products, setProducts] = useState<any[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/products`).then(res => setProducts(res.data));
    }, [API_URL]);

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    const handleFinish = async () => {
        if (cart.length === 0) return alert("Agrega al menos un producto");
        try {
            await axios.post(`${API_URL}/orders`, {
                products: cart.map(p => p.id),
                total
            });
            navigate('/');
        } catch (e) {
            alert("Error al guardar la orden");
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Menú Disponible</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map(p => (
                        <ProductCard
                            key={p.id}
                            name={p.name}
                            price={p.price}
                            onAdd={() => setCart([...cart, p])}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 text-white p-6 rounded-2xl h-fit sticky top-24 shadow-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 flex justify-between items-center">
                    Tu Pedido <ShoppingCart size={20} className="text-blue-400" />
                </h2>

                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto scrollbar-hide">
                    {cart.length === 0 && <p className="text-gray-500 text-sm italic">No hay productos seleccionados...</p>}
                    {cart.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm animate-in fade-in slide-in-from-right-2">
                            <span className="font-medium">{item.name}</span>
                            <div className="flex gap-3 items-center">
                                <span className="text-blue-300 font-mono">${Number(item.price).toFixed(2)}</span>
                                <button
                                    onClick={() => setCart(cart.filter((_, idx) => idx !== i))}
                                    className="hover:text-red-400 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-2xl font-black flex justify-between pt-4 border-t border-gray-700">
                    <span className="text-gray-400 text-lg">Total</span>
                    <span className="text-green-400">${total.toFixed(2)}</span>
                </div>

                <button
                    onClick={handleFinish}
                    disabled={cart.length === 0}
                    className="w-full mt-6 bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                    Confirmar y Cerrar Orden
                </button>
            </div>
        </div>
    );
}