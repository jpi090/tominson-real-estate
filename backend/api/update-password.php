<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['user_id'] ?? null;
$currentPassword = $data['current_password'] ?? null;
$newPassword = $data['new_password'] ?? null;

if (!$userId || !$currentPassword || !$newPassword) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Verify current password
$stmt = $pdo->prepare("SELECT password FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($currentPassword, $user['password'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
    exit();
}

// Update password
$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");

try {
    $stmt->execute([$hashedPassword, $userId]);
    echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Password update failed']);
}
?>
