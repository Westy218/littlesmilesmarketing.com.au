# Little Smiles Marketing — littlesmilesmarketing.com.au

A multi-page marketing website for the Little Smiles dental marketing program.

## 📁 Project Structure

```
site/
├── index.html                 ← Landing page (home)
├── css/
│   ├── styles.css             ← Shared styles (all pages)
│   └── calculator.css         ← Calculator-specific styles
├── js/
│   └── components.js          ← Shared header, footer, nav & security config
├── pages/
│   └── calculator.html        ← Family Value Calculator page
├── api/
│   └── config.js              ← Server-side API config (Node.js example)
├── .env.example               ← Environment variables template
├── .gitignore                 ← Protects .env from git
└── README.md                  ← This file
```

## 🚀 Adding New Pages

### 1. Create the HTML file

Create a new file in `/pages/` (e.g., `pages/about.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>About | Little Smiles Marketing</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="../css/styles.css"/>
</head>
<body>
  <div id="site-header"></div>

  <!-- Your page content here -->
  <section class="section section--white">
    <div class="inner">
      <h2 class="heading">About Us</h2>
      <p class="body-text">Your content...</p>
    </div>
  </section>

  <div id="site-footer"></div>
  <script src="../js/components.js"></script>
</body>
</html>
```

### 2. Register the page in navigation

Open `js/components.js` and add an entry to `NAV_ITEMS`:

```javascript
const NAV_ITEMS = [
  { label: 'Home',       href: '/index.html',            id: 'home' },
  { label: 'Calculator', href: '/pages/calculator.html', id: 'calculator' },
  { label: 'About',      href: '/pages/about.html',      id: 'about' },  // ← new
];
```

That's it! The page will automatically appear in both the header navigation and footer links.

## 🔒 Security — Environment Variables

**API keys and secrets are NEVER exposed in client-side code.**

### How it works:

1. Client-side code (`components.js`) calls `/api/config` to get non-secret config
2. Form submissions POST to `/api/submit-form` on the server
3. The server reads API keys from `.env` (never sent to browser)
4. Email/CRM integrations happen server-side only

### Setup:

```bash
# 1. Copy the example env file
cp .env.example .env

# 2. Fill in your actual API keys
nano .env

# 3. NEVER commit .env to version control
# (.gitignore already handles this)
```

### For static hosting (Netlify, Vercel, Cloudflare Pages):

Use their built-in environment variables and serverless functions:

- **Netlify**: Create `netlify/functions/submit-form.js`
- **Vercel**: Create `api/submit-form.js`
- **Cloudflare Pages**: Use Workers

## 🎨 Design System

The site uses these CSS custom properties (defined in `css/styles.css`):

| Variable       | Value     | Usage                    |
|---------------|-----------|--------------------------|
| `--navy`      | `#1a3a4a` | Primary dark             |
| `--teal`      | `#3dbcb8` | Accent / CTA             |
| `--gold2`     | `#f0a070` | Warm accent              |
| `--gold3`     | `#f7c4a0` | Light warm               |
| `--cream`     | `#f7f3ec` | Background sections      |
| `--white`     | `#fff`    | Card backgrounds         |
| `--gray`      | `#5a6373` | Body text                |

**Fonts**: Cormorant Garamond (headings) + DM Sans (body)

## 📋 Internal Linking

All pages are internally linked via:
- **Header navigation** — auto-generated from `NAV_ITEMS`
- **Footer links** — auto-generated from `NAV_ITEMS`
- **CTA buttons** — point to `index.html#conv` (contact form)
- **Calculator link** — from landing page to `/pages/calculator.html`
