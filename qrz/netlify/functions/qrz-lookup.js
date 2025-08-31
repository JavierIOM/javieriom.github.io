// Save this as: netlify/functions/qrz-lookup.js
const https = require('https');
const { parse } = require('querystring');

// QRZ.com credentials - Set these as environment variables in Netlify
const QRZ_USERNAME = process.env.QRZ_USERNAME;
const QRZ_PASSWORD = process.env.QRZ_PASSWORD;

let sessionKey = null;
let sessionExpiry = null;

// Helper function to make HTTPS requests
function httpsRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parse XML response
function parseXML(xmlString) {
  // Simple XML parser for QRZ responses
  const result = {};
  
  // Extract session key
  const sessionMatch = xmlString.match(/<Key>([^<]+)<\/Key>/);
  if (sessionMatch) {
    result.sessionKey = sessionMatch[1];
  }
  
  // Extract error
  const errorMatch = xmlString.match(/<Error>([^<]+)<\/Error>/);
  if (errorMatch) {
    result.error = errorMatch[1];
  }
  
  // Extract callsign data
  const callsignSection = xmlString.match(/<Callsign>(.*?)<\/Callsign>/s);
  if (callsignSection) {
    const callsignData = callsignSection[1];
    const fields = [
      'call', 'fname', 'name', 'addr1', 'addr2', 'state', 'zip', 'country',
      'grid', 'class', 'expdate', 'email', 'url', 'aliases', 'trustee', 'born'
    ];
    
    fields.forEach(field => {
      const match = callsignData.match(new RegExp(`<${field}>([^<]*)<\/${field}>`, 'i'));
      if (match) {
        result[field] = match[1];
      }
    });
  }
  
  return result;
}

// Authenticate with QRZ
async function authenticate() {
  if (!QRZ_USERNAME || !QRZ_PASSWORD) {
    throw new Error('QRZ credentials not configured');
  }
  
  const authUrl = `https://xmldata.qrz.com/xml/current/?username=${encodeURIComponent(QRZ_USERNAME)}&password=${encodeURIComponent(QRZ_PASSWORD)}`;
  
  const xmlResponse = await httpsRequest(authUrl);
  const parsed = parseXML(xmlResponse);
  
  if (parsed.error) {
    throw new Error(`QRZ Authentication Error: ${parsed.error}`);
  }
  
  if (!parsed.sessionKey) {
    throw new Error('Failed to get session key from QRZ');
  }
  
  sessionKey = parsed.sessionKey;
  sessionExpiry = Date.now() + (20 * 60 * 1000); // 20 minutes
  
  return sessionKey;
}

// Lookup callsign
async function lookupCallsign(callsign) {
  // Check if we need to authenticate
  if (!sessionKey || Date.now() > sessionExpiry) {
    await authenticate();
  }
  
  const lookupUrl = `https://xmldata.qrz.com/xml/current/?s=${encodeURIComponent(sessionKey)}&callsign=${encodeURIComponent(callsign)}`;
  
  const xmlResponse = await httpsRequest(lookupUrl);
  const parsed = parseXML(xmlResponse);
  
  if (parsed.error) {
    if (parsed.error.includes('Session Timeout') || parsed.error.includes('Invalid session key')) {
      // Re-authenticate and retry
      await authenticate();
      return lookupCallsign(callsign);
    }
    throw new Error(`QRZ Error: ${parsed.error}`);
  }
  
  // Remove session key from response
  delete parsed.sessionKey;
  delete parsed.error;
  
  return Object.keys(parsed).length > 0 ? parsed : null;
}

// Netlify Function handler
exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }
  
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }
  
  try {
    const { callsign } = event.queryStringParameters || {};
    
    if (!callsign || !callsign.trim()) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Callsign parameter is required' }),
      };
    }
    
    const cleanCallsign = callsign.trim().toUpperCase();
    
    // Basic callsign validation
    if (!/^[A-Z0-9\/]+$/.test(cleanCallsign)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Invalid callsign format' }),
      };
    }
    
    const result = await lookupCallsign(cleanCallsign);
    
    if (result) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          callsign: cleanCallsign,
          data: result,
          timestamp: new Date().toISOString(),
        }),
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          success: false,
          error: `No data found for callsign: ${cleanCallsign}`,
          callsign: cleanCallsign,
        }),
      };
    }
    
  } catch (error) {
    console.error('QRZ Lookup Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Internal server error',
      }),
    };
  }
};