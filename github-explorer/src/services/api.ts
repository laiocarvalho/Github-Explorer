import axios from 'axios';
import React from 'react';

const api = axios.create({
	baseURL: 'https://api.github.com',
});

export default api;
