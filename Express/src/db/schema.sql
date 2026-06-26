-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    descripcion TEXT,
    categoria_id INTEGER,
    imagen TEXT,
    stock INTEGER DEFAULT 0,
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id)
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    categoria_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_categoria TEXT NOT NULL
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,                 
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
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



-- 1. Insertar categorías de prueba (si no existen)
INSERT INTO categorias (categoria_id, nombre_categoria) VALUES 
(1, 'Remeras'),
(2, 'Zapatillas'),
(3, 'Buzos')
ON CONFLICT(categoria_id) DO NOTHING;

-- 2. Insertar productos de prueba asociados a esas categorías (si no existen)
INSERT INTO productos (id, nombre, precio, descripcion, categoria_id, imagen, stock) VALUES
(1, 'Remera Oversize Negra', 15000.0, 'Remera 100% algodón con corte suelto.', 1, 'remera-negra.jpg', 25),
(2, 'Zapatillas Urbanas Blancas', 55000.0, 'Zapatillas cómodas ideales para el día a día.', 2, 'zapas-blancas.jpg', 14),
(3, 'Buzo Canguro Gris', 32000.0, 'Buzo de frisa invisible con capucha.', 3, 'buzo-gris.jpg', 10),
(4, 'Remera Estampada Streetwear', 18000.0, 'Remera con estampa en la espalda.', 1, 'remera-estampada.jpg', 30)
ON CONFLICT(id) DO NOTHING;