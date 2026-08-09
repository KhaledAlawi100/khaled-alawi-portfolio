# Milestone Project 1 — Personal Portfolio

A professional personal portfolio website built to showcase my software engineering skills, projects, and technical experience.

## Sprint 1 — Project Foundation

### Completed

- Project structure
- HTML skeleton
- CSS design system
- CSS variables
- CSS reset
- Global styles
- Responsive container
- Navbar
- Footer
- Hero section structure
- Basic responsive layout

### Technologies

- HTML5
- CSS3
- CSS Variables
- Responsive Design

## Project Structure

```text
milestone-01-portfolio/
│
├── index.html
├── README.md
├── .gitignore
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── screenshots/
│
└── css/
    ├── variables.css
    ├── reset.css
    ├── global.css
    ├── components.css
    └── main.css
```

# Sprint 2 — Hero + About

### Completed

Built the main personal introduction of the portfolio.

The goal of this sprint was to make the portfolio immediately communicate:

- Who I am
- What I do
- My main technical focus
- My education
- Where to find my professional profiles

---

### Hero Section

Implemented the main hero section containing:

- Professional role
- Main professional statement
- Short introduction
- Primary call-to-action
- Secondary call-to-action
- GitHub link
- LinkedIn link

The hero section is designed to communicate the purpose of the portfolio immediately when a visitor opens the website.

---

### CTA Buttons

Implemented two primary actions:

```text
View Projects
      ↓
Projects Section

Contact Me
      ↓
Contact Section
```

The buttons use reusable component styles from:

```text
css/components.css
```

This keeps button styling consistent throughout the application.

---

### Social Links

Added professional social links for:

- GitHub
- LinkedIn

External links use:

```html
target="_blank" rel="noopener noreferrer"
```

SVG icons are used instead of emoji to provide a cleaner and more professional visual appearance.

---

### About Section

Implemented the About section with information about:

- Software Engineering background
- Backend development focus
- Java
- Spring Boot
- Modern frontend technologies
- Software engineering interests

The section is intentionally concise so recruiters can quickly understand the technical direction of the portfolio.

---

### Education

Added an education section containing:

```text
Bachelor's Degree in Software Engineering
King Saud University
2022 — 2026
```

This provides the basic academic background directly within the portfolio.

---

### CSS Architecture

The CSS architecture was refined to maintain a clear separation between page structure and reusable components.

```text
css/
│
├── variables.css
│   └── Design tokens
│
├── reset.css
│   └── Browser reset
│
├── global.css
│   └── Global styles
│
├── components.css
│   ├── Buttons
│   ├── Theme toggle
│   └── Social links
│
└── main.css
    ├── Header
    ├── Navbar
    ├── Hero
    ├── Sections
    ├── About
    ├── Education
    └── Footer
```

The project follows the rule:

```text
main.css
    ↓
Page structure and layout

components.css
    ↓
Reusable UI components
```

This keeps the stylesheet organized as the portfolio grows.

---

### Responsive Design

The Hero section and CTA buttons were adapted for smaller screens.

Desktop:

```text
[ View Projects ] [ Contact Me ]
```

Mobile:

```text
[ View Projects ]

[ Contact Me ]
```

The existing responsive navbar behavior was also maintained.

---

### Sprint Result

The portfolio can now immediately communicate:

```text
Khaled Alawi
      ↓
Software Engineer
      ↓
Backend + Spring Boot
      ↓
Modern Frontend
      ↓
Projects
      ↓
Contact
```

The portfolio is now ready for the next major section:

```text
Sprint 3 — Skills
```
