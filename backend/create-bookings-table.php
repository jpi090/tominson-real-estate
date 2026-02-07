<?php
// Create bookings table
$host = 'localhost';
$db = 'real_estate';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Connected to database successfully!\n\n";
    
    // Create bookings table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            property_id INT NOT NULL,
            user_id INT NOT NULL,
            status ENUM('pending', 'confirmed', 'expired') DEFAULT 'pending',
            booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expiry_date DATETIME NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ");
    echo "✓ Created bookings table\n";
    
    // Add indexes
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_property_id ON bookings(property_id)");
    echo "✓ Added property_id index\n";
    
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_user_id ON bookings(user_id)");
    echo "✓ Added user_id index\n";
    
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_status ON bookings(status)");
    echo "✓ Added status index\n";
    
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_expiry_date ON bookings(expiry_date)");
    echo "✓ Added expiry_date index\n";
    
    echo "\n✅ Bookings table created successfully!\n";
    echo "\nYou can now:\n";
    echo "- Book properties as a user\n";
    echo "- View bookings in admin dashboard\n";
    echo "- Bookings expire automatically after 7 days\n";
    
} catch(PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
