import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// ESTA LINHA ABAIXO É OBRIGATÓRIA E DEVE SER EXATAMENTE ASSIM:
export default api;