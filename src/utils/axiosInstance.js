// // src/utils/axiosInstance.js

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://jobhunt-backend1.onrender.com/', // ✅ change if needed
// });
// //new changes
// // ✅ STEP 2: Token add karo har request ke sath
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token'); // 👈 ye token login ke baad save hua hoga
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;

// src/utils/axiosInstance.js
import axios from 'axios';

// Create a single, configured Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Important for sending cookies/tokens
});

// Use an interceptor to automatically add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
