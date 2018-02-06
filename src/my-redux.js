// mini-redux
// enhancer 增强器
export function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }
    let curState = {}
    // 监听器
    let curListeners = []
    function getState() {
        return curState
    }
    function subscribe(listen) {
        curListeners.push(listen)
    }
    function dispatch(action) {
        curState = reducer(curState, action)
        // 调用监听器
        curListeners.forEach(item => item())
        // 返回当前action
        return action
    }
    // 为了命中default，有初始值
    dispatch({
        type: 'LINXUN_REDUX/001'
    })
    return { getState, subscribe, dispatch }
}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}
// 将每个creator与dispatch绑定并返回绑定之后函数
export function bindActionCreators(creators, dispatch) {
    const result = {}
    Object.keys(creators).forEach(item => {
        let creator = creators[item]
        result[item] = bindActionCreator(creator, dispatch)
    })
    return result
}

// 中间件(有点懵。。。)
export function applyMiddleware(...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch
        const midAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        const middlewareChain = middlewares.map(middleware => middleware(midAPI))
        dispatch = compose(...middlewareChain)(store.dispatch)
        // dispatch = middleware(midAPI)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

export function compose(...funcs) {
    if (funcs.lenght === 0) {
        return arg => arg
    }
    if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((ret, item) => (...args) =>ret(item(...args)))
}