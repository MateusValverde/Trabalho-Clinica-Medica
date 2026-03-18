<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Clínica Médica - Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">E-mail</label>
          <input type="email" v-model="email" required class="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500" placeholder="seu@email.com">
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" v-model="password" required class="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500" placeholder="******">
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
          Entrar
        </button>
      </form>
      
      <p class="mt-4 text-center text-sm text-gray-500">
        Não tem conta? 
        <!-- AQUI ESTÁ A MUDANÇA: Troquei o <a> pelo <router-link> -->
        <router-link to="/cadastro" class="text-blue-600 hover:underline">Cadastre-se</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    // Salva o Token e os dados do usuário no localStorage (memória do navegador)
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    alert(`Bem-vindo, ${response.data.user.nome}!`);

    // Redireciona dependendo de quem logou (Requisito do TD)
    if (response.data.user.role === 'secretario') {
      router.push('/admin');
    } else {
      router.push('/agendar');
    }

  } catch (error) {
    alert(error.response?.data?.msg || "E-mail ou senha incorretos");
  }
}
</script>