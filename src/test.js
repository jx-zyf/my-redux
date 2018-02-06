import { createStore } from './redux.test'
// import { createStore } from 'redux'

const initState = {
    num: 10
}

// reducer(处理store，必须是纯函数)
function reducer(state = initState, action) {
    console.log(state, action)
    switch (action.type) {
        case 'ADD':
            return { ...state, num: state.num+1 }
        case 'REMOVE':
            return { ...state, num: state.num-1 }
        default:
            return initState
    }
}

// 创建仓库
const store = createStore(reducer)
console.log(`现在的num: ${store.getState().num}`)

// action creator
function add() {
    return { type: 'ADD' }
}

function remove() {
    return { type: 'REMOVE' }
}

// 监听改变
function listen() {
    const current = store.getState().num
    console.log(`现在的num: ${current}`)
}

// 订阅
store.subscribe(listen)

store.dispatch(add())
store.dispatch(add())
store.dispatch(remove())
store.dispatch(add())