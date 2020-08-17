import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Server from "./Server";

export default class MainRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        Server.setRouter(this);
    }

    redirect = (redirectPath) => {
        this.redirectPath = redirectPath;
        this.setState({reload: true});
    };

    render () {
        console.log(this.props.location, this.redirectPath)

        if (this.redirectPath) {
            let redirectPath = this.redirectPath;
            delete this.redirectPath;
            return <Redirect to={{
                    pathname: redirectPath,
                    state: { from: this.props.location.pathname }
                }}
            />
        }

        return (
                <Switch>
                    <Route path="/login">
                        <Login router={this} />
                    </Route>

                    <PrivateRoute path="/dashboard">
                        <Dashboard router={this} />
                    </PrivateRoute>

                    <PrivateRoute path="/">
                        <Redirect
                            to={{
                                pathname: "/dashboard",
                                state: { from: "/" }
                            }}
                        />
                    </PrivateRoute>
                </Switch>
        )
    }
}
