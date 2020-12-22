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