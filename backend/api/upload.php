<?php
require_once '../config.php';

// Handle image upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image'])) {
        $file = $_FILES['image'];
        
        // Check for errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Upload error']);
            exit();
        }
        
        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($file['type'], $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid file type']);
            exit();
        }
        
        // Validate file size (max 5MB)
        if ($file['size'] > 5 * 1024 * 1024) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'File too large (max 5MB)']);
            exit();
        }
        
        // Create uploads directory if it doesn't exist
        $uploadDir = '../uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Generate unique filename
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '_' . time() . '.' . $extension;
        $filepath = $uploadDir . $filename;
        
        // Move uploaded file
        if (move_uploaded_file($file['tmp_name'], $filepath)) {
            $imageUrl = 'http://localhost/real-estate-backend/uploads/' . $filename;
            echo json_encode(['success' => true, 'url' => $imageUrl]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to save file']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
