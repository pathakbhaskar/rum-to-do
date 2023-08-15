import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Subscription from './Subscription';
import TodoApp from './TodoApp';
import './App.css';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path="/subscription" component={Subscription} />
        <Route path="/todo" component={TodoApp} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
