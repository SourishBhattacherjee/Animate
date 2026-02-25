# Itz-Fizz

A small React application scaffolded with Vite. Built with React 19, Tailwind CSS and Anime.js for lightweight animations and fast local development.

## Features

- Fast development server powered by Vite with HMR
- Modern React (v19) and JSX support
- Tailwind CSS integration
- Small animation utilities using Anime.js
- ESLint configured for consistent code style

## Prerequisites

- Node.js 18 or newer
- npm (or yarn / pnpm)

## Quick Start

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser to view the app.

## Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build the production bundle
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint on the project

These scripts are defined in `package.json`.

## Project Structure

- `index.html` — App entry HTML
- `vite.config.js` — Vite configuration
- `src/main.jsx` — App bootstrap and React root
- `src/App.jsx` — Main application component
- `src/ItsFizzHeroAnime.jsx` — Animation / hero component
- `src/assets/` — Static assets (images, icons, etc.)
- `public/` — Static files served at root

## Linting

Run ESLint with:

```bash
npm run lint
```

Fix issues interactively or configure rules in `eslint.config.js`.

## Contributing

Feel free to open issues or PRs. Keep changes focused and add tests or screenshots where helpful.

## Deployment (GitHub Pages)

This repository is setup to deploy the production build to GitHub Pages using GitHub Actions. The Vite `base` has been set to `/Animate/` to match the repository name.

How it works:

- On push to `main`, the workflow builds the site (`npm run build`) and publishes the generated `dist/` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
- The site will be available at `https://<your-github-username>.github.io/Animate/` once the workflow completes and GitHub Pages is enabled for the repository.

If you prefer a local deploy step using `gh-pages`, you can add the `gh-pages` package and a `deploy` script to `package.json` instead.

## License

This repository does not include a license file. Add one if you intend to publish or share this project publicly.
