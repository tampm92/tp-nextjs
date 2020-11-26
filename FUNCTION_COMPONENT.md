# Function Component REACT JS

- [ReactJS](https://reactjs.org/)
- [ReactJS hooks](https://reactjs.org/docs/hooks-reference.html)

## Example

```jsx
import React, { useState, useEffect } from 'react'

const ClockFunction = props => {
    const [time, setTime] = useState(new Date())

    const changeTime = () => {
        setTime(new Date())
    }

    useEffect(() => {
        const tick = setInterval(() => {
            changeTime()
        }, 1000)
        return () => clearInterval(tick)
    })
    return (
        <div className="clock">
            <h1>Hello! This is a function component clock.</h1>
            <h2>It is {time.toLocaleTimeString()}.</h2>
        </div>
    )
}

export default ClockFunction
```

## Overview

There are two most commonly used hooks: the state hook `useState` and the effect hook `useEffect`.

> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

### State Hook

State hook, `useState`, allows you to add states in the function component. Instead of setting an initial state with `this.state` statement in the constructor.

It will allow you to set `the initial state as an argument`.

State hook will return a pair of values: the `current state` and a `function that updates` it. Usually, we will use `useState` like this:

```jsx
const [time, setTime] = useState(new Date())
```

### Effect Hook

The Effect Hook, `useEffect`, adds the ability to perform side effects from a function component. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes, but unified into a single API.

Effect hook will get invoked with the first DOM updating. We can pass in a function in `useEffect`, and every time the DOM gets updated, the function in `useEffect` will get invoked too.

Also, the effect hook allows you to pass in an array as the `second argument`, which contains all the dependencies that will trigger the effect hook. If any of the dependencies changed, the effect hook will run again. This feature provides us a more efficient way to make an Ajax request. Instead of making the request every time with DOM updates, you can pass in dependencies that only make the request while these values change.

`useEffect` can be used like:

```jsx
useEffect(() => {
    setInterval(() => {
        changeTime()
    }, 1000)
})

useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```
