## Referents

- [Next JS](https://nextjs.org/)
- [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Informations

You need to provide a webpack loader that will handle SVG imports, one of the famous one is svgr.

## Install libs

```bash
yarn add -D @svgr/webpack
```

## Setup SVG

- Update file `next.config.js`

```js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
```
