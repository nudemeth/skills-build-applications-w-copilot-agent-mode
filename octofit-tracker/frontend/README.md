# Octofit Tracker frontend

The presentation tier is a React 19 and Vite application. It uses `react-router-dom` for resource navigation and calls the API through the Codespaces forwarded port.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` before starting the frontend:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The API URL is built as `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When the variable is unset, the app safely uses the same-origin `/api` path instead of requesting an `undefined` hostname.

## Commands

- `npm run dev` starts Vite.
- `npm run build` creates a production build.
- `npm run lint` checks the frontend source.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
