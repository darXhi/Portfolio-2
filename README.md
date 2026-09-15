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
| CV | [`/cv`](https://nathaxvry.my.id/cv) | CV viewer (PDF) with open and download buttons |
| Links | [`/links`](https://nathaxvry.my.id/links) | Social media links in a 3-column grid |

## Features

- **Window-style UI**: dark title bar with close (X) button; About, Project and CV open as popups over a dimmed backdrop with scrollable content
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
├── cv.html               # CV popup (PDF viewer)
├── links.html            # Social media links
│
├── style.css             # Home styles + shared variables and theme
├── about.css             # Popup shell (overlay, window, scrolling) + About styles
├── project.css           # Project page styles (builds on about.css)
├── cv.css                # CV page styles (builds on about.css)
├── links.css             # Links page styles (builds on style.css)
│
├── script.js             # Home: theme toggle, view routing, typing animation
├── about.js              # Popups: theme, backdrop click and Escape to close
├── links.js              # Links: theme toggle, Escape to close
│
├── images/               # Profile photo, project screenshots, placeholders
├── files/                # CV PDF
│
├── sitemap.xml           # Page list for search engines
├── robots.txt            # Crawler rules + sitemap location
└── vercel.json           # Vercel config (clean URLs)
```

## Running locally

Because the site uses clean URLs (`/about`), links only resolve correctly on a server that supports them, such as Vercel's dev server:

```bash
npx vercel dev
```

Then open <http://localhost:3000>.

> Opening `index.html` directly or using VS Code Live Server will load the home page, but menu links like `/about` will not work there.

## Deployment

The site deploys automatically on Vercel when changes are pushed to the `main` branch.

`vercel.json`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

## Updating content

| What | Where |
|---|---|
| CV file | Replace the PDF in `files/` and update the path in `cv.html` |
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
