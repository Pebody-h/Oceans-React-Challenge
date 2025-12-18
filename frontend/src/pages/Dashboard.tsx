import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, DollarSign, Package, Receipt } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export default function Dashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/orders`).then(res => setOrders(res.data));
    }, [API_URL]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-gray-800 flex items-center gap-2">
                    <Receipt className="text-blue-600" /> Historial de Ventas
                </h1>
                <div className="text-sm font-medium text-gray-500">
                    Total órdenes: {orders.length}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <StatusBadge />
                            <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                                <Calendar size={14} /> {new Date(order.created_at).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Productos</p>
                            <div className="space-y-2">
                                {order.order_items.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                        {item.products.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-100">
                            <span className="text-sm font-bold text-gray-400 uppercase">Monto Total</span>
                            <span className="text-2xl font-black text-blue-600 flex items-center italic">
                                <DollarSign size={20} className="text-blue-400" /> {Number(order.total).toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {orders.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <Package className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500 font-medium">No hay órdenes registradas todavía.</p>
                </div>
            )}
        </div>
    );
}