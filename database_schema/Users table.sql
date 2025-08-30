-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shops table
CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Variations table
CREATE TABLE product_variations (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    variation_name VARCHAR(50), -- e.g., "Size", "Color"
    variation_value VARCHAR(50) -- e.g., "M", "Red"
);

-- Inventory table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_variation_id INTEGER REFERENCES product_variations(id),
    stock INTEGER NOT NULL DEFAULT 0
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    shop_id INTEGER REFERENCES shops(id),
    total NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_variation_id INTEGER REFERENCES product_variations(id),
    quantity INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    shop_id INTEGER REFERENCES shops(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites table
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    shop_id INTEGER REFERENCES shops(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shop Analytics table
CREATE TABLE shop_analytics (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    sales INTEGER DEFAULT 0,
    revenue NUMERIC(10,2) DEFAULT 0.00
);