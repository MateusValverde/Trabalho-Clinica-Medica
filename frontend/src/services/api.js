import axios from 'axios';

const api = axios.create({
  // Agora o seu site vai falar com o servidor real na nuvem!
  baseURL: 'https://trabalho-clinica-medica.onrender.com/api'
});

export default api;