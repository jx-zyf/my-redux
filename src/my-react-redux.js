// mini-react-redux

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './my-redux'

// Provider 负责把store放到context中，所有的子组件都可以拿到store

export class Provider extends Component {
    constructor(props, context) {
        super(props, context)
        // 将传递进来的store保存以便constructor外部使用
        this.store = this.props.store
    }
    // 核心：将store放到context里
    getChildContext() {
        return {
            store: this.store
        }
    }
    static childContextTypes = {
        store: PropTypes.object
    }
    render() {
        return this.props.children
    }
}

// connect 负责连接组件
// 1.接收一个组件，将redux数据放入组件的props内，并且返回一个组件
// 2.当redux中的数据发生改变时，通知组件

export const connect = (mapStateToProps, mapDispatchToProps) => (WrapComponent) => {
    return class connectComponent extends Component {
        constructor(props, context) {
            super(props, context)
            this.state = {
                props: {}   // 将全部需要传到子组件的props放在这里，包括它本身的和redux中的
            }
        }
        static contextTypes = {
            store: PropTypes.object
        }
        componentWillMount() {
            const { store } = this.context
            this.update()
            // 数据发生改变时重新update
            store.subscribe(() => {
                this.update()
            })
        }
        update = () => {
            const { store } = this.context
            const needState = mapStateToProps(store.getState())
            const needDispatch = bindActionCreators(mapDispatchToProps, store.dispatch)
            this.setState({
                props: {
                    ...this.props,
                    ...needState,
                    // dispatch: store.dispatch
                    ...needDispatch
                }
            })
        }
        render() {
            return <WrapComponent {...this.state.props} />
        }
    }
}

// 相当于
// export function connect(mapStateToProps, mapDispatchToProps) {
//     return function(wrapComponent) {
//         return class connectComponent extends Component {
//             // ...
//         }
//     }
// }