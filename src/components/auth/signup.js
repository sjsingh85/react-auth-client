import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          {this.props.errorMessage}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      handleSubmit,
      fields: {
        email,
        password,
        confirmPassword
      }
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type="email" {...email} className="form-control"/>
          {email.touched && email.error && <div className="text-danger">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control"/>
          {password.touched && password.error && <div className="text-danger">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...confirmPassword} type="password" className="form-control"/>
          {confirmPassword.touched && confirmPassword.error && <div className="text-danger">{confirmPassword.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">Sign Up</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

function validate(formProps){
  const errors ={};

if(!formProps.email){
  errors.email = "Email is required!";
}

if(!formProps.password){
  errors.password = "Password is required!";
}

if(!formProps.confirmPassword){
  errors.confirmPassword = "Confirm Password is required!";
}

if(formProps.confirmPassword !== formProps.password){
  errors.confirmPassword = "Passwords must match!";
}

  return errors;
}

let InitializeFromStateForm = reduxForm({
  form: 'signupForm',
  fields: ['email', 'password', 'confirmPassword'],
  validate
}, mapStateToProps, actions)(Signup);

export default InitializeFromStateForm;
