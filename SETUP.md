# Setup

## Referents

- [NextJS Basic Setup](https://nextjs.org/learn/basics/create-nextjs-app)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Create a Next.js App

```bash
yarn create next-app

# upgrade lib if need
yarn upgrade --latest
```

## Recommend

- use VSCode IDE
- use function component with hook (without `app.jsx`, `document.jsx`)
- use styled-components
- with other UI framework (tailwind, bootstrap, ant design, ...)

### Update folder structure

```js
.
├── 📁 assets
│   ├── 📁 styles
│   │   └── 📝 globals.scss
│   └── 📁 images
├── 📁 components
│   ├── 📁 common
│   └── 📁 partials
├── 📁 layouts
│   ├── 📁 components
│   ├── 📝 default.jsx
│   └── 📝 error.jsx
├── 📁 pages
│   ├── 📝 _app.jsx
│   ├── 📝 _document.jsx
│   ├── 📝 _error.jsx
│   ├── 📝 404.jsx
│   └── 📝 index.jsx
├── 📁 public
├── 📝 .env
├── 📝 .env.development
├── 📝 .env.production
├── 📝 jsconfig.js
├── 📝 next.config.js
└── 📝 README.md
```

## Basic setup

### Use alias `@/` for path

Exmaple: `@/layouts/default`

To do:

- Create `/jsconfig.json` with content

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules", "out"]
}
```

- Create `/next.config.js` with content

```js
module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['@'] = __dirname;

    return config
  },
}
```

### Built-In CSS Support

#### Import CSS global

Import `css/scss` files in `/_app.js`

Before you can use Next.js' built-in SCSS support, be sure to install sass:

```bash
yarn add sass
```

Example

```jsx
import "@/assets/styles/globals.scss"
// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
// tailwind
import '@/assets/styles/tailwind.css'
```

#### Styles in JS

Install libs

```bash
yarn add styled-components

# custom babel
yarn add -D babel-plugin-styled-components
# if you not custom babel. You will see error when build
```

Update file `/.babelrc`

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

Finally, let’s update `/pages/_document.js`

```jsx
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
```

Let enjoy

Example update `/pages/index.js`

```jsx
import Head from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
 h1 {
   font-size: 4rem;
 }
`
const Container = styled.div`
  text-align: center;
`
const Title = styled.h1`
  font-size: 50px;
  color: #0070f3;
`

export default function Home() {
  return (
    <>
      <Head>
        <title>SSR styled-components with Next.js Starter</title>
      </Head>
      <Container>
        <GlobalStyle />
        <Title>Hello, world!</Title>
      </Container>
    </>
  )
}
```

#### Import CSS/SCSS files (not CSS Modules)

> By default, NextJS not suport import `CSS/SCSS` in js (Exception `_app.jsx`). It only suport [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)

So we need custom NextJS to can import `CSS/SCSS` file in `jsx`.

- Install libs

```bash
yarn add -D @zeit/next-sass @zeit/next-css
```

- Custom `/next.config.js`

```js
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withSass(withCSS({
  webpack: (config, options) => {
    config.resolve.alias['@'] = __dirname

    return config
  },
}))
```

## Setup layout

Create files with content

- `layouts/components/Header.js`

```jsx
const Header = (props) => {
  return (
    <>
      <h1>Header</h1>
    </>
  );
}

export default Header
```

- `layouts/components/Footer.js`

```jsx
const Footer = (props) => {
  return (
    <>
      <h1>Footer</h1>
    </>
  );
}

export default Footer
```

- `layouts/default.js`

```jsx
import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default DefaultLayout
```

- `layouts/error.js`

```jsx
export default function ErrorLayout({ children }) {
  return (
    <>
      <h1>ERROR PAGE</h1>
      {children}
    </>
  )
}
```

Update `/pages/_app.js`

```jsx
import React from "react"
import App from 'next/app'
import Head from 'next/head'

import LayoutDefault from '@/layouts/default'

// import UI framework and global css
// import '@/assets/styles/tailwind.css'
import '@/assets/styles/globals.scss'

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`
=========================================================
* TP NextJS
=========================================================

* Website: https://tampm.com
=========================================================
    `)
    document.insertBefore(comment, document.documentElement)
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    const Layout = Component.layout || LayoutDefault

    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>TP NextJS</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    )
  }
}
```

By default, we will use `layout default`. If you need use other layout, you can see the example below:

Update `/pages/index.js`

```jsx
import ErrorLayout from '@/layouts/error.js'

const HomePage = () => {
  return (
    <>
      index
    </>
  )
}

HomePage.layout = ErrorLayout

export default HomePage
```
