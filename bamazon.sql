DELETE DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INT,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('Crewneck','Mens Clothing',39.95,10),
('Denim Short Sleeve','Mens Clothing',29.95,8),
('Khakis Pants','Mens Clothing',69.95,6),
('Linen Cotten Shirt','Mens Clothing',29.95,9),
('Vintage Chambray Shorts','Mens Clothing',49.95,13),
('Denim Jacket','Womens Clothing',39.95,10),
('Apron Dress','Womens Clothing',49.95,5),
('Crewneck Cardigan','Womens Clothing',59.95,13),
('Floral Dress','Womens Clothing',19.95,9),
('Tank Top','Womens Clothing',24.95,11);

