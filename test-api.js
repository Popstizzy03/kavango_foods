// Simple test script to verify API connection
const http = require('http');

function testEndpoint(path, callback) {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      callback(null, { status: res.statusCode, data: data });
    });
  });

  req.on('error', (err) => {
    callback(err);
  });

  req.setTimeout(5000, () => {
    req.abort();
    callback(new Error('Request timeout'));
  });

  req.end();
}

// Test health endpoint
testEndpoint('/api/health', (err, result) => {
  if (err) {
    console.error('Health check failed:', err.message);
  } else {
    console.log('Health check:', result.status, result.data);
  }

  // Test menu endpoint
  testEndpoint('/api/menu', (err, result) => {
    if (err) {
      console.error('Menu check failed:', err.message);
    } else {
      console.log('Menu check:', result.status, result.data.substring(0, 200) + '...');
    }
    process.exit(0);
  });
});