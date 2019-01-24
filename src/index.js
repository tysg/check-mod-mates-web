import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import Home from './Home';
import App from './App';
import * as serviceWorker from './serviceWorker';



ReactDOM.render((<BrowserRouter>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth/:token" component={App} />
    </Switch>
    <div>

        {/* <App token={window.location.search} /> */}
    </div>
</BrowserRouter>), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
