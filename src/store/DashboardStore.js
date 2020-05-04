import { decorate } from 'mobx';

class DashboardStore {
  constructor(store) {
    this.store = store;
  }
}

decorate(DashboardStore, {});

export default DashboardStore;
