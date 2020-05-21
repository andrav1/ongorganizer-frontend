import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import config from './config';
import createStore from './store';

import Screen from './components/routes/Screen';
import Login from './components/Login';
import RegisterNGO from './components/RegisterNGO';
import RegisterVolunteer from './components/RegisterVolunteer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import VoluteerProfile from './components/VolunteerProfile';
import NGOProfile from './components/NGOProfile';
import Project from './components/Project';
import ProjectApplication from './components/ProjectApplication';
import ReviewApplications from './components/ReviewApplications';
import SeeVolunteers from './components/SeeVolunteers';
import ChangePassword from './components/ChangePassword';
import CompleteFeedback from './components/CompleteFeedback';

const store = createStore(config);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" component={Screen} exact />
              <Route path="/login" component={Login} />
              <Route path="/registervolunteer" component={RegisterVolunteer} />
              <Route path="/registerngo" component={RegisterNGO} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <ProtectedRoute
                path="/volunteer_profile"
                component={VoluteerProfile}
              />
              <ProtectedRoute path="/ngo_profile" component={NGOProfile} />
              <ProtectedRoute path="/project" component={Project} />
              <ProtectedRoute
                path="/my_projects"
                component={ProjectApplication}
              />
              <ProtectedRoute
                path="/review_applications"
                component={ReviewApplications}
              />
              <ProtectedRoute path="/volunteers" component={SeeVolunteers} />
              <Route path="/change_password" component={ChangePassword} />
              <ProtectedRoute path="/feedback" component={CompleteFeedback} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default observer(App);
