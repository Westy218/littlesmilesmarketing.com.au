/* ═══════════════════════════════════════════════
   Little Smiles Marketing — Shared Components
   Header & Footer injection + Navigation
   
   HOW TO ADD NEW PAGES:
   1. Add a new entry to the NAV_ITEMS array below
   2. Create your new HTML page in the root folder
   3. Include this script and styles.css in your page
   ═══════════════════════════════════════════════ */

// ─── NAVIGATION CONFIG ───
const NAV_ITEMS = [
  { label: 'Home',       href: 'index.html',            id: 'home' },
  { label: 'Calculator', href: 'calculator.html',       id: 'calculator' },
  // ── ADD NEW PAGES BELOW ──
  // { label: 'About',    href: 'about.html',            id: 'about' },
  // { label: 'Services', href: 'services.html',         id: 'services' },
  // { label: 'Blog',     href: 'blog.html',             id: 'blog' },
  // { label: 'Contact',  href: 'contact.html',          id: 'contact' },
];

const CTA_LINK = { label: 'Start the Conversation', href: 'index.html#conv' };

// ─── ENVIRONMENT / CONFIG ───
const SiteConfig = {
  _config: null,
  async loadConfig() {
    if (this._config) return this._config;
    try {
      const res = await fetch('config.json');
      if (res.ok) { this._config = await res.json(); }
      else { this._config = {}; }
    } catch (e) { this._config = {}; }
    return this._config;
  },
  async get(key) {
    const cfg = await this.loadConfig();
    return cfg[key] || null;
  },
  async getFormEndpoint() {
    return await this.get('FORM_ENDPOINT') || null;
  }
};

// ─── DETECT CURRENT PAGE ───
function getCurrentPageId() {
  const path = window.location.pathname;
  for (const item of NAV_ITEMS) {
    if (path.endsWith(item.href)) return item.id;
  }
  if (path === '/' || path.endsWith('/')) return 'home';
  return '';
}

// ─── BUILD HEADER ───
function buildHeader() {
  const currentPage = getCurrentPageId();
  const navLinksHtml = NAV_ITEMS.map(item => {
    const activeClass = item.id === currentPage ? ' class="active"' : '';
    return '<li><a href="' + item.href + '"' + activeClass + '>' + item.label + '</a></li>';
  }).join('\n        ');

  const headerHtml = '\
  <nav class="site-nav" id="site-nav">\
    <a href="index.html" class="nav-brand">Repositioned &middot; Little Smiles Program</a>\
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">\
      <span></span><span></span><span></span>\
    </button>\
    <ul class="nav-links" id="nav-links">\
      ' + navLinksHtml + '\
      <li><a href="' + CTA_LINK.href + '" class="nav-cta">' + CTA_LINK.label + '</a></li>\
    </ul>\
  </nav>';

  var headerEl = document.getElementById('site-header');
  if (headerEl) { headerEl.innerHTML = headerHtml; }
  else { document.body.insertAdjacentHTML('afterbegin', '<header id="site-header">' + headerHtml + '</header>'); }

  setTimeout(function() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function() { links.classList.toggle('open'); });
    }
  }, 0);
}

// ─── BUILD FOOTER ───
function buildFooter() {
  var footerLinksHtml = NAV_ITEMS.map(function(item) {
    return '<li><a href="' + item.href + '">' + item.label + '</a></li>';
  }).join('\n          ');

  var year = new Date().getFullYear();

  var footerHtml = '\
  <footer class="site-footer">\
    <div class="footer-inner">\
      <div class="footer-brand">\
        <p><strong>The Little Smiles Marketing Program</strong></p>\
        <p style="margin-top:7px">A boutique offering by <a href="https://repositioned.business" target="_blank">Repositioned.business</a></p>\
      </div>\
      <div>\
        <p style="font-weight:500;color:var(--gold3);margin-bottom:10px;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase">Pages</p>\
        <ul class="footer-links">\
          ' + footerLinksHtml + '\
        </ul>\
      </div>\
      <div>\
        <p style="font-weight:500;color:var(--gold3);margin-bottom:10px;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase">Contact</p>\
        <p><a href="mailto:hello@repositioned.business">hello@repositioned.business</a></p>\
        <p style="margin-top:6px"><a href="https://repositioned.business" target="_blank">repositioned.business</a></p>\
      </div>\
    </div>\
    <p class="footer-copy">&copy; ' + year + ' Repositioned. All rights reserved. | <a href="https://littlesmilesmarketing.com.au">littlesmilesmarketing.com.au</a></p>\
  </footer>';

  var footerEl = document.getElementById('site-footer');
  if (footerEl) { footerEl.innerHTML = footerHtml; }
  else { document.body.insertAdjacentHTML('beforeend', '<div id="site-footer">' + footerHtml + '</div>'); }
}

// ─── SECURE FORM SUBMISSION ───
async function submitContactForm(formData) {
  var endpoint = await SiteConfig.getFormEndpoint();
  if (!endpoint) {
    console.warn('Form endpoint not configured. Set FORM_ENDPOINT in config.json');
    return { success: false, message: 'Form submission endpoint not configured.' };
  }
  try {
    var response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) { return { success: true, message: 'Form submitted successfully.' }; }
    else {
      var err = await response.json().catch(function() { return {}; });
      return { success: false, message: err.message || 'Submission failed.' };
    }
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', function() {
  buildHeader();
  buildFooter();
});
