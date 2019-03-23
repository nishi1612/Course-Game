import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Show from './components/show';
import Showchallenge from './components/showchallenge';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        
        <Route path='/show/:id' component={Show} />
        <Route path='/showChallenge/:id' component={Showchallenge} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
