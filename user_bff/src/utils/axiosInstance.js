const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.USER_SERVICE_URL, // e.g., 'http://localhost:8080/api/v1/users'
  timeout: 5000
});

module.exports = axiosInstance;
