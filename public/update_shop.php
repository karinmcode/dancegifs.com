<?php
// Include configuration file
include 'config.php';

// Check if the new value is set
if(isset($_POST['new_value'])) {
    // Get the new value
    $shopLink = $_POST['shopLink'];
    $stepName = $_POST['stepName'];
    // Update the value in the database
    $sql = "UPDATE steps SET shop = '$shopLink' WHERE step = '$stepName'"; 
    if (mysqli_query($conn, $sql)) {
        echo "Value updated successfully";
    } else {
        echo "Error updating value: " . mysqli_error($conn);
    }
}
?>
