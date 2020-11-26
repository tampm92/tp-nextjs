# Setup `emotion` - NEXT JS

## Referents

- [ReactJS](https://reactjs.org/)
- [emotion](https://github.com/emotion-js/emotion/)
- [NextJS example with emotion](https://github.com/vercel/next.js/tree/canary/examples/with-emotion)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Install libs

```bash
yarn add @emotion/react @emotion/styled

# custom babel
yarn add -D @emotion/babel-plugin
# if you not custom babel. You will see error when build
```

## Update

Update file `/.babelrc`

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

## Let enjoy

Example update `/pages/index.js`

```jsx
import { jsx } from '@emotion/react'
import Head from 'next/head'
import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'

const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 3rem 1rem;
        margin: 0;
        background: papayawhip;
        min-height: 100%;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 24px;
      }
    `}
  />
)

const titleStyles = css`
  font-size: 50px;
  color: #0070f3;
`
const Title = styled.h1`
  ${titleStyles};
`

export default function Home(props) {
  return (
    <>
      <Head>
        <title>SSR styled-components with Next.js Starter</title>
      </Head>
      <Container>
        { globalStyles }
        <Title>Hello, world!</Title>

        <div
          css={{
            color: 'hotpink'
          }}
          {...props}
        />
      </Container>
    </>
  )
}
```
