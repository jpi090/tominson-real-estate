<?php
require_once '../config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM properties ORDER BY id DESC");
        $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($properties);
        break;
    
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO properties (title, location, price, beds, baths, sqft, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['location'], $data['price'], $data['beds'], $data['baths'], $data['sqft'], $data['image']]);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;
    
    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM properties WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
}
?>
