<?php
// Set headers for JSON response
header('Content-Type: application/json');

try {
    // 1. Connect to SQLite (creates localstorage.db if missing)
    $db = new PDO('sqlite:localstorage.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 2. Create the table if it doesn't exist
    $db->exec("CREATE TABLE IF NOT EXISTS storage_items (
        key TEXT PRIMARY KEY, 
        value TEXT
    )");

    // 3. Receive the raw JSON data from the browser
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data) {
        // 4. Prepare the statement for efficient bulk insertion
        $stmt = $db->prepare("INSERT OR REPLACE INTO storage_items (key, value) VALUES (:key, :value)");

        foreach ($data as $key => $value) {
            // Only save actual data strings/objects, skip browser methods
            if (is_string($value) || is_array($value)) {
                $stmt->execute([
                    ':key' => $key,
                    ':value' => is_array($value) ? json_encode($value) : $value
                ]);
            }
        }
        echo json_encode(["status" => "success", "message" => "Backup complete!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "No data received"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
