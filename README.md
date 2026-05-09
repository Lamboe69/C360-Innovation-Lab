# C360 Innovation Lab

C360 Innovation Lab is a React + Vite web application for a global youth innovation platform.

## Prerequisites

Install the following before running the project:

- Node.js 16 or newer
- npm

## Getting Started

Clone the repository, then install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print a local URL in the terminal, usually:

```text
http://localhost:5173/
```

Open that URL in your browser.

## Available Scripts

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Routes

The app uses React Router with clean URLs. Example routes:

- `/`
- `/about`
- `/programs`
- `/clubs`
- `/resources`
- `/login`
- `/register`
- `/dashboard`

Legacy `.html` URLs redirect to the clean routes, for example `/about.html` redirects to `/about`.

## Notes

Generated folders such as `node_modules/` and `dist/` are ignored by Git. Run `npm install` after cloning to recreate dependencies locally.
