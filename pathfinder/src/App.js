import React, { Component } from 'react';
import './App.css';
import PathfinderMenu from "./ui/Menu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pathfinder</h1>
        </header>
        <PathfinderMenu />
      </div>
    );
  }
}

export default App;
