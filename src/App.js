import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {Navigation} from "./components/navigations/Navigation";
import LoginPage from "./pages/auth/LoginPage";
import {About} from "./pages/misc/About";
import {NotFoundPage} from "./pages/misc/NotFoundPage";
import './styles/index.sass';

const App = () => (
  <div className="public-app">
    <Navigation/>
    <Switch>
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/about" component={About}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
);

export default App;