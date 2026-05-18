<?php
/**
 * Project: [NEW PROJECT NAME]
 * File:    read_db.php
 * Desc:    Retrieves all data from SQLite and sends it as JSON to the browser for Restoration.
 **/

header('Content-Type: application/json');

try {
    // 1. Connect to SQLite database (creates file if missing)
    $db = new PDO('sqlite:localstorage.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 2. Check if the 'storage_items' table exists
    // This prevents errors if Restore is clicked before the first Save
    $tableCheck = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='storage_items'");

    if ($tableCheck->fetch()) {
        // 3. Table exists, fetch all key-value pairs
        $stmt = $db->query("SELECT key, value FROM storage_items");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $data = [];
        foreach ($rows as $row) {
            // Attempt to decode JSON strings back into arrays/objects
            // If it's just a simple string, it stays a string
            $decoded = json_decode($row['value'], true);
            $data[$row['key']] = (json_last_error() == JSON_ERROR_NONE) ? $decoded : $row['value'];
        }
        
        // Return the clean data object
        echo json_encode($data);
    } else {
        // 4. Return an empty object if no data has ever been saved
        echo json_encode(new stdClass());
    }

} catch (PDOException $e) {
    // Handle database errors gracefully
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database Error: " . $e->getMessage()
    ]);
}
?>
