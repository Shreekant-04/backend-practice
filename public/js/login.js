/* eslint-disable */
// import axios from 'axios';

import { showAlert, hideAlert } from './alert.js';

export async function login(email, password) {
  try {
    const res = await axios.post('http://localhost:3000/api/v1/users/login', {
      email,
      password
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Login Success');
      window.setTimeout(() => {
        window.location.href = 'http://localhost:3000';
      }, 1600);
    } else {
      showAlert('error', res.data.message);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export async function logout() {
  try {
    const res = await axios.get('http://localhost:3000/api/v1/users/logout');
    if (res.data.status === 'success') {
      window.location.pathname === '/me'
        ? (window.location.href = '/login')
        : (window.location.href = window.location.pathname);
    }
  } catch (err) {
    console.error(err);
  }
}
