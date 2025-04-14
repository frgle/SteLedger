const API = 'https://steledger.onrender.com/api/auth';

const credentials = {
  username: 'maria',
  password: 'pedrito',
  profile: {
    displayName: 'frgle melito',
  },
};

const output = document.getElementById('output');

async function register() {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });

  const data = await res.json();
  output.textContent = '📦 Register:\n' + JSON.stringify(data, null, 2);
}

async function login() {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });

  const data = await res.json();
  output.textContent = '📦 Login:\n' + JSON.stringify(data, null, 2);
}

async function logout() {
  const res = await fetch(`${API}/logout`, {
    method: 'POST',
    credentials: 'include'
  });

  const data = await res.json();
  output.textContent = '📦 Logout:\n' + JSON.stringify(data, null, 2);
}

async function getTokenInfo() {
  const res = await fetch(`${API}/token-info`, {
    method: 'GET',
    credentials: 'include'
  });

  const data = await res.json();
  output.textContent = '📦 Token Info:\n' + JSON.stringify(data, null, 2);
}
