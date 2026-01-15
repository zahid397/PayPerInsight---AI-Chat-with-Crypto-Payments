import axios from 'axios';

const api = axios.create({
  // .env.local থেকে URL নেবে, না পেলে ডিফল্ট
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/agent',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
