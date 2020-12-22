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
import { css, Global, jsx } from '@emotion/react'
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

const Title = styled.h1`
  font-size: 50px;
  color: #0070f3;
  text-align: center
`

const Button = styled.button`
  color: ${props =>
    props.primary ? 'hotpink' : 'turquoise'};
`

const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))

const HomePage = () => {
  return (
    <>
      { globalStyles }
      <Container column>
        <Title>Example</Title>
        <Button>This is a regular button.</Button>
        <Button primary>This is a primary button.</Button>
      </Container>
    </>
  )
}

export default HomePage
```
