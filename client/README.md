# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

##PERSONAL##

# Chat-project

Chat-project adalah aplikasi percobaan berbasis chat yang dikembangkan menggunakan **Express + Socket.IO** untuk backend dan **React + Vite** untuk frontend. Proyek ini dirancang sebagai laboratorium kreatif untuk mempelajari workflow Git, TypeScript, dan pengembangan aplikasi chat real-time.

## Fitur Utama

- Backend menggunakan **Express** dengan integrasi **Socket.IO** untuk komunikasi real-time.
- Frontend dibangun dengan **React + Vite** untuk performa cepat dan struktur modular.
- Ditulis dengan **TypeScript** untuk menjaga konsistensi tipe dan meminimalisir bug.
- Struktur project terorganisir, memisahkan backend dan frontend.
- Branch `main` digunakan untuk versi stabil, sedangkan `dev` untuk eksperimen fitur baru.

## Struktur Project

chat-app/
├─ server.ts              # Backend utama dengan Express + Socket.IO
├─ package.json           # Dependensi backend (Node.js/Express)
├─ tsconfig.json          # Konfigurasi TypeScript untuk backend
├─ client/                # Frontend React + Vite
│  ├─ index.html          # Entry point HTML untuk React
│  ├─ package.json        # Dependensi frontend (React, Vite, dll)
│  ├─ tsconfig.json       # Konfigurasi TypeScript untuk frontend
│  └─ src/                # Source code React
│     ├─ main.tsx         # Entry point React
│     ├─ App.tsx          # Komponen utama aplikasi
│     ├─ App.css          # Style khusus App
│     ├─ index.css        # Style global
│     └─ components/      # Folder untuk komponen kecil (Button, ChatBox, dll)
├─ .gitignore             # File/folder yang diabaikan Git
├─ README.md              # Dokumentasi project
└─ LICENSE                # Lisensi project
