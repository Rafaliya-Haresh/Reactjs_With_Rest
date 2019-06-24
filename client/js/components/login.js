import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import { Button, Checkbox, Form, Grid, Header } from "semantic-ui-react";
import { onLogin } from "../actions/loginActions";
import "../../scss/loginStyle.scss";

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onLogin(this.state);
    };

    onChangeInput = (event) => {
        const { name, value } = event.target;

        this.setState({ 
            [name]: value 
        });
    }

    render () {
        return (
            <div className="middle-box">
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column mobile={12} tablet={8} computer={6} textAlign="left">
                            <Header size='huge'>Login</Header>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeInput}
                                        placeholder="Email"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input
                                        type="Password"
                                        name="password"
                                        value={this.state.Password}
                                        onChange={this.onChangeInput}
                                        placeholder="Password"
                                    />
                                </Form.Field>
                                <Button type='submit' primary>Submit</Button>
                                <Button floated="right"><Link to="/">Cancel</Link></Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <NotificationContainer />
            </div>
        );
    }
}

Login.propTypes = {
    store: PropTypes.object.isRequired,
    onLogin: PropTypes.func
}

const mapStateToProps = state => ({ 
    store: state.LoginStore 
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogin: (credential) => dispatch(onLogin(credential, ownProps.history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);