import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Tasklist from './Tasklist';
import {SERVER_URL} from '../constants.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', isAuthenticated: false, open: false};
    }

    login = () => {
        const user = {username: this.state.username, password: this.state.password};
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({isAuthenticated: true});
                } else {
                    this.setState({open: true});
                }
            })
            .catch(err => console.error(err))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClose = (event) => {
        this.setState({open: false});
    }

    render() {
        if (this.state.isAuthenticated === true) {
            return (<Tasklist/>)
        } else {
            return (
                <div>
                    <br/>
                    <TextField type="text" name="username" placeholder="Username"
                               onChange={this.handleChange}/><br/>
                    <TextField type="password" name="password" placeholder="Password"
                               onChange={this.handleChange}/><br/><br/>
                    <Button variant="text" color="primary" onClick={this.login}>Login</Button>
                    <Snackbar
                        open={this.state.open} onClose={this.handleClose}
                        autoHideDuration={1500} message='Check your username and password'/>
                </div>
            );
        }
    }
}

export default Login;
