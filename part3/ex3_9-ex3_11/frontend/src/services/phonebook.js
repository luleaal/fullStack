// services/phonebook.js

import axios from 'axios';

const baseUrl = '/api/persons' 

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const eliminate = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAll,
  create,
  eliminate,
};
