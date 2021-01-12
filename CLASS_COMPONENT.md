# Class Component REACT JS


## Referents

- [ReactJS](https://reactjs.org/)
- [ReactJS lifecycle docs](https://reactjs.org/docs/state-and-lifecycle.html)
- [ReactJS component](https://reactjs.org/docs/react-component.html)
- [ReactJS lifecycle diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Lifecycle

![react-lifecycle](https://live.staticflickr.com/65535/50635688832_db29cbdeea_b.jpg)

## Eexample

```jsx
import React from 'react'

class ClockComponent extends React.Component {
    constructor(props) {
        super(props)
        // Don't call this.setState() here!
        this.state = { date: new Date() }
    }

    //  to set up any subscriptions
    componentDidMount() {
        this.time = setInterval(() => {
            this.changeTime()
        }, 1000)
    }

    // cleaning up any subscriptions
    componentWillUnmount() {
        clearInterval(this.time)
    }

    // to do network requests
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
        }
    }

    changeTime() {
        this.setState({ date: new Date() })
    }

    // render() method is the only required method in a class component.
    render() {
        return (
            <div className="clock">
                <h1>Hello! This is a class component clock.</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

export default ClockComponent
```

## Overview

### Mounting

These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

- [constructor()](https://reactjs.org/docs/react-component.html#constructor)
- [static getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [render()](https://reactjs.org/docs/react-component.html#render)
- [componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)

> These methods are considered legacy and you should avoid them in new code: [UNSAFE_componentWillMount()](https://reactjs.org/docs/react-component.html#unsafe_componentwillmount)

### Updating

An update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:

- [static getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
- [shouldComponentUpdate()](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
- [render()](https://reactjs.org/docs/react-component.html#render)
- [getSnapshotBeforeUpdate()](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
- [componentDidUpdate()](https://reactjs.org/docs/react-component.html#componentdidupdate)

- These methods are considered legacy and you should avoid them in new code: [UNSAFE_componentWillUpdate()](https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate), [UNSAFE_componentWillReceiveProps()](https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops)

### Unmounting

This method is called when a component is being removed from the DOM:

- [componentWillUnmount()](https://reactjs.org/docs/react-component.html#componentwillunmount)

### Error Handling

These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

- [static getDerivedStateFromError()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror)
- [componentDidCatch()](https://reactjs.org/docs/react-component.html#componentdidcatch)

### Other APIs

Each component also provides some other APIs:

- [setState()](https://reactjs.org/docs/react-component.html#setstate)
- [forceUpdate()](https://reactjs.org/docs/react-component.html#forceupdate)

### Class Properties

- [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)
- [displayName](https://reactjs.org/docs/react-component.html#displayname)

### Instance Properties

- [props](https://reactjs.org/docs/react-component.html#props)
- [state](https://reactjs.org/docs/react-component.html#state)

## Reference

### constructor(props)

- Constructor is the only place where you should assign this.state directly.
- In all other methods, you need to use this.setState().

### componentDidMount()

This function is invoked immediately after a component is mounted (inserted into the tree).

***Use Recommend***

- Initialization that requires DOM nodes should go here.
- If you need to `load data from a remote endpoint`, this is a good place to instantiate the network request.
- This method is `a good place to set up any subscriptions`. If you do that, don’t forget to unsubscribe in `componentWillUnmount()`.

> You `may call setState() immediately in componentDidMount()`. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the `render()` will be called twice in this case, the user won’t see the intermediate state. Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the `constructor()` instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.

### componentDidUpdate(prevProps, prevState, snapshot)

This funcyion is invoked immediately after updating occurs. This method is not called for the initial render.

***Use Recommend***

- Use this as `an opportunity to operate on the DOM` when the component has been updated.
- This is also `a good place to do network requests` as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

You may call `setState()` immediately in `componentDidUpdate()` but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance. If you’re trying to “mirror” some state to a prop coming from above, consider using the prop directly instead.

If your component implements the `getSnapshotBeforeUpdate()` lifecycle (which is rare), the value it returns will be passed as a third “snapshot” parameter to `componentDidUpdate()`. Otherwise this parameter will be undefined.

> `componentDidUpdate()` will not be invoked if `shouldComponentUpdate()` returns false.

### componentWillUnmount()

This function is invoked immediately before a component is unmounted and destroyed.

***Use Recommend***

- Perform `any necessary cleanup` in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().
- You should not call `setState()` in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

### setState(updater, [callback])

This function enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

```jsx
# using basic
this.setState({quantity: 2})
# using 
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```
