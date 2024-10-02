
const axios = require('axios');
const BASE_URL = "http://localhost:8081/api/v1/users"; 
const axiosInstance = require('../utils/axiosInstance');
const logger = require('../utils/logger');
const FormData = require('form-data');
const fs = require('fs');

exports.getAllUsers = async (req, res, next) => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        res.json(response.data);
    } catch (error) {
        logger.error(`Error fetching users: ${error.message}`);
        next(error);
    }
};


exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        res.json(response.data);
    } catch (error) {
        logger.error(`Error fetching user by ID: ${id} - ${error.message}`);
        next(error);
    }
};


exports.createUser = async (req, res, next) => {
    try {
        const formData = new FormData();
        
    
        formData.append('username', req.body.username);
        formData.append('email', req.body.email);
        formData.append('password', req.body.password);

        const response = await axios.post(`${BASE_URL}`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        res.status(201).json(response.data);
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        next(error);
    }
};


exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const formData = new FormData();


        formData.append('username', req.body.username);
        formData.append('email', req.body.email);

        const response = await axios.put(`${BASE_URL}/${id}`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        res.json(response.data);
    } catch (error) {
        logger.error(`Error updating user by ID: ${id} - ${error.message}`);
        next(error);
    }
};


exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`Error deleting user by ID: ${id} - ${error.message}`);
        next(error);
    }
};

exports.getUserDetails = async (req, res) => {
    try {
      const { userId, cognitoId } = req.user; 
  
      const response = await axiosInstance.post('/process-user', {
        userId,
        cognitoId
      });
  
      return res.json(response.data);
    } catch (error) {
      return res.status(500).json({ message: 'Error processing user' });
    }
  };
