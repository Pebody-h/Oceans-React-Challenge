## 🚀 Guía de Configuración Local

### 1. Preparación de la Base de Datos (Supabase)

El proyecto requiere una base de datos PostgreSQL. Siga estos pasos:

1. Regístrese en [Supabase.com](https://supabase.com/).
2. Cree un nuevo proyecto (ej. `oceans-challenge`).
3. Vaya al **SQL Editor** y ejecute el siguiente script para crear las tablas y relaciones:

```sql
-- Tabla de Productos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Órdenes
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relación Órdenes y Productos (Muchos a Muchos)
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1
);
```

4. Vaya a **Project Settings → API** y obtenga:

   * **Project URL**
   * **Anon Public Key**

---

### 2. 🔐 Variables de Entorno

Debe crear los archivos `.env` manualmente antes de iniciar el proyecto para asegurar la correcta conexión entre servicios.

#### 📁 Backend (`./backend/.env`)

```env
PORT=3000
SUPABASE_URL=tu_url_de_supabase_aqui
SUPABASE_KEY=tu_anon_key_de_supabase_aqui
```

#### 📁 Frontend (`./frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
```

---

### 3. 🐳 Ejecución con Docker (Recomendado)

Asegúrese de tener **Docker Desktop** activo y ejecute en la raíz del proyecto:

```bash
docker-compose up --build
```

Una vez iniciado, los servicios estarán disponibles en:

* **App React:** [http://localhost:5173](http://localhost:5173)
* **API Express:** [http://localhost:3000](http://localhost:3000)

---

### 4. ▶️ Ejecución Manual (NPM)

Si prefiere no usar Docker, asegúrese de tener **Node.js 20+** instalado en su sistema.

#### 🧠 Servidor Backend

```bash
cd backend
npm install
npm run dev
```

#### 🎨 Cliente Frontend

```bash
cd frontend
npm install
npm run dev
```

---
