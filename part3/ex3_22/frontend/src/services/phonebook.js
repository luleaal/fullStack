// services/phonebook.js

import axios from 'axios';

const baseUrl = '/api/persons'; 

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const update = (person, id) => {
  return axios.put(`${baseUrl}/${id}`, person).then(response => response)
}

const eliminate = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAll,
  create,
  eliminate,
  update,
};
