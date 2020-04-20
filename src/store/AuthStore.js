import { decorate, observable, computed, action, extendObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import Cookie from 'mobx-cookie';

class AuthStore {
  constructor(store) {
    this.store = store;
    extendObservable(this, {
      token: new Cookie('token'),
    });
  }

  // Observables
  userID;
  sessionStatus;

  // Computed
  get isLoggedIn() {
    return Boolean(this.token.get());
  }

  // Actions
  registerNGO = async params => {
    const sessionPromise = this.store.api.new_ngo.registerNGO(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    // Do stuff
  };

  registerVolunteer = async params => {
    const sessionPromise = this.store.api.new_volunteer.registerVolunteer(
      params
    );
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;

    // Do stuff
  };
  login = async params => {
    const sessionPromise = this.store.api.user.login(params);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    this.setToken(res.data);
  };

  setToken = token => {
    localStorage.setItem('token', token);
    this.token.set(token, { expires: 7 });
  };

  reset = () => {
    localStorage.removeItem('token');
    this.token.remove();
    this.sessionStatus = null;
  };
}

decorate(AuthStore, {
  sessionStatus: observable,
  isLoggedIn: computed,
  signUp: action,
  login: action,
  handleAuth: action,
  setToken: action,
  reset: action,
});

export default AuthStore;
