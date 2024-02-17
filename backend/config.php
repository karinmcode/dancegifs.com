<?php
// Database configuration
$servername = "localhost";
$username = "karin"; // Your MySQL username
$password = "D@nceg!fs.com"; // Your MySQL password
$dbname = "dancegifs";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
