const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'http://your-production-domain.com'
  : 'http://localhost:5000';

export default API_BASE_URL;
