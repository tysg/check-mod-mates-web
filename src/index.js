import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import Home from './Home';
import App from './App';
import * as serviceWorker from './serviceWorker';



ReactDOM.render((<BrowserRouter>
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Redirect from="/auth/(\?)token=:id" to="/app" /> */}
            {/* <Redirect from="/auth" to="/app" /> */}
            {/* <Route
                path="/auth/?token=*"j
                // render={props => (<Redirect to={`/app`} />)}
                
            /> */}
            <Route path="/app" component={App} />
            {/* <Route path="/auth/" >
                <Redirect to={{
                    pathname: '/app/',
                    search: window.location.search,
                }} />
            </Route>
            <Route exact path="/app/" component={App} /> */}
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
