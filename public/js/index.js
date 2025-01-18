/* eslint-disable */

import { initializeMap } from './map.js';
import { login, logout } from './login.js';
import { updateUser } from './updateData.js';

const mapElement = document.getElementById('map');
if (mapElement) {
  const locations = mapElement
    ? JSON.parse(mapElement.dataset.locations)
    : null;
  if (locations) initializeMap(locations);
}

const form = document.querySelector('.form--login');
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

// update form
const updateForm = document.querySelector('.form-user-data');
if (updateForm) {
  updateForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    updateUser({ name, email }, 'user');
  });
}
const passwordForm = document.querySelector('.password--updateForm');
if (passwordForm) {
  passwordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.password--saveBtn').textContent = 'Updating...';
    const passwordCurrent = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;
    await updateUser(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.password--saveBtn').textContent = 'Save password';
    document.querySelector('#password-current').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#password-confirm').value = '';
  });
}
