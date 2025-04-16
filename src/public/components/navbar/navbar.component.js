import { API } from '/index.script.js';

function buildNavbar(centerLinks = [], rightLinks = [{ href: '/login', text: 'Log In' }]) {
  const linkTag = `<link rel="stylesheet" href="/components/navbar/navbar.style.css">`;
  const logo = `<div class="logo">STE-LEDGER</div>`;

  const center = centerLinks
    .map(link => `<a href="${link.href}" class="nav-link">${link.text}</a>`)
    .join('');

  const right = rightLinks
    .map(link => `<a href="${link.href}" class="right nav-link">${link.text}</a>`)
    .join('');

  return `
    ${linkTag}
    <nav>
      ${logo}
      <div class="nav-links">${center}</div>
      <div class="nav-right">${right}</div>
    </nav>
  `;
}

const presets = {
  notLogged: buildNavbar(
    [
      { href: "/about-us", text: "About Us" },
      { href: "/about-us/services", text: "Services" },
      { href: "/about-us/safety", text: "Safety" },
      { href: "/about-us/contact", text: "Contact" }
    ],
    [
      { href: "/register", text: "Register" },
      { href: "/login", text: "Log In" }
    ]
  ),
  noPlan: buildNavbar(
    [
      { href: "/home", text: "Home" },
      { href: "/profile/plan", text: "Plan" },
      { href: "/store", text: "Store" }
    ],
    [{ href: "/profile", text: "Profile" }]
  ),
  basicPlan: buildNavbar(
    [
      { href: "/home", text: "Home" },
      { href: "/profile/plan", text: "Plan" },
      { href: "/inventory", text: "Inventory" },
      { href: "/selling", text: "Selling Point" },
      { href: "/store", text: "Store" }
    ],
    [{ href: "/profile", text: "Profile" }]
  )
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
        break;
      default:
        component.innerHTML = presets.noPlan;
    }
  }
}

customElements.define('main-bar', MainBar);
