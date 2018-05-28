import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getOrganizationsFromServer, getDescriptionsFromServer, getUsersFromServer, getUserOrganizationsFromServer, getUserFromToken, getOrganizationRequestsFromServer } from '../store';

import Nav from './Nav';
import Users from './User/Users';
import UserInfo from './User/UserInfo';
import OrganizationList from './Organization/OrganizationList';
import OrganizationInfo from './Organization/OrganizationInfo';
import LoginForm from './User/LoginForm';


class App extends React.Component {
  componentDidMount() {
    const { loadOrganizations, loadUsers, loadDescriptions, loadUserOrganizations, loadUser, loadOrganizationsRequests } = this.props;
    loadOrganizations();
    loadUsers();
    loadDescriptions();
    loadUserOrganizations();
    loadUser();
    loadOrganizationsRequests();
  }

  render(){
    return (
      <Router>
        <div>
          <div className="container">
            <Nav />
            <div id="body-elements">
              <Switch>
                {/* USER ROUTES */}
                <Route exact path='/users' component={Users} />
                <Route exact path='/users/:id' component={({ match }) => <UserInfo id={ match.params.id } />} />
                {/* ORGANIZATION ROUTES */}
                <Route exact path='/organizations' component={OrganizationList} />
                <Route exact path='/organizations/:id' component={({ match, history }) => <OrganizationInfo id={ match.params.id } history={history} />} />
                {/* ADMIN ROUTES */}
                {/* AUTH ROUTES */}
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/signup' component={LoginForm} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapDisptach = (dispatch) => {
  return {
    loadOrganizations: () => dispatch(getOrganizationsFromServer()),
    loadUsers: () => dispatch(getUsersFromServer()),
    loadDescriptions: () => dispatch(getDescriptionsFromServer()),
    loadUserOrganizations:() => dispatch(getUserOrganizationsFromServer()),
    loadOrganizationsRequests:() => dispatch(getOrganizationRequestsFromServer()),
    loadUser: () => {
      const token = window.localStorage.getItem('token')
      if (token){
        dispatch(getUserFromToken(token))
      }
    }
  }
}

export default connect(null, mapDisptach)(App);
