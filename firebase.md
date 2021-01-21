# Setup firebase for Next JS

## Referents

- [Next JS](https://nextjs.org/)
- [Firebase](https://firebase.google.com/docs/auth/web/google-signin)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Install libs

```bash
yarn add firebase
```

## Update ENV

- Add file '.env'

```js
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

```

## Follow structure

```js
.
├── 📁 assets
│   ├── 📁 styles
│   │   └── 📝 globals.scss
│   └── 📁 images
├── 📁 auth
│   ├── 📝 fireinit.jsx (*)
│   ├── 📝 index.jsx (*)
│   └── 📝 routes.jsx (*)
├── 📁 components
│   ├── 📁 common
│   └── 📁 partials
├── 📁 layouts
│   ├── 📁 components
│   ├── 📝 default.jsx
│   └── 📝 error.jsx
├── 📁 pages
│   ├── 📝 _app.jsx (*)
│   ├── 📝 login.jsx (*)
│   ├── 📝 user.jsx (*)
│   └── 📝 index.jsx
├── 📁 public
├── 📁 shared
│   ├── 📝config.jsx (*)
│   └── 📁 services
├── 📝 .env
├── 📝 .env.development
├── 📝 .env.production
├── 📝 jsconfig.js
├── 📝 next.config.js
└── 📝 README.md
```

> **(*) Please read content files [here](https://github.com/tampm92/tp-nextjs-react-bootstrap)**
