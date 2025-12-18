import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductForm from './pages/ProductForm';
import CreateOrder from './pages/CreateOrder';
import { LayoutDashboard, PlusCircle, ShoppingCart } from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-black text-blue-600 uppercase italic">Oceans Resto</h1>
            <div className="flex gap-6">
              <Link to="/" className="flex items-center gap-1 hover:text-blue-500 font-medium transition">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <Link to="/create-product" className="flex items-center gap-1 hover:text-blue-500 font-medium transition">
                <PlusCircle size={18} /> Producto
              </Link>
              <Link to="/create-order" className="flex items-center gap-1 hover:text-blue-500 font-medium transition">
                <ShoppingCart size={18} /> Nueva Orden
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-product" element={<ProductForm />} />
            <Route path="/create-order" element={<CreateOrder />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}