import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    console.log(email, password);
    this.props.signinUser({email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!
          </strong>
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
        password
      }
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control"/>
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

let InitializeFromStateForm = reduxForm({
  form: 'signinForm',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);

export default InitializeFromStateForm;
