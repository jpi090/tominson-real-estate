-- Run this to update existing database
USE real_estate;

-- Drop old tables if they exist
DROP TABLE IF EXISTS admins;

-- Modify users table to add role column if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role ENUM('user', 'admin') DEFAULT 'user' AFTER password;

-- Clear existing users
TRUNCATE TABLE users;

-- Insert sample admin (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@realestate.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample user (password: user123)
INSERT INTO users (name, email, password, role) VALUES 
('John Doe', 'user@realestate.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');
