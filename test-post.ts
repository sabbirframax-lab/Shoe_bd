import http from 'http';

const data = JSON.stringify({
  name: "Test User",
  phone: "1234567890",
  address: "Test Address",
  productName: "Test Product",
  productImage: "[]",
  quantity: 1,
  totalPrice: "10.00"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, body));
});

req.on('error', (e) => console.error('Error:', e));
req.write(data);
req.end();
