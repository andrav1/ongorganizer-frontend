import createApi from '../services/api';
import DashboardStore from './DashboardStore';
import AuthStore from './AuthStore';

class Store {
  constructor(config) {
    this.config = config;

    this.dashboardStore = new DashboardStore(this);
    this.authStore = new AuthStore(this);

    this.api = createApi({
      config: config.api,
    });
  }
}

export default Store;
