# Lab 9: The Final Warm-Up – Refactoring Brownfield Code
COMP 305 Fall 2025

## Overview
This project refactors and modernizes an **AI-generated brownfield Task Management Application** built using **Lit** and **Vite**.  
The objective is to transform low-quality, generated code into a **production-ready, professionally organized** project that includes:
- Clean code structure and linting
- Unit and end-to-end (E2E) testing
- Continuous Integration and Deployment (CI/CD) with GitHub Actions
- Documentation generation using JSDoc
- Deployment to a live hosting platform
- Proof of professional workflow habits (issues, commits, and ADRs)

This lab emphasizes **process over product**, demonstrating professional engineering habits, ownership, and risk reduction when dealing with imperfect codebases.

## Live Demo
- [Deployed Application](https://lab9-the-final-warmup.netlify.app/)
- [GitHub Repository](https://github.com/YOUR_USERNAME/lab9-the-final-warmup)

## Technologies Used
- **Lit** (Web Components Framework)
- **Vite** (Modern Frontend Build Tool)
- **JavaScript (ES Modules, Classes)**
- **JSDoc** (Documentation & Type Checking)
- **Vitest / Jest** (Unit Testing)
- **Playwright / Cypress** (E2E Testing)
- **ESLint + Prettier** (Linting & Formatting)
- **GitHub Actions** (CI/CD Automation)
- **Netlify / Cloudflare Pages** (Deployment)

---

## Architecture Overview


### Key Concepts
- **Lit Components:** Define UI elements as reusable, reactive custom elements.  
- **Controller:** Coordinates data flow and user interactions.  
- **Model:** Manages localStorage persistence and data state.  
- **View (via Lit):** Handles DOM rendering, accessibility, and reactivity.  

---

## Key Features

### 🧱 Codebase Enhancements
- Refactored AI-generated “slop” into clean, modular, and maintainable code
- Added consistent naming conventions and folder structure
- Enforced code style with ESLint and Prettier

### 🧪 Testing
- Implemented **unit tests** for component logic and data operations
- Created **E2E tests** to verify full application flow
- Automated testing pipeline via **GitHub Actions**

### 📚 Documentation
- Added **JSDoc** comments across all files for type safety
- Generated developer documentation automatically (`npm run docs`)
- Authored **Architecture Decision Records (ADRs)** to justify framework and CI/CD choices

### ⚙️ CI/CD Workflow
- Automated linting, testing, and build verification via GitHub Actions
- Automatic deployment to Netlify/Cloudflare on push to `main`
- Generated and published documentation as part of the pipeline

### 🎨 UI/UX
- Responsive, accessible task management interface
- Improved visual hierarchy and contrast
- Added keyboard navigation and ARIA roles

---

## ADR Summaries

| ADR | Topic | Summary |
|-----|--------|----------|
| ADR-001 | Framework Selection | Continued with Lit for simplicity and to explore modern Web Component development. |
| ADR-002 | CI/CD Tool | Adopted GitHub Actions for native integration and free automation. |
| ADR-003 | Hosting Provider | Chose Netlify for simplicity and automatic build previews. |

All ADRs are located in `/docs/adrs/`.

---

## GitHub Workflow & Process

### Issues and Commits
- Each task was tracked as a **GitHub Issue** (feature, fix, or refactor)
- Commits followed **Conventional Commit** style for clarity:
  - `feat:` new feature  
  - `fix:` bug fix  
  - `docs:` documentation update  
  - `test:` testing-related changes  
  - `chore:` CI/CD or config updates  

### Example Commits
- `refactor: clean up Lit components and organize repo`
- `test: add unit and E2E tests for task manager`
- `docs: generate JSDoc documentation`
- `ci: configure GitHub Actions pipeline`
- `feat: finalize project deployment to Netlify`

---

## License
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for
details.

## Author
Chloe Ogamba


## References

- [Lit Documentation](https://lit.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MDN – JSDoc Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
- [Cypress Testing Documentation](https://www.cypress.io/)
- [Playwright Testing Documentation](https://playwright.dev/)





