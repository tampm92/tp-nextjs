# Setup `styled-jsx` - NEXT JS

## Referents

- [ReactJS](https://reactjs.org/)
- [styled-jsx](https://github.com/vercel/styled-jsx)
- [NextJS example with styled-jsx](https://github.com/vercel/next.js/tree/canary/examples/with-styled-jsx)
- [TP NextJS](https://tampm.com/blog/next-js/)

## Informations

`NEXT JS` bundle `styled-jsx` to provide support for isolated scoped CSS. The aim is to support "shadow CSS" similar to Web Components, which unfortunately **do not support server-rendering and are JS-only**.

See the above examples for other popular CSS-in-JS solutions (like Styled Components).

A component using `styled-jsx` looks like this:

```jsx
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  )
}

export default HelloWorld
```
