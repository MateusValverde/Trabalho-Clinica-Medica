<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-50 p-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Criar Nova Conta</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input type="text" v-model="nome" required class="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 border-blue-500 shadow-sm" placeholder="João Silva">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" v-model="email" required class="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 border-blue-500 shadow-sm" placeholder="exemplo@clinica.com">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" v-model="password" required class="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 border-blue-500 shadow-sm" placeholder="******">
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
          <select v-model="role" class="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 border-blue-500 shadow-sm">
            <option value="paciente">Paciente</option>
            <option value="secretario">Secretário(a)</option>
          </select>
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-bold text-lg shadow-md">
          Cadastrar
        </button>
      </form>
      
      <p class="mt-4 text-center text-sm text-gray-600">
        Já tem conta? <router-link to="/" class="text-blue-600 hover:underline font-semibold">Faça Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api' // Importa o serviço que criamos

const nome = ref('')
const email = ref('')
const password = ref('')
const role = ref('paciente')
const router = useRouter()

const handleRegister = async () => {
  try {
    const response = await api.post('/auth/register', {
      nome: nome.value,
      email: email.value,
      password: password.value,
      role: role.value
    });

    alert("Cadastro realizado com sucesso!");
    router.push('/'); // Redireciona para o Login
  } catch (error) {
    // Se o backend enviar um erro (ex: e-mail já existe), mostramos aqui
    alert(error.response?.data?.msg || "Erro ao cadastrar");
  }
}
</script>