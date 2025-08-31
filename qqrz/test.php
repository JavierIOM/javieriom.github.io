<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// QRZ.com XML API Configuration
$QRZ_USERNAME = '2d0pey';  // Change this to your QRZ username
$QRZ_PASSWORD = '$PNhvL51TeMMA6jhY2';  // Change this to your QRZ password
$QRZ_BASE_URL = 'https://xmldata.qrz.com/xml/current/';

class QRZClient {
    private $session_key = null;
    private $username;
    private $password;
    private $base_url;
    
    public function __construct($username, $password, $base_url) {
        $this->username = $username;
        $this->password = $password;
        $this->base_url = $base_url;
    }
    
    private function authenticate() {
        $url = $this->base_url . "?username=" . urlencode($this->username) . 
               "&password=" . urlencode($this->password);
        
        $xml = $this->fetchXML($url);
        if (!$xml) {
            throw new Exception('Failed to connect to QRZ.com');
        }
        
        if (isset($xml->Session->Key)) {
            $this->session_key = (string)$xml->Session->Key;
            return true;
        }
        
        $error = isset($xml->Session->Error) ? (string)$xml->Session->Error : 'Authentication failed';
        throw new Exception('QRZ Authentication Error: ' . $error);
    }
    
    public function lookupCallsign($callsign) {
        // Authenticate if we don't have a session key
        if (!$this->session_key) {
            $this->authenticate();
        }
        
        $url = $this->base_url . "?s=" . urlencode($this->session_key) . 
               "&callsign=" . urlencode($callsign);
        
        $xml = $this->fetchXML($url);
        if (!$xml) {
            throw new Exception('Failed to lookup callsign');
        }
        
        // Check for session expiry
        if (isset($xml->Session->Error)) {
            $error = (string)$xml->Session->Error;
            if (strpos($error, 'Session Timeout') !== false || strpos($error, 'Invalid session key') !== false) {
                // Re-authenticate and retry
                $this->session_key = null;
                $this->authenticate();
                return $this->lookupCallsign($callsign); // Retry once
            }
            throw new Exception('QRZ Error: ' . $error);
        }
        
        // Parse callsign data
        if (isset($xml->Callsign)) {
            $data = array();
            foreach ($xml->Callsign as $field => $value) {
                $data[$field] = (string)$value;
            }
            return $data;
        }
        
        return null; // No data found
    }
    
    private function fetchXML($url) {
        $context = stream_context_create([
            'http' => [
                'timeout' => 30,
                'user_agent' => 'Ham Radio Callsign Lookup Tool'
            ]
        ]);
        
        $xmlString = file_get_contents($url, false, $context);
        if ($xmlString === false) {
            return null;
        }
        
        return simplexml_load_string($xmlString);
    }
}

// Main API handler
try {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        throw new Exception('Only GET requests are allowed');
    }
    
    if (!isset($_GET['callsign']) || empty(trim($_GET['callsign']))) {
        throw new Exception('Callsign parameter is required');
    }
    
    $callsign = strtoupper(trim($_GET['callsign']));
    
    // Validate callsign format (basic validation)
    if (!preg_match('/^[A-Z0-9\/]+$/', $callsign)) {
        throw new Exception('Invalid callsign format');
    }
    
    $qrz = new QRZClient($QRZ_USERNAME, $QRZ_PASSWORD, $QRZ_BASE_URL);
    $result = $qrz->lookupCallsign($callsign);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'callsign' => $callsign,
            'data' => $result,
            'timestamp' => date('c')
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'No data found for callsign: ' . $callsign,
            'callsign' => $callsign
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>