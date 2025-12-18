import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
);

app.get('/', (req, res) => {
    res.json({ message: "Oceans API funcionando correctamente 🚀" });
});

app.get('/products', async (req, res) => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    const { data, error } = await supabase.from('products').insert([{ name, price: Number(price) }]).select();
    if (error) return res.status(400).json(error);
    res.status(201).json(data[0]);
});

app.get('/orders', async (req, res) => {
    const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(products(name, price))')
        .order('created_at', { ascending: false });
    if (error) return res.status(400).json(error);
    res.json(data);
});

app.post('/orders', async (req, res) => {
    const { products, total } = req.body;
    const { data: order, error: orderError } = await supabase.from('orders').insert([{ total }]).select();
    if (orderError) return res.status(400).json(orderError);

    const items = products.map((pId: string) => ({
        order_id: order[0].id,
        product_id: pId
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(items);
    if (itemsError) return res.status(400).json(itemsError);

    res.status(201).json(order[0]);
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;