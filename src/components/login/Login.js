import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as sessionActions from '../../actions/sessionActions';
import Input from '../input/Input';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  getUserAccounts() {
    return fetch('https://reqres.in/api/users?page=2')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  onSubmit(history) {
    const { user } = this.state;
    const { login } = this.props.actions;
    const users = this.getUserAccounts();
    console.log("00");
    console.log(users);
    console.log(typeof(users));
    //if(user.email === users[0].id && user.password===users[0].first_name)
    //if(user.email === "a" && user.password==="b")
    login(user, history); //login trong sessionActions
  }

  onChange(e) {
    const { value, name } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  render() {
    const { user: { email, password } } = this.state;
    const SubmitButton = withRouter(({ history }) => (
      <button
        onClick={() => this.onSubmit(history)}
        type="submit">Submit
      </button>
    ));

    return (
      <div>
        <h3>LOGIN</h3>
        <Input
          name="email"
          value={email}
          label="Email"
          type="email"
          onChange={this.onChange}
        />
        <Input
          name="password"
          value={password}
          label="Password"
          type="password"
          onChange={this.onChange}
        />
        <SubmitButton />
      </div>
    );
  }
}

const { object } = PropTypes;

Login.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Login);
