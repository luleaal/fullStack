// services/phonebook.js

import axios from 'axios';

const baseUrl = 'https://phonebook-render-front.onrender.com/' 

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

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
