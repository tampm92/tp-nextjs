# NEXT JS

> Next.js is a React framework that is bound to ease your life as a React developer by abstracting away the common and redundant tasks (such as routing) into relatively simpler and powerful APIs. That way, you can focus on writing your apps instead of reinventing the wheel.

## Referents

- [ReactJS](https://reactjs.org/)
- [NextJS Basic Setup](https://nextjs.org/learn/basics/create-nextjs-app)
- [NextJS Docs](https://nextjs.org/docs/getting-started)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Create a Next.js App

```bash
npx create-next-app
# or
yarn create next-app

# upgrade
yarn upgrade --latest
```

## Overview

### Customizing Babel Config

Next.js includes the next/babel preset to your app, which includes everything needed to compile React applications and server-side code. But if you want to extend the default Babel configs, it's also possible.

Example: You need add lib [`styled-components`](https://github.com/styled-components/styled-components)

=> So you need cutom next/babel by create file `/.babelrc` with example content:

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

### Built-In CSS Support

> By default NextJS suport 3 option for CSS: `CSS global`, `CSS Modules`, `CSS inline`

#### Import CSS global

Import `css/scss` files in `/_app.jsx`

Before you can use Next.js's built-in SCSS support, be sure to install sass:

```bash
yarn add sass
```

Example

```jsx
import "@/assets/styles/globals.scss"
# bootstrap
import 'bootstrap/dist/css/bootstrap.css'
# tailwind
import '@/assets/styles/tailwind.css'
```

#### CSS Modules

Next.js supports [CSS Modules](https://github.com/css-modules/css-modules) using the [name].module.css file naming convention.

Example:

First, create `/components/Button.module.css` with the following content:

```css
/*
You do not need to worry about .error {} colliding with any other `.css` or
`.module.css` files!
*/
.error {
  color: white;
  background-color: red;
}
```

Then, create `/components/Button.jsx`, importing and using the above CSS file:

```jsx
import styles from './Button.module.css'

export function Button() {
  return (
    <button
      type="button"
      // Note how the "error" class is accessed as a property on the imported
      // `styles` object.
      className={styles.error}
    >
      Destroy
    </button>
  )
}
```

#### CSS inline

The simplest one is inline styles:

```jsx
function HiThere() {
  return <p style={{ color: 'red' }}>hi there</p>
}

export default HiThere
```

> Other solutions:

- [styled-jsx](https://github.com/vercel/next.js/tree/canary/examples/with-styled-jsx)
- [styled-components](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)
- [emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion)

## Conventions
