import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Button } from 'react-bootstrap/Button';
import MyFav from './components/MyFav';
import ApiData from './components/ApiData';
import Profile from './components/Profile';
import "./App.css";
import Header2 from './components/Header2';

class App extends Component {
    
    render() {
        let { isAuthenticated,user } = this.props.auth0;

        return (
            <>
                <Router>
                    <Header2 />
                    <Switch>

                        <Route exact path="/">
                            {isAuthenticated && <MyFav user={user} />}

                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/api-data">
                            <ApiData />
                        </Route>
                    </Switch>






                </Router>



            </>

        )
    }
}
export default withAuth0(App)