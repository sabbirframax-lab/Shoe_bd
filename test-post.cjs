const https = require('https');
const querystring = require('querystring');

const postData = querystring.stringify({
  name: 'Test',
  phone: '123',
  address: '123',
  productName: 'Test',
  productImage: 'Test',
  quantity: '1',
  totalPrice: '10'
});

const options = {
  hostname: 'script.google.com',
  path: '/macros/s/AKfycbwTzJiDZDBwmBfBAPl9f55tg5rZ_QK1B_u5S3pVt83j4JkHq5dyu5_DC5tcSksNvxOg/exec',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    // Follow redirect
    const redirectUrl = new URL(res.headers.location);
    const redirectOptions = {
      hostname: redirectUrl.hostname,
      path: redirectUrl.pathname + redirectUrl.search,
      method: 'GET'
    };
    const redirectReq = https.request(redirectOptions, (redirectRes) => {
      let data = '';
      redirectRes.on('data', (chunk) => data += chunk);
      redirectRes.on('end', () => console.log('Redirect Response:', data));
    });
    redirectReq.end();
  } else {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log('Response:', data));
  }
});

req.on('error', (e) => console.error(e));
req.write(postData);
req.end();
