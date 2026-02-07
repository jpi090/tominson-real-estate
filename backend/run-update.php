<?php
// Database connection
$host = 'localhost';
$db = 'real_estate';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Connected to database successfully!\n\n";
    
    // Drop old admins table if exists
    $pdo->exec("DROP TABLE IF EXISTS admins");
    echo "✓ Dropped old admins table\n";
    
    // Check if role column exists
    $stmt = $pdo->query("SHOW COLUMNS FROM users LIKE 'role'");
    if ($stmt->rowCount() == 0) {
        // Add role column
        $pdo->exec("ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' AFTER password");
        echo "✓ Added role column to users table\n";
    } else {
        echo "✓ Role column already exists\n";
    }
    
    // Clear existing users
    $pdo->exec("TRUNCATE TABLE users");
    echo "✓ Cleared existing users\n";
    
    // Insert admin user (password: admin123)
    $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute(['Admin User', 'admin@realestate.com', $adminPassword, 'admin']);
    echo "✓ Created admin user: admin@realestate.com / admin123\n";
    
    // Insert regular user (password: user123)
    $userPassword = password_hash('user123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->execute(['John Doe', 'user@realestate.com', $userPassword, 'user']);
    echo "✓ Created user: user@realestate.com / user123\n";
    
    echo "\n✅ Database update completed successfully!\n";
    echo "\nYou can now login with:\n";
    echo "Admin: admin@realestate.com / admin123\n";
    echo "User: user@realestate.com / user123\n";
    
} catch(PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
