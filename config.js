// Picks the Flask backend to talk to based on which static site is serving this page,
// so the same file can be ported from dev.kh1fmrando.com to kh1fmrando.com unchanged.
const FLASK_BASE_URL = location.hostname.startsWith('dev.')
    ? 'https://dev-ngaither.pythonanywhere.com'
    : 'https://ngaither.pythonanywhere.com';
