import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './views/App';

ReactDOM.render(
  <Router>
      <Route exact path='/' component={App}/>
  </Router>
  , document.getElementById('root'));

registerServiceWorker();
