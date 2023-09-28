
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import logger from './logger';
function App() {
  logger.info('App component loaded');
  return (
    <Router>
      <Switch>
        <Route path='/home' component={HomeComponent} />
        <Route path='/about' component={AboutComponent} />
      </Switch>
    </Router>
  );
}
