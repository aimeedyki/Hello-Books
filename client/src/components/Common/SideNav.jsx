import React, { Component } from 'react';
import { NavLink, Link, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/bookAction';

import BookCategory from '../Library/BookCategory.jsx';

/** side navigation on the user page
 * @export
 * @class SideNav
 * @extends {Component}
 */
class SideNav extends Component {
  /* eslint-disable class-methods-use-this */
  /** calls methods that gets all categories
 * @returns {*} null
 * @memberof SideNav
 */
  componentWillMount() {
    this.props.getCategories();
  }
  /** @returns {*} void
   * @memberof SideNav
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.button-collapse').sideNav({
        menuWidth: 200,
      });
    });
  }
  /** displays side navigation on user page
   * @returns {*} side nav
   * @memberof SideNav
   */
  render() {
    let adminLinks;

    // conditionally render navigation links depending on user level
    (this.props.user.admin === true) ? adminLinks = (
      <ul>
        <li><NavLink to="/user/dashboard" className="white-text">
          Dashboard</NavLink></li>
      </ul>
    ) : adminLinks = '';

    const pictureUrl = 'http://res.cloudinary.com/ddxsazo2k/image/upload';

    return (
      <div className="grey lighten-4">
        <ul id="slide-out" className="side-nav fixed indigo darken-2">
          <li>
            <div className="row user-view">
              <div className="background">
                <img src={`${pictureUrl}/v1509441598/booksbw2_emnjkv.jpg`}
                  alt="background" />
              </div>
              <a><img className="circle"
                src={this.props.profileImage} alt="level icon" /></a>
              <a><span className="col s10 white-text name side-email">
                Hello {this.props.name}!</span></a>
              <Link to="/user/profile"><span><i
                className="col s2 material-icons">
                settings</i></span></Link>
              <a><span className="white-text email side-email">
                {this.props.email}</span></a>
            </div>
          </li>
          <li><NavLink to="/user" className="white-text active">
            Library</NavLink></li>
          <li><NavLink to="/user/history" className="white-text">
            History</NavLink></li>
          <li><NavLink to="/user/notreturned" className="white-text">
            Outstanding</NavLink></li>
          {adminLinks}
          <div className="white cat">
            <h5 className="cat-head indigo-text text-darken-2">Categories</h5>
            {!this.props.categories ? <p className="blue-text center">
              No categories yet!</p> :
              <ul>
                {this.props.categories.map(category => (
                  (
                    <li key={category.id}>
                      <NavLink
                        to={`/user/${category.id}/${category.name}/category`}
                        className="indigo-text text-darken-2">
                        {category.name}</NavLink></li>)
                )
                )}
              </ul>}
          </div>
        </ul>
        <a href="#" data-activates="slide-out"
          className="button-collapse fixed">
          <i className="material-icons">menu</i></a>
      </div>
    );
  }
}

// function to connect the state from the store to the props of the component
const mapStateToProps = (state) => {
  const { user } = state.authReducer;
  const { categories } = state.bookReducer;
  return {
    categories,
    user
  };
};

// connects the state from the store to the props of the component
export default connect(mapStateToProps, {
  getCategories
})(withRouter(SideNav));