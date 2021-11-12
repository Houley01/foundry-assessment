// =============================
// = File Name: app.tsx        =
// =   Version: 1.0            =
// = Edited by: Ethan Houley   =
// =============================
import React from 'react'
// Imports for routing table
import NavBar from './components/navBar'
import Home from './components/home'
import Client from './components/client'
import Employee from './components/employee'
import DisplayEngagement from './components/engagmentRedo'
// Import for routes
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// Bootstrap Styling
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <div className="content">
          <Switch>
            <Route exact path="/"> <Home /> </Route>
            <Route path="/client"> <Client /> </Route>
            <Route path="/employee"> <Employee /> </Route>
            <Route path="/engagment"> <DisplayEngagement /> </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
