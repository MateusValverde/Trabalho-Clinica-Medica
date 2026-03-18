import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Agendamento from '../views/Agendamento.vue'
import Admin from '../views/Admin.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/cadastro', name: 'Cadastro', component: Cadastro },
  { path: '/agendar', name: 'Agendamento', component: Agendamento },
  { path: '/admin', name: 'Admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router