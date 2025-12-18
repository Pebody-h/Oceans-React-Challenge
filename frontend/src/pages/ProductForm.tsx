import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function ProductForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const API_URL = import.meta.env.VITE_API_URL;

    const onSubmit = async (data: any) => {
        try {
            await axios.post(`${API_URL}/products`, data);
            alert("Producto creado correctamente");
            reset();
        } catch (e) { alert("Error al guardar"); }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-6">Añadir Nuevo Producto</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input {...register("name", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Precio</label>
                    <input type="number" step="0.01" {...register("price", { required: true, min: 0.01 })} className="w-full border p-2 rounded" />
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition">
                    Guardar Producto
                </button>
            </form>
        </div>
    );
}