import axios from 'axios';
import config from '../config';

export default () => {
  const client = axios.create(config.api);

  const getData = {
    data(params) {
      return client.request({
        method: 'get',
        url: params,
      });
    },
  };
  const user = {
    login(params) {
      return client.request({
        method: 'post',
        url: 'api-token-auth/',
        data: {
          username: params.username,
          password: params.password,
        },
      });
    },
  };
  const new_ngo = {
    registerNGO(params) {
      return client.request({
        method: 'post',
        url: 'api/ngo_user/',
        data: {
          username: params.username,
          activity_domain: params.activity_domain,
          legal_person: params.legal_person,
          website: params.website,
          summary: params.summary,
          name: params.name,
          address: params.address,
          password: params.password,
          email: params.email,
        },
      });
    },
  };
  const new_volunteer = {
    registerVolunteer(params) {
      return client.request({
        method: 'post',
        url: 'api/volunteer_user/',
        data: {
          username: params.username,
          main_interest: params.main_interest,
          birth_date: params.birth_date,
          summary: params.summary,
          name: params.name,
          address: params.address,
          password: params.password,
          email: params.email,
        },
      });
    },
  };
  return {
    getData,
    user,
    new_ngo,
    new_volunteer,
  };
};
