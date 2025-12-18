🌊 Oceans React Challenge - Full Stack Order Manager
Este proyecto es una aplicación robusta para la gestión de órdenes en un restaurante, permitiendo el control de productos, creación de pedidos en tiempo real y visualización de métricas en un dashboard profesional.

🚀 Guía de Inicio Rápido (Local)
1. Configuración de la Base de Datos (Supabase)
Para que el proyecto funcione, necesitas una instancia de PostgreSQL. Sigue estos pasos:

Crea una cuenta gratuita en Supabase.

Crea un nuevo proyecto llamado oceans-challenge.

Ve al SQL Editor y ejecuta el siguiente script para crear las tablas:

SQL

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1
);
Ve a Project Settings > API y copia la Project URL y la anon public key.

2. Variables de Entorno
Crea los archivos .env siguiendo estas rutas:

En ./backend/.env:

Fragmento de código

PORT=3000
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_anon_key_de_supabase
En ./frontend/.env:

Fragmento de código

VITE_API_URL=http://localhost:3000
3. Ejecución con Docker (Recomendado)
Si tienes Docker instalado, solo necesitas ejecutar un comando en la raíz del proyecto:

Bash

docker-compose up --build
Frontend: http://localhost:5173

Backend: http://localhost:3000

4. Ejecución con NPM (Desarrollo Manual)
Si prefieres correr los servicios por separado:

Levantar el Backend:

Bash

cd backend
npm install
npm run dev
Levantar el Frontend:

Bash

cd frontend
npm install
npm run dev
🏛️ Arquitectura y Decisiones Técnicas
El proyecto sigue una Arquitectura de Capas (Layered Architecture) para separar las responsabilidades:

Backend: Desarrollado con Node.js + Express + TypeScript. Se utiliza el patrón Controller-Service para desacoplar la lógica de las rutas del acceso a datos.

Frontend: Construido con React 19 y Vite 7. Se implementó Tailwind CSS v4 para un diseño moderno y React Hook Form para una gestión eficiente de formularios sin renders innecesarios.

Contenedores: Se utiliza Docker con imágenes de Node 20-alpine para garantizar que el entorno de ejecución sea idéntico en cualquier máquina, solucionando problemas de versiones de Node.

🛠️ Stack Tecnológico
Frontend: React, TypeScript, Vite, Tailwind CSS, Lucide Icons, Axios.

Backend: Express, TypeScript, Supabase SDK.

Infraestructura: Docker, Docker Compose, Vercel (Deployment).