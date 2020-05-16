import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

class ProjectStore {
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
      url: '/api/project/',
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  getApp = async id => {
    const sessionPromise = this.store.api.project.getApp({
      id,
      url: `/api/application?project_id=${id}`,
    });
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    return this.handleGet(res.data);
  };
  reset = () => {
    this.entities = [];
  };
  deleteProject = async id => {
    const sessionPromise = this.store.api.project.deleteProject(id);
    this.sessionStatus = fromPromise(sessionPromise);
    const res = await sessionPromise;
    this.reset();
  };
}

decorate(ProjectStore, {
  entities: observable,
  sessionStatus: observable,
  getAll: action,
  handleGet: action,
  setEntities: action,
  reset: action,
});

export default ProjectStore;
