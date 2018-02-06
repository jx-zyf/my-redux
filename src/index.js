import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { createStore, applyMiddleware } from 'redux'
import { createStore, applyMiddleware } from './my-redux'
// import { Provider } from 'react-redux'
import { Provider } from './my-react-redux'
// import thunk from 'redux-thunk'
import thunk from './my-redux-thunk'
import arrThunk from './my-redux-thunk-arr'
import registerServiceWorker from './registerServiceWorker';
import { reducer } from './reducer'

const store = createStore(reducer, applyMiddleware(thunk, arrThunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
