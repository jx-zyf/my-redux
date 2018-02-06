import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NavBar extends Component {
    render() {
        return (
            <div>
                NavBar
                <TabBar />
            </div>
        )
    }
}

class TabBar extends Component {
    static contextTypes = {
        user: PropTypes.string
    }
    render() {
        console.log(this.context)
        return (
            <div>TabBar ... {this.context.user}</div>
        )
    }
}

class Page extends Component {
    constructor() {
        super()
        this.state = {
            user: 'linxun',
        }
    }
    static childContextTypes = {
        user: PropTypes.string,
    }
    getChildContext() {
        return this.state
    }
    render() {
        return (
            <div>
                I am {this.state.user}
                <NavBar />
            </div>
        )
    }
}

export default Page