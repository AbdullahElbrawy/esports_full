# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

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

export default tseslint.config([
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
//structure

vite-admin/
├─ .editorconfig
├─ .env.example
├─ .eslintignore
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierignore
├─ .prettierrc
├─ index.html
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.ts
├─ tsconfig.json
├─ tsconfig.paths.json
├─ vite.config.ts
└─ src/
   ├─ app/
   │  ├─ App.tsx
   │  ├─ main.tsx
   │  ├─ providers/
   │  │  ├─ QueryProvider.tsx        // React Query client
   │  │  ├─ StoreProvider.tsx        // Redux store
   │  │  └─ ThemeProvider.tsx        // light/dark, CSS vars
   │  └─ router/
   │     ├─ routes.tsx               // createBrowserRouter (lazy, guards)
   │     ├─ paths.ts                 // central route helpers
   │     ├─ guards/
   │     │  ├─ ProtectedRoute.tsx
   │     │  └─ RoleGuard.tsx
   │     └─ layouts/
   │        ├─ RootLayout.tsx
   │        ├─ AuthLayout.tsx
   │        └─ DashboardLayout.tsx   // Sidebar + Navbar + <Outlet/>
   ├─ api/                            // shared, typed HTTP & hooks
   │  ├─ auth/
   │  │  ├─ endpoints.ts             // login(), me(), refresh()
   │  │  ├─ schemas.ts               // zod in/out
   │  │  └─ index.ts
   │  ├─ users/
   │  │  ├─ endpoints.ts             // listUsers(), getUser()
   │  │  ├─ queries.ts               // useUsersQuery(), keys
   │  │  └─ index.ts
   │  ├─ orders/
   │  │  ├─ endpoints.ts
   │  │  ├─ queries.ts
   │  │  └─ index.ts
   │  └─ index.ts                     // export * as UsersAPI, AuthAPI, …
   ├─ assets/
   │  ├─ fonts/
   │  └─ images/
   ├─ components/
   │  ├─ common/                      // Navbar, Sidebar, PageHeader…
   │  └─ ui/                          // Button, Input, Table, Dialog…
   │     └─ Table/
   │        ├─ DataTable.tsx
   │        └─ types.ts
   ├─ features/
   │  ├─ auth/
   │  │  ├─ pages/LoginPage.tsx
   │  │  ├─ components/LoginForm.tsx
   │  │  ├─ hooks/useAuth.ts
   │  │  └─ types.ts
   │  ├─ users/
   │  │  ├─ pages/UsersListPage.tsx
   │  │  ├─ pages/UserDetailPage.tsx
   │  │  ├─ components/UserTable.tsx
   │  │  ├─ components/UserForm.tsx
   │  │  ├─ hooks/useUserForm.ts
   │  │  └─ types.ts
   │  └─ orders/
   │     ├─ pages/OrdersListPage.tsx
   │     ├─ components/OrdersTable.tsx
   │     └─ types.ts
   ├─ screens/                         // multi-feature compositions
   │  ├─ DashboardScreen.tsx
   │  └─ SettingsScreen.tsx
   ├─ hooks/
   │  ├─ useDisclosure.ts
   │  └─ useMediaQuery.ts
   ├─ lib/
   │  ├─ axios.ts                      // axios instance + interceptors
   │  ├─ env.ts                        // zod-validated env
   │  ├─ i18n.ts                       // optional i18n
   │  ├─ storage.ts                    // token helpers, localStorage
   │  └─ permissions.ts                // RBAC helpers
   ├─ store/
   │  ├─ index.ts                      // configureStore
   │  ├─ hooks.ts                      // typed useAppDispatch/Selector
   │  ├─ ui.slice.ts                   // sidebarOpen, theme, modals
   │  ├─ auth.slice.ts                 // token, user
   │  └─ (rtk-query)/                  // optional if you choose RTK Query
   │     └─ api.ts
   ├─ styles/
   │  ├─ globals.css
   │  └─ tailwind.css
   ├─ types/
   │  └─ globals.d.ts
   ├─ utils/
   │  ├─ cn.ts
   |  ├─ error_boundary.tsx
   │  ├─ date.ts
   │  └─ format.ts
   └─ __mocks__/                       // MSW dev mocks (optional)
      ├─ server.ts
      └─ handlers/
         ├─ auth.ts
         └─ users.ts
