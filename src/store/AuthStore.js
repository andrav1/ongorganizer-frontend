import { decorate, observable, computed, action, extendObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import Cookie from 'mobx-cookie';

class AuthStore {
  constructor(store) {
    this.store = store;
    extendObservable(this, {
      token: new Cookie('token'),
      role: new Cookie('role'),
    });
  }

  // Observables
  userID;
  sessionStatus;

  // Computed
  get isLoggedIn() {
    return Boolean(this.token.get());
  }

  get isVolunteer() {
    return this.role.get() === 'volunteer';
  }
  get isNgo() {
    return this.role.get() === 'ngo';
  }

  // Actions
  registerNGO = async params => {
    const sessionPromise = this.store.api.new_ngo.registerNGO(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    // Do stuff
  };
  getVolunteerProfile = async params => {
    const sessionPromise = this.store.api.new_volunteer.getProfile(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
  deleteVolunteerProfile = async params => {
    const sessionPromise = this.store.api.new_volunteer.deleteProfile(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    this.reset();
  };
  giveUpNgo = async params => {
    const sessionPromise = this.store.api.new_volunteer.giveUpNgo(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res;
  };
  getNGOProfile = async params => {
    const sessionPromise = this.store.api.new_ngo.getProfile(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
  updateVolunteerProfile = async params => {
    const sessionPromise = this.store.api.new_volunteer.updateProfile(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
  };
  updateNGOProfile = async params => {
    const sessionPromise = this.store.api.new_ngo.updateProfile(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
  };
  deleteNgoProfile = async params => {
    const sessionPromise = this.store.api.new_ngo.deleteProfile(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    this.reset();
  };
  registerVolunteer = async params => {
    const sessionPromise = this.store.api.new_volunteer.registerVolunteer(
      params
    );
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    // Do stuff
  };
  getCurrentUser = async params => {
    const sessionPromise = this.store.api.user.getCurrentUser(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    this.setRole(res.data.role);
    localStorage.setItem('role', res.data.role);
    localStorage.setItem('ngo', res.data.id);
  };
  login = async params => {
    const sessionPromise = this.store.api.user.login(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    this.setToken(res.data.token);
    this.getCurrentUser();
  };

  setToken = token => {
    console.log(token);
    localStorage.setItem('token', token);
    this.token.set(token, { expires: 7 });
  };

  setRole = role => {
    localStorage.setItem('role', role);
    this.role.set(role, { expires: 7 });
  };

  reset = () => {
    localStorage.removeItem('token');
    this.token.remove();
    this.sessionStatus = null;
  };
  forgot_password = async params => {
    const sessionPromise = this.store.api.forgot_password(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res;
  };
  change_password = async params => {
    const sessionPromise = this.store.api.change_password(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res;
  };
}
decorate(AuthStore, {
  sessionStatus: observable,
  isLoggedIn: computed,
  signUp: action,
  login: action,
  handleAuth: action,
  setToken: action,
  setRole: action,
  reset: action,
});

export default AuthStore;
