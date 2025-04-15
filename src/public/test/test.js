// test.js
import { API } from '../index.script.js';

const credentials = {
  username: 'maria',
  password: 'pedrito',
  profile: {
    displayName: 'frgle melito',
  },
};

const output = document.getElementById('output');

document.getElementById('registerButton').addEventListener('click', registerHandler);
document.getElementById('loginButton').addEventListener('click', loginHandler);
document.getElementById('logoutButton').addEventListener('click', logoutHandler);
document.getElementById('tokenInfoButton').addEventListener('click', getTokenInfoHandler);

async function registerHandler() {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await res.json();
  output.textContent = '📦 Register:\n' + JSON.stringify(data, null, 2);
}

async function loginHandler() {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  const data = await res.json();
  output.textContent = '📦 Login:\n' + JSON.stringify(data, null, 2);
}

async function logoutHandler() {
  const res = await fetch(`${API}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await res.json();
  output.textContent = '📦 Logout:\n' + JSON.stringify(data, null, 2);
}

async function getTokenInfoHandler() {
  const res = await fetch(`${API}/token-info`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();
  output.textContent = '📦 Token Info:\n' + JSON.stringify(data, null, 2);
}
