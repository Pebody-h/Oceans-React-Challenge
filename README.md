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

## 🛠️ Stack Tecnológico

### 💻 Frontend (Cliente)
* **React 19:** Última versión estable de la librería para interfaces de usuario.
* **TypeScript:** Tipado estricto para un código más robusto y mantenible.
* **Vite 7:** Herramienta de construcción (bundler) de última generación para un desarrollo ultra rápido.
* **Tailwind CSS v4:** Framework de utilidades CSS para un diseño moderno y responsivo.
* **React Hook Form:** Gestión eficiente de formularios y validaciones.
* **Axios:** Cliente HTTP para la comunicación con la API.
* **Lucide React:** Set de iconos vectoriales de alta calidad.
* **React Router DOM v7:** Manejo de navegación y rutas de la aplicación.

### ⚙️ Backend (API)
* **Node.js & Express:** Entorno de ejecución y framework para la construcción de la API REST.
* **TypeScript:** Implementado en el servidor para garantizar la integridad de los datos.
* **Supabase SDK:** Cliente oficial para la integración con servicios de base de datos.
* **CORS:** Middleware para la gestión de seguridad y acceso entre dominios.
* **Dotenv:** Manejo seguro de variables de entorno.

### 🗄️ Base de Datos
* **PostgreSQL:** Motor de base de datos relacional potente y escalable.
* **Supabase:** Plataforma Backend-as-a-Service para el hosting de la base de datos en la nube.

### 🐳 Infraestructura y Despliegue
* **Docker & Docker Compose:** Contenerización de servicios para asegurar un entorno de ejecución idéntico (Node 20-alpine).
* **Vercel:** Despliegue automatizado (CI/CD) para el Frontend y Serverless Functions para el Backend.
