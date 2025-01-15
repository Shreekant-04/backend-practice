/* eslint-disable */

import { initializeMap } from './map.js';
import { login, logout } from './login.js';

const mapElement = document.getElementById('map');
if (mapElement) {
  const locations = mapElement
    ? JSON.parse(mapElement.dataset.locations)
    : null;
  if (locations) initializeMap(locations);
}

const form = document.querySelector('.form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}

const logoutBtn = document.querySelector('.nav__el--logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // Your logout logic here
    logout();
  });
}
