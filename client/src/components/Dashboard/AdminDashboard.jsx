import React, { Component } from 'react';
import { NavLink, Link, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryControls from './CategoryControls';
import UserActivity from './UserActivity';
import UserTransactions from './UserTransactions';


/** @description displays the admin dashboard
   *
   * @param { object } props
   *
   * @returns { JSX } JSX
   */
const AdminDashboard = props => (
  <div className="row grey lighten-4">
    <div className="col s12 l12">
      <div className="col s12 m6 l5 offset-l2 card dashboard-card">
        <h5 className='center greeting indigo-text text-darken-2'><b>
          User Activities</b>
        </h5>
        <UserActivity />
      </div>
      <div className="col s12 m5 l4 card dashboard-card-right">
        <CategoryControls />
      </div>
    </div>
    <div className="col s12 l12">
      <div
        className="col s12 l10 offset-l2 card dashboard-card transaction-page">
        <UserTransactions />
      </div>
    </div>
  </div>
);

export default AdminDashboard;
