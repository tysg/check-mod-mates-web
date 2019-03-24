import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'



ReactDOM.render((<BrowserRouter>
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/app" component={App} />
        </Switch>

    </div>

</BrowserRouter>), document.getElementById('root'));

// const RenderingApp = (props) => {
//     return (<App token={window.location.search} />);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
