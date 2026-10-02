# Madhuri Sontakke — Frontend Developer Portfolio

A responsive, accessible, and modern personal portfolio website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed with an advanced CSS3 architecture featuring custom properties, dynamic theme switching (Dark/Light mode), CSS Grid, Flexbox, and strict WCAG 2.1/2.2 AA accessibility standards.

🔗 **Live Demo:** [https://task2-portfolio-resume.netlify.app](https://task2-portfolio-resume.netlify.app)

---

## 📌 Overview

This repository contains the personal portfolio and resume of **Madhuri Sontakke**, an undergraduate student in **BCA (Data Science) – 3rd Year** at **Rajasthan Aryan Arts College, Washim**, specializing in frontend web engineering and modern user interfaces.

### Core Focus Areas:
- **Semantic HTML5 Architecture:** Native landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with logical heading hierarchy (`h1` → `h4`).
- **Advanced CSS3 & Modern Layouts:** CSS Grid and Flexbox layouts, CSS custom properties token system, and mobile-first responsive media queries.
- **Dynamic Light/Dark Themes:** Accessible theme switcher supporting system preferences (`prefers-color-scheme`) and persistent local storage.
- **Accessibility (WCAG 2.1 & 2.2 AA):** Fully keyboard navigable (`Tab`, `Shift+Tab`, `Enter`, `Space`), skip to main content bypass link, high-contrast focus rings, screen reader announcements, and robust form validation with error summary alerts.
- **SEO & Metadata:** Search-engine friendly meta tags, OpenGraph social cards, Twitter cards, viewport configurations, and semantic markup.

---

## 🛠️ Technical Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Native CSS Custom Properties
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Auditing & Testing:** [axe-core](https://github.com/dequelabs/axe-core), [jsdom](https://github.com/jsdom/jsdom)

---

## 🚀 Key Sections & Features

1. **Top Navigation Bar:**
   - Wordmark with custom initials monogram.
   - Clean single-line navigation links with hover states.
   - Dynamic Dark/Light theme toggle with accessible button labeling.
   - Responsive mobile navigation drawer with keyboard `Escape` key trap handling.

2. **Hero / Introduction:**
   - Typographic hierarchy highlighting role, university, and core focus.
   - Primary action buttons with accessible touch targets ($\ge 44\text{px}$).
   - Direct links to GitHub and LinkedIn profiles.
   - Developer profile highlight card.

3. **Skills & Technical Tools:**
   - Structured auto-fit CSS Grid layout (`repeat(auto-fit, minmax(280px, 1fr))`).
   - Three core categories:
     - **Frontend Development:** HTML5, CSS3, JavaScript, Responsive Web Design, UI/UX.
     - **Programming Languages:** C, C++, Java, Python.
     - **Tools & Environments:** Git, GitHub, Visual Studio Code, Chrome DevTools.

4. **Professional Experience:**
   - **Frontend Developer Intern** at **SynapseIT Solution** (March 2026 – April 2026, Remote).
   - Details client-side interface development, component structuring, and UI responsiveness.

5. **Featured Project — QuickCart:**
   - Modern e-commerce platform showcasing end-to-end frontend craftsmanship.
   - Built with React.js, TypeScript, Tailwind CSS, Vite, React Router, Context API, TanStack Query, Framer Motion, Radix UI, Lucide Icons, and Vitest.
   - **Live Project:** [https://quickcartshopping.netlify.app](https://quickcartshopping.netlify.app)

6. **Education:**
   - **Bachelor of Computer Application – Data Science** (3rd Year Undergraduate).
   - **Institution:** Rajasthan Aryan Arts College, Washim.
   - Coursework covering Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP), Database Fundamentals, and Modern Web Technologies.

7. **Accessible Contact Form:**
   - Accessible form controls with explicit `<label for="...">` associations and input hints.
   - Client-side validation with live region announcements (`aria-live="polite"`).
   - WCAG 3.3.1 error summary alert (`role="alert"`) linking directly to invalid fields.
   - Simulated async submission with loading indicator and success confirmation screen.

---

## 📊 Quality & Accessibility Audits

| Audit Criterion | Result | Status |
| :--- | :--- | :--- |
| **Lighthouse Accessibility** | **100 / 100** | ✅ Zero violations (axe-core WCAG 2.1/2.2 AA) |
| **Lighthouse SEO** | **100 / 100** | ✅ Titles, descriptions, viewport, charset verified |
| **HTML Validation** | **0 Errors** | ✅ 0 duplicate IDs, 0 unlabeled controls, single H1 |
| **Color Contrast** | **WCAG AA Compliant** | ✅ Text contrast ratios $\ge 5.7:1$ to $19.2:1$ across both themes |
| **TypeScript / Build** | **Clean** | ✅ Strict typing (`tsc --noEmit`), fast bundle generation |

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher) or Bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Codingwithmadhuri/madhuri-sontakke-portfolio.git

# Navigate to project directory
cd madhuri-sontakke-portfolio

# Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server on http://localhost:3000
npm run dev

# Run TypeScript type-checking
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📬 Contact & Connect

- **Portfolio Demo:** [https://task2-portfolio-resume.netlify.app](https://task2-portfolio-resume.netlify.app)
- **GitHub:** [https://github.com/Codingwithmadhuri](https://github.com/Codingwithmadhuri)
- **LinkedIn:** [https://www.linkedin.com/in/madhuri-sontakke15](https://www.linkedin.com/in/madhuri-sontakke15)
- **Featured Project:** [https://quickcartshopping.netlify.app](https://quickcartshopping.netlify.app)

---

&copy; 2026 Madhuri Sontakke. All rights reserved.
