const API = 'https://steledger.onrender.com/api/auth';

const presets = {
  notLogged: `
      <link rel="stylesheet" href="/components/navbar/navbar.style.css">
      <nav>
        <div class="logo">STE-LEDGER</div>
        
        <div class="nav-links">
          <a href="/about-us" class="nav-link">About Us</a>
          <a href="/about-us/services" class="nav-link">Services</a>
          <a href="/about-us/safety" class="nav-link">Safety</a>
          <a href="/about-us/contact" class="nav-link">Contact</a>
        </div>

        <a href="/login" class="right nav-link">Log In</a>
      </nav>
    `,
    noPlan: `
      <link rel="stylesheet" href="/components/navbar/navbar.style.css">
      <nav>
        <div class="logo">STE-LEDGER</div>
        
        <div class="nav-links">
          <a href="/home" class="nav-link">Home</a>
          <a href="/profile/plan" class="nav-link">Plan</a>
          <a href="/store" class="nav-link">Store</a>
        </div>

        <a href="/profile" class="right nav-link">Profile</a>
      </nav>
    `,
    basicPlan: `
      <link rel="stylesheet" href="/components/navbar/navbar.style.css">
      <nav>
        <div class="logo">STE-LEDGER</div>
        
        <div class="nav-links">
          <a href="/home" class="nav-link">Home</a>
          <a href="/profile/plan" class="nav-link">Plan</a>
          <a href="/inventory" class="nav-link">Inventory</a>
          <a href="/selling" class="nav-link">Selling Point</a>
          <a href="/store" class="nav-link">Store</a>
        </div>

        <a href="/profile" class="right nav-link">Profile</a>
      </nav>
    `,

};

class MainBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.loadProfile();
  }

  render() {
    this.shadowRoot.innerHTML = presets.notLogged;
  }

  async loadProfile() {
    try {
      const res = await fetch(`${API}/profile`, { credentials: 'include' });
      if (!res.ok) throw new Error('No autenticado');
      const profile = await res.json();

      // Guardar en window (opcional pero útil)
      window.profile = profile;

      // Actualizar UI interna
      this.updateView(profile);

      // Disparar evento para otros componentes
      document.dispatchEvent(new CustomEvent('profile-loaded', { detail: profile }));

    } catch (err) {
      console.warn('No se pudo cargar el perfil:', err.message);
    }
  }

  updateView(profile) {
    const component = this.shadowRoot;
    const plan =  profile.plan;
    if (!plan) {
      return;
    }
    switch (plan) {
      case "basic":
        component.innerHTML = presets.basicPlan;
      default:
        component.innerHTML = presets.noPlan;
    }
  }
}

customElements.define('main-bar', MainBar);
