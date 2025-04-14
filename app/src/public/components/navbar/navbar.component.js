class MainBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.loadProfile();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/components/navbar/navbar.style.css">
      <nav>
        <div class="logo">MiSitio</div>
        <div class="nav-links">
          <a href="/">Inicio</a>
          <a href="/explorar">Explorar</a>
          <a href="#" id="profile-link">Perfil</a>
        </div>
      </nav>
    `;
  }

  async loadProfile() {
    try {
      const res = await fetch('http://localhost:3000/me', { credentials: 'include' });
      if (!res.ok) throw new Error('No autenticado');
      const profile = await res.json();

      // Guardar en window (opcional pero útil)
      window.profile = profile;

      // Actualizar UI interna
      this.setProfile(profile);

      // Disparar evento para otros componentes
      document.dispatchEvent(new CustomEvent('profile-loaded', { detail: profile }));

    } catch (err) {
      console.warn('No se pudo cargar el perfil:', err.message);
    }
  }

  setProfile(profile) {
    const profileLink = this.shadowRoot.querySelector('#profile-link');
    profileLink.textContent = profile.displayName || 'Perfil';
  }
}

customElements.define('main-bar', MainBar);
