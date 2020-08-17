import React from 'react';
import './Dashboard.css';
import Button from "@material-ui/core/Button/Button";
import Server from "../Server";

export default class Dashboard extends React.Component {
    constructor (props) {
        super(props);

        this.state = {

        };
    }

    onStartServerClick = (e) => {
        Server.startPublisherServer((success, error) => {
            console.log("onStartServerClick", success, error)
        })
    };

    render () {
        return (
            <div className="DashboardPage">
                <Button
                    className="DashboardStartServerButton"
                    variant="contained" color="primary"
                    onClick={this.onStartServerClick}
                >
                    Start My Publisher Server
                </Button>
            </div>
        )
    }
}
