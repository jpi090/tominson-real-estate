<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['user_id'] ?? null;
$name = $data['name'] ?? null;
$email = $data['email'] ?? null;

if (!$userId || !$name || !$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Check if email is already taken by another user
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
$stmt->execute([$email, $userId]);
if ($stmt->fetch()) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email already in use']);
    exit();
}

// Update user profile
$stmt = $pdo->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");

try {
    $stmt->execute([$name, $email, $userId]);
    echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Update failed']);
}
?>
