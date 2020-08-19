import axios from 'axios';

const API_URL = 'http://localhost:3001/'

async function getAllClients() {
  const res = await axios.get(`${API_URL}clients`);
  return res.data.clients;
};

async function getAllOrders() {
  const res = await axios.get(`${API_URL}orders`);
  return res.data.orders;
};

async function submitClient({ values }) {

  await axios.post(`${API_URL}cadastrarcli`, values)
  const res = await axios.get(`${API_URL}clients`);
  return res.data.clients;
};

async function submitOrder({ values }) {

  await axios.post(`${API_URL}cadastrarped`, values)
  const res = await axios.get(`${API_URL}orders`);
  return res.data.orders;
};

export { getAllClients, getAllOrders, submitClient, submitOrder };