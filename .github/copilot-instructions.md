# Sergey Zhukov Personal Website - AI Coding Guidelines

## Project Overview
This is a static single-page personal portfolio website built from the KARDS HTML template. It showcases Sergey Zhukov's professional background as a Cloud Infrastructure Architect and DevOps Evangelist.

## Architecture
- **Single-page design** with smooth-scrolling navigation between sections
- **Static HTML/CSS/JS** - no build process required
- **AJAX contact form** submits to PHP backend for email sending
- **Local development** via Docker/Jekyll for live reload

## Key Files & Structure
- `index.html` - Main portfolio page with sections: intro, about, resume, portfolio, services, contact
- `styles.html` - Template demo page with working contact form
- `css/main.css` - Primary styles using 12-column grid system (col-twelve, col-six, col-four, etc.)
- `js/main.js` - jQuery-based interactions, form validation, AJAX submission
- `inc/sendEmail.php` - PHP script for contact form email processing
- `images/portfolio/` - Portfolio project images with modal views

## Development Workflow
1. **Local development**: Run `docker-compose up` to start Jekyll server with live reload at http://blog.localtest.me:4000
2. **Direct editing**: Modify HTML/CSS/JS files directly - no compilation needed
3. **Testing contact form**: Use `styles.html` for form testing (index.html has no form, only contact info)

## Coding Patterns
- **Grid system**: Use classes like `col-six tab-full` for responsive layout
- **Section structure**: Each section has `id="section-name"` and `class="row section-intro"` header
- **Navigation**: Add new menu items to `<ul class="main-navigation">` with `smoothscroll` class
- **Portfolio items**: Add images to `images/portfolio/modals/` and update HTML with modal links
- **AJAX form**: Contact form uses jQuery validate plugin and submits to `inc/sendEmail.php`

## Adding Content
- **New sections**: Follow pattern of existing sections (about, resume, etc.) with proper grid classes
- **Portfolio updates**: Place images in `images/portfolio/`, add HTML with `popup-modal` class for lightbox
- **Resume items**: Use `<div class="timeline-block">` structure for timeline entries
- **Skills**: Update skill bars in about section with `data-percent` attributes

## Deployment
- Site deploys to GitHub Pages via `gh-pages` branch
- CNAME points to `sergeyz.tk`
- No CI/CD - manual push to trigger deployment

## External Dependencies
- **Fonts**: Lora (serif) and Poppins (sans-serif) from Google Fonts
- **Icons**: Font Awesome 4.x and custom Micons
- **jQuery**: v2.1.3 for DOM manipulation and AJAX
- **Plugins**: Modernizr, Pace.js (loading), Owl Carousel (unused), FitText

## Contact Form Notes
- Only functional in `styles.html` (demo page)
- Validates name (min 2 chars), email format, message (min 15 chars)
- Sends email to `s.zhukov86@gmail.com` via PHP mail()
- Success/error messages shown via `#message-success`/`#message-warning`</content>
<parameter name="filePath">.github/copilot-instructions.md