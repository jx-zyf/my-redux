const ADD = 'ADD'
const REMOVE = 'REMOVE'

const initState = {
    num: 10
}

export function reducer(state = initState, action) {
    const { type } = action
    switch (type) {
        case ADD:
            return { ...state, num: state.num + 1 }
        case REMOVE:
            return { ...state, num: state.num - 1 }
        default:
            return initState
    }
}

// action creator
export function add() {
    return { type: ADD }
}

export function remove() {
    return { type: REMOVE }
}

export function asyncAdd() {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 1000)
    }
}

export function addTwo() {
    return [{ type: ADD }, asyncAdd()]
}