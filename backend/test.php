<?php
// Simple test file to check if PHP is working
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'success',
    'message' => 'PHP backend is working!',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
