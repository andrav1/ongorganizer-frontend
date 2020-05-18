import axios from 'axios';
import config from '../config';

export default () => {
  const client = axios.create(config.api);

  const getAll = params => {
    console.log(params);

    return client.request({
      method: 'get',
      url: params.url,
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  };
  const accept = params => {
    return client.request({
      method: 'put',
      url: params.url,
      headers: { Authorization: `Token ${localStorage.token}` },
      data: {
        id: params.id,
        accepted: true,
      },
    });
  };
  const giveUp = params => {
    return client.request({
      method: 'delete',
      url: params.url,
      headers: { Authorization: `Token ${localStorage.token}` },
      data: {
        id: params.id,
      },
    });
  };

  const refuse = params => {
    return client.request({
      method: 'put',
      url: params.url,
      headers: { Authorization: `Token ${localStorage.token}` },
      data: {
        id: params.id,
        accepted: false,
      },
    });
  };
  const apply = params => {
    return client.request({
      method: 'put',
      url: params.url,
      headers: { Authorization: `Token ${localStorage.token}` },
      data: {
        id: params.id,
      },
    });
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
    getCurrentUser(params) {
      return client.request({
        method: 'get',
        url: 'api/current_user/',
        headers: { Authorization: `Token ${localStorage.token}` },
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
    getProfile(params) {
      return client.request({
        method: 'get',
        url: 'api/ngo_profile/',
        headers: { Authorization: `Token ${localStorage.token}` },
      });
    },
    deleteProfile(params) {
      return client.request({
        method: 'delete',
        url: 'api/ngo_profile/',
        headers: { Authorization: `Token ${localStorage.token}` },
      });
    },
    updateProfile(params) {
      return client.request({
        method: 'put',
        url: 'api/ngo_profile/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
        data: {
          activity_domain: params.activity_domain,
          legal_person: params.legal_person,
          new_password: params.new_password,
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
      let data = new FormData(); // creates a new FormData object
      data.append('username', params.username);
      data.append('name', params.name);
      data.append('email', params.email);
      data.append('main_interest', params.main_interest);
      data.append('birth_date', params.birth_date);
      data.append('summary', params.summary);
      data.append('address', params.address);
      data.append('password', params.password);
      data.append('gender', params.gender);
      data.append('years_of_experience', params.years_of_experience);
      data.append('profile_picture', params.fileObject);
      return client.request({
        method: 'post',
        url: 'api/volunteer_user/',
        data,
      });
    },
    getProfile(params) {
      return client.request({
        method: 'get',
        url: 'api/profile_volunteer/',
        headers: { Authorization: `Token ${localStorage.token}` },
      });
    },
    deleteProfile(params) {
      return client.request({
        method: 'delete',
        url: 'api/profile_volunteer/',
        headers: { Authorization: `Token ${localStorage.token}` },
      });
    },
    giveUpNgo(params) {
      return client.request({
        method: 'put',
        url: 'api/profile_volunteer/',
        headers: { Authorization: `Token ${localStorage.token}` },
        data: {
          password: params.password,
          give_up: true,
        },
      });
    },
    updateProfile(params) {
      let data = new FormData(); // creates a new FormData object
      data.append('new_password', params.new_password);
      data.append('name', params.name);
      data.append('email', params.email);
      data.append('main_interest', params.main_interest);
      data.append('summary', params.summary);
      data.append('address', params.address);
      data.append('password', params.password);
      data.append('gender', params.gender);
      data.append('years_of_experience', params.years_of_experience);
      params.fileObject && data.append('profile_picture', params.fileObject);
      return client.request({
        method: 'put',
        url: 'api/profile_volunteer/',
        headers: {
          Authorization: `Token ${localStorage.token}`,
        },
        data,
      });
    },
  };
  const project = {
    getApp(params) {
      return client.request({
        method: 'get',
        url: params.url,
        headers: { Authorization: `Token ${localStorage.token}` },
        data: {
          id: params.id,
        },
      });
    },
    deleteProject(params) {
      return client.request({
        method: 'delete',
        url: `api/project/${params.id}`,
        headers: { Authorization: `Token ${localStorage.token}` },
        // data:{
        //   id:params.id
        // }
      });
    },
    addProject(params) {
      return client.request({
        method: 'post',
        url: 'api/project/',
        headers: { Authorization: `Token ${localStorage.token}` },
        data: {
          ngo: localStorage.getItem('ngo'),
          location: params.location,
          name: params.name,
          participant_number: params.participant_number,
          food_ensured: params.food_ensured,
          accommodation_ensured: params.accommodation_ensured,
          start_date: params.start_date,
          end_date: params.end_date,
          application_deadline: params.application_deadline,
          participation_fee: params.participation_fee,
          description: params.description,
        },
      });
    },
    updateProject(params) {
      return client.request({
        method: 'put',
        url: `api/project/${params.update_id}/`,
        headers: { Authorization: `Token ${localStorage.token}` },
        data: {
          location: params.location,
          name: params.name,
          participant_number: params.participant_number,
          food_ensured: params.food_ensured,
          accommodation_ensured: params.accommodation_ensured,
          start_date: params.start_date,
          end_date: params.end_date,
          application_deadline: params.application_deadline,
          participation_fee: params.participation_fee,
          description: params.description,
        },
      });
    },
    apply(params) {
      return client.request({
        method: 'post',
        url: 'api/project_application/',
        headers: { Authorization: `Token ${localStorage.token}` },
        data: {
          id: params,
        },
      });
    },
  };
  return {
    getAll,
    user,
    new_ngo,
    new_volunteer,
    project,
    accept,
    refuse,
    giveUp,
    apply,
  };
};
