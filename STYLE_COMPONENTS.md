# Setup `styled-components` - NEXT JS - Server side rendering

## Referents

- [ReactJS](https://reactjs.org/)
- [styled-components](https://styled-components.com/)
- [NextJS example with styled-components](https://github.com/vercel/next.js/tree/master/examples/with-styled-components)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Install libs

```bash
yarn add styled-components

# custom babel
yarn add -D babel-plugin-styled-components
# if you not custom babel. You will see error when build
```

## Update

Update file `/.babelrc`

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

## Finally, let’s update `/pages/_document.js`

`styled-components` creates an instance of `ServerStyleSheet` - this stylesheet retrieves any styles found in all the components inside our <App />. This then gets passed into our Html template later on.

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

## Let enjoy

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

const Button = styled.button`
  color: ${props =>
    props.primary ? 'hotpink' : 'turquoise'};
`

const HomePage = () => {
  return (
    <>
      <Head>
        <title>SSR styled-components with Next.js Starter</title>
      </Head>
      <Container>
        <GlobalStyle />
        <Title>Hello, world!</Title>
        <Button>This is a regular button.</Button>
        <Button primary>This is a primary button.</Button>
      </Container>
    </>
  )
}

export default HomePage
```
