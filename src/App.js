import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from './my-react-redux'
// import { connect } from 'react-redux'
import { add, remove, asyncAdd, addTwo } from './reducer'

class App extends Component {
  render() {
    const { num, add, remove, asyncAdd, addTwo } = this.props
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{ marginTop: '20px' }}>
          {num}
          <button onClick={() => { add() }}>加一</button>
          <button onClick={() => { remove() }}>减一</button>
          <button onClick={() => { asyncAdd() }}>1s后加一</button>
          <button onClick={() => { addTwo() }}>加二</button>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { num: state.num }
// }

App = connect(
  state => ({num: state.num}),
  { add, remove, asyncAdd, addTwo }
)(App)

export default App;
