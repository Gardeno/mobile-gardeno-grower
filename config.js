let apiUrl;

if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://gardeno.global';
} else {
  //apiUrl = 'https://gardeno.ngrok.io';
  apiUrl = 'http://localhost:8001';
}

module.exports = {
  API_URL: `${apiUrl}/api/v1`,
  WEBSOCKET_URL: `${apiUrl.replace('https://', 'wss://').replace('http://', 'ws://')}/ws/v1`,
  WEBSOCKET_POLL_TIMEOUT_MS: 5000,
  KEYCHAIN_USERNAME: 'gardeno',
};