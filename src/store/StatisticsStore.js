import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

class StatisticsStore {
  constructor(store) {
    this.store = store;
    this.entities = [];
  }
  // Observables
  sessionStatus;
  setEntities = entities => {
    return (this.entities = entities);
  };
  handleGet = data => {
    return this.setEntities(data);
  };
  getAll = async params => {
    const sessionPromise = this.store.api.getAll({
      ...params,
      url: '/api/recruitment/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
}

decorate(StatisticsStore, {
  entities: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setEntities: action,
  reset: action,
});

export default StatisticsStore;
