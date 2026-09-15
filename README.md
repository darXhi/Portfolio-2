# nathanya — portfolio

Personal portfolio website of **Nathanya Xavier**: illustrator, graphic designer and developer.

🔗 **Live:** [nathaxvry.my.id](https://nathaxvry.my.id)

A lightweight static site built with plain HTML, CSS and JavaScript (no framework, no build step), styled like a desktop window with popup pages, and deployed on Vercel.

---

## Pages

| Page | URL | Description |
|---|---|---|
| Home | [`/`](https://nathaxvry.my.id/) | Typing greeting, main menu, contact section and socials |
| About | [`/about`](https://nathaxvry.my.id/about) | Profile, education, languages, hard and soft skills |
| Project | [`/project`](https://nathaxvry.my.id/project) | Tools, development stack and project showcase |
| Resume | [`/resume`](https://nathaxvry.my.id/resume) | Resume viewer (PDF) with open and download buttons |
| Links | [`/links`](https://nathaxvry.my.id/links) | Social media links in a 3-column grid |

## Features

- **Window-style UI**: dark title bar with close (X) button; About, Project and Resume open as popups over a dimmed backdrop with scrollable content
- **Light / dark theme**: follows the system setting, can be toggled manually, and is remembered across pages
- **Clean URLs**: `/about` instead of `/about.html` (old `.html` links redirect automatically)
- **Responsive**: works on desktop, tablet and phone
- **Accessible**: keyboard focus styles, `aria` labels, Escape closes popups, reduced-motion support
- **SEO ready**: meta description, canonical URLs, Open Graph and Twitter cards, JSON-LD structured data, `sitemap.xml` and `robots.txt`

## Tech stack

- HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript
- [Font Awesome 6](https://fontawesome.com/) icons
- [Google Fonts](https://fonts.google.com/): Poppins and Inter
- Hosting: [Vercel](https://vercel.com/)

## Project structure

```
.
├── index.html            # Home page (with contact section)
├── about.html            # About popup
├── project.html          # Project popup
├── resume.html           # Resume popup (PDF viewer)
├── links.html            # Social media links
│
├── style.css             # Home styles + shared variables and theme
├── about.css             # Popup shell (overlay, window, scrolling) + About styles
├── project.css           # Project page styles (builds on about.css)
├── resume.css            # Resume page styles (builds on about.css)
├── links.css             # Links page styles (builds on style.css)
│
├── script.js             # Home: theme toggle, view routing, typing animation
├── about.js              # Popups: theme, backdrop click and Escape to close
├── links.js              # Links: theme toggle, Escape to close
│
├── images/               # Profile photo, project screenshots, placeholders
├── files/                # Resume PDF
│
├── sitemap.xml           # Page list for search engines
├── robots.txt            # Crawler rules + sitemap location
└── vercel.json           # Vercel config (clean URLs)
```

## Running locally

No build step is needed. Open `index.html` directly in a browser, or use VS Code Live Server.

Internal links point to the `.html` files (`about.html`), so navigation works locally. On Vercel, `cleanUrls` redirects them to the clean addresses (`/about`).

To preview with exactly the same behavior as production:

```bash
npx vercel dev
```

Then open <http://localhost:3000>.

## Deployment

The site deploys automatically on Vercel when changes are pushed to the `main` branch.

`vercel.json`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/cv", "destination": "/resume", "permanent": true },
    { "source": "/cv.html", "destination": "/resume", "permanent": true }
  ]
}
```

The redirects keep old `/cv` links working after the page was renamed to `/resume`.

## Updating content

| What | Where |
|---|---|
| Resume file | Replace the PDF in `files/` and update the path in `resume.html` |
| Project screenshots | Add images to `images/` and change the `<img src>` in `project.html` |
| Project descriptions | Replace the placeholder text in `project.html` and remove `filter: blur(3px)` from `.project__desc` in `project.css` |
| Social media links | Edit the `href` values in `links.html` (and the footer in `index.html`) |
| Adding a page | Create `page.html`, link to it as `/page`, and add a `<url>` entry to `sitemap.xml` |

After significant content changes, update `<lastmod>` in `sitemap.xml`.

## SEO and search engines

- Verified in **Google Search Console** (DNS TXT record on Vercel DNS)
- Sitemap submitted: `https://nathaxvry.my.id/sitemap.xml`
- **Bing Webmaster Tools** can import the site directly from Google Search Console

## Contact

📧 [nathanyaxavier@gmail.com](mailto:nathanyaxavier@gmail.com)

---

© 2026 Nathanya Xavier. All rights reserved.
