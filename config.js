// Picks the Flask backend to talk to based on which static site is serving this page,
// so the same file can be ported from dev.kh1fmrando.com to kh1fmrando.com unchanged.
// Local testing (e.g. via Live Server on localhost/127.0.0.1) also hits the dev backend.
const FLASK_BASE_URL = (location.hostname.startsWith('dev.') || location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'https://dev-ngaither.pythonanywhere.com'
    : 'https://ngaither.pythonanywhere.com';
