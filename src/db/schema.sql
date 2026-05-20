-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    descripcion TEXT,
    categoria_id TEXT,
    destacado INTEGER DEFAULT 0,
    imagen_url TEXT,
    stock INTEGER DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT PRIMARY KEY,
    contraseña TEXT NOT NULL
);

-- Tabla de pedidos 
CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    email_usuario TEXT NOT NULL,
    fecha TEXT NOT NULL,
    total REAL NOT NULL,
    FOREIGN KEY (email_usuario) REFERENCES usuarios(email)
);

-- Tabla de items de pedido
CREATE TABLE IF NOT EXISTS items_pedido (
    id_item INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario REAL NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id)
);
