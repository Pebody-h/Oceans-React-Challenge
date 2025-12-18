import { Plus } from 'lucide-react';

interface ProductCardProps {
    name: string;
    price: number;
    onAdd: () => void;
}

export const ProductCard = ({ name, price, onAdd }: ProductCardProps) => {
    return (
        <button
            onClick={onAdd}
            className="p-4 bg-white border rounded-xl hover:border-blue-500 transition text-left flex justify-between items-center group shadow-sm"
        >
            <div>
                <p className="font-bold text-gray-800">{name}</p>
                <p className="text-blue-600 font-medium">${Number(price).toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-600 transition">
                <Plus size={18} className="text-blue-600 group-hover:text-white" />
            </div>
        </button>
    );
};