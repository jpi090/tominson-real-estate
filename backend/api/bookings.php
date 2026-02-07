<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];

// Auto-expire bookings older than 7 days
$pdo->exec("UPDATE bookings SET status = 'expired' WHERE expiry_date < NOW() AND status = 'pending'");

switch($method) {
    case 'GET':
        // Get all bookings or user-specific bookings
        $userId = $_GET['user_id'] ?? null;
        
        if ($userId) {
            // Get bookings for specific user
            $stmt = $pdo->prepare("
                SELECT b.*, p.title, p.location, p.price, p.image, u.name as user_name
                FROM bookings b
                JOIN properties p ON b.property_id = p.id
                JOIN users u ON b.user_id = u.id
                WHERE b.user_id = ?
                ORDER BY b.created_at DESC
            ");
            $stmt->execute([$userId]);
        } else {
            // Get all bookings (for admin)
            $stmt = $pdo->query("
                SELECT b.*, p.title, p.location, p.price, p.image, u.name as user_name, u.email as user_email
                FROM bookings b
                JOIN properties p ON b.property_id = p.id
                JOIN users u ON b.user_id = u.id
                ORDER BY b.created_at DESC
            ");
        }
        
        $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($bookings);
        break;
    
    case 'POST':
        // Create new booking
        $data = json_decode(file_get_contents('php://input'), true);
        
        $propertyId = $data['property_id'] ?? null;
        $userId = $data['user_id'] ?? null;
        
        if (!$propertyId || !$userId) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit();
        }
        
        // Check if property is already booked
        $stmt = $pdo->prepare("
            SELECT COUNT(*) as count 
            FROM bookings 
            WHERE property_id = ? AND status = 'pending'
        ");
        $stmt->execute([$propertyId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result['count'] > 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Property is already booked']);
            exit();
        }
        
        // Create booking with 7-day expiry
        $expiryDate = date('Y-m-d H:i:s', strtotime('+7 days'));
        
        $stmt = $pdo->prepare("
            INSERT INTO bookings (property_id, user_id, expiry_date) 
            VALUES (?, ?, ?)
        ");
        
        try {
            $stmt->execute([$propertyId, $userId, $expiryDate]);
            echo json_encode([
                'success' => true, 
                'message' => 'Property booked successfully',
                'booking_id' => $pdo->lastInsertId(),
                'expiry_date' => $expiryDate
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Booking failed']);
        }
        break;
    
    case 'DELETE':
        // Cancel booking
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Booking ID required']);
            exit();
        }
        
        $stmt = $pdo->prepare("DELETE FROM bookings WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Booking cancelled']);
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>
