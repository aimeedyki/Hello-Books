import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrorMessage } from '../../actions/authAction';
import { passwordChange, } from '../../actions/userAction';
import Button from '../Common/Button.jsx';

/** @description component to change password
 *
 * @class ChangePassword
 *
 * @extends {Component}
 */
export class ChangePassword extends Component {
  /** @description Creates an instance of ChangePassword
   *
   * @param { object } props
   *
   * @memberof ChangePassword
   */
  constructor(props) {
    super(props);
    this.state = {
      confirmNewPassword: '',
      newPassword: '',
      oldPassword: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closePage = this.closePage.bind(this);
  }

  /** @description sets the state to the value of the respective fields
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof ChangePassword
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /** @description submits the form
   *
   * @returns {*} null
   *
   * @param {object} event
   *
   * @memberof ChangePassword
   */
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.newPassword === this.state.confirmNewPassword) {
      this.props.passwordChange(
        this.state.oldPassword,
        this.state.newPassword,
        this.state.confirmNewPassword)
        .then((response) => {
          if (response) {
            this.props.history.push('/main');
          }
        }).catch((error) => {
          Materialize.toast(error.message, 4000, 'indigo darken-2');
        });
    } else {
      Materialize.toast('Passwords do not match', 4000, 'indigo darken-2');
    }
  }

  /** @description closes the page
   *
   * @returns {*} null
   *
   * @memberof ChangePassword
   */
  closePage() {
    this.props.history.push('/main/profile');
  }

  /** @description renders the ChangePassword component
   *
   * @returns {JSX} JSX
   *
   * @memberof ChangePassword
   */
  render() {
    return (
      <div className='row'>
        <div className='card profile col s10 l4 offset-s1 offset-l5'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='row'>
              <i className="material-icons red-text right close link-cursor"
                id="close" onClick={this.closePage}>
                close</i>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
                <h5 className='indigo-text text-darken-2 greeting center'><b>
                  Change password</b></h5>
                <div className='input-field col s12'>
                  <input name='oldPassword' type='password' className='validate'
                    onChange={this.handleChange}

                    value={this.state.oldPassword}
                    required
                  />
                  <label>Old password</label>
                </div>
                <div className='input-field col s12'>
                  <input name='newPassword' type='password' className='validate'
                    onChange={this.handleChange}

                    value={this.state.newPassword}
                    required
                  />
                  <label>New password</label>
                </div>
                <div className='input-field col s12'>
                  <input name='confirmNewPassword'
                    type='password' className='validate'
                    onChange={this.handleChange}

                    value={this.state.confirmNewPassword}
                    required
                  />
                  <label> Confirm new password</label>
                </div>
                <div className='center'>
                  <Button type='submit' name='action'
                    label='Change' />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    );
  }
}

/** @description connects the state from the store to the component props
   *
   * @param { object } state
   *
   * @returns { object } user details
   * @returns { string } error message
   */
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { error } = state.userReducer;
  return {
    user,
    errorMessage: error
  };
};

export default connect(mapStateToProps, {
  passwordChange, clearErrorMessage
})(withRouter(ChangePassword));
