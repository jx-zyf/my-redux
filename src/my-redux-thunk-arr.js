
export default ({ dispatch, getState }) => next => action => {
    if (Object.prototype.toString.call(action) === '[object Array]') {
        return action.forEach(item => dispatch(item))
    }
    return next(action)
}