const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const qs = require('querystring');

dotenv.config();

const baseUrl = 'http://localhost:3000/';

const app = express();

app.use(cors());

app.use(express.json());

app.set('port', (process.env.PORT || 8000));

app.get('goals', async (req, res, next) => {
  try {
    const url = `${baseUrl}goals`;
    const axiosConfig = {
      timeout: 5000
    };
    const result = await axios.get(url, axiosConfig);
    console.log(result.data);
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.get('goals/:id', async (req, res, next) => {
  try {
    const url = `${baseUrl}goals/${req.params.id}`;
    const axiosConfig = {
      timeout: 5000
    };
    const result = await axios.get(url, axiosConfig);
    console.log(result.data);
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.delete('goals/:id', async (req, res, next) => {
  try {
    const url = `${baseUrl}goals/${req.params.id}`;
    const axiosConfig = {
      timeout: 5000
    };
    const result = await axios.delete(url, axiosConfig);
    console.log(result.data);
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.put('goals/:id', async (req, res, next) => {
  try {
    const url = `${baseUrl}goals/${req.params.id}`;
    const params = {
      'title': 'An updated goal',
      'description': 'This describes the new goal',
      'complete': true
    };
    const axiosConfig = {
      timeout: 5000
    };
    const result = await axios.put(url, qs.stringify(params), axiosConfig);
    console.log(result.data);
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.post('goals', async (req, res, next) => {
  try {
    const url = `${baseUrl}goals`;
    const params = {
      'title': 'A new goal',
      'description': 'This describes the new goal',
      'complete': false
    };
    const axiosConfig = {
      timeout: 5000
    };
    const result = await axios.post(url, qs.stringify(params), axiosConfig);
    console.log(result.data);
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(app.get('port'), () => {
  console.log(`Server is now running on port ${app.get('port')}!`);
});
