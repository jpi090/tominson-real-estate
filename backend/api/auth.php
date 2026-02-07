<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'] ?? '';

if ($action === 'register') {
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $role = $data['role'] ?? 'user';
    
    if (empty($name) || empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit();
    }
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email already exists']);
        exit();
    }
    
    // Hash password and insert user
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
    
    try {
        $stmt->execute([$name, $email, $hashedPassword, $role]);
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Registration failed']);
    }
    
} elseif ($action === 'login') {
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit();
    }
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($password, $user['password'])) {
        unset($user['password']);
        echo json_encode(['success' => true, 'user' => $user]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
    
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
?>
