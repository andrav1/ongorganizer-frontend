import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

class DashboardStore {
  constructor(store) {
    this.store = store;
    this.entities = [];
  }

  // Observables
  sessionStatus;

  getAll = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: '/api/dashboard/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getVolunteers = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: '/api/get_volunteers/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  accept = async id => {
    const sessionPromise = this.store.api.accept({
      id,
      url: '/api/volunteer_user/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
  refuse = async id => {
    const sessionPromise = this.store.api.refuse({
      id,
      url: '/api/volunteer_user/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
  apply = async id => {
    const sessionPromise = this.store.api.apply({ id, url: '/api/ngo_user/' });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return res.data;
  };
  setEntities = entities => {
    return (this.entities = entities);
  };
  handleGet = data => {
    return this.setEntities(data);
  };

  reset = () => {
    this.entities = [];
  };
}

decorate(DashboardStore, {
  entities: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setEntities: action,
  reset: action,
});

export default DashboardStore;
