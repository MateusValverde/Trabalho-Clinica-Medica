<template>
  <div class="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
    <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-blue-700 mb-6 text-center">Agendar Consulta</h1>
      
      <form @submit.prevent="salvarAgendamento" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Data -->
          <div>
            <label class="block text-sm font-semibold text-gray-700">Data</label>
            <input type="date" v-model="form.data" required class="mt-1 w-full border border-gray-300 rounded p-2 focus:ring-blue-500 border-blue-500">
          </div>
          <!-- Hora -->
          <div>
            <label class="block text-sm font-semibold text-gray-700">Horário</label>
            <input type="time" v-model="form.hora" required class="mt-1 w-full border border-gray-300 rounded p-2 focus:ring-blue-500 border-blue-500">
          </div>
        </div>

        <!-- CEP -->
        <div>
          <label class="block text-sm font-semibold text-gray-700">CEP</label>
          <input type="text" v-model="form.cep" @blur="buscarEndereco" placeholder="00000000" maxlength="8" required class="mt-1 w-full border border-gray-300 rounded p-2 focus:ring-blue-500 border-blue-500">
        </div>

        <!-- Endereço -->
        <div>
          <label class="block text-sm font-semibold text-gray-700">Endereço (Automático)</label>
          <input type="text" v-model="form.endereco" readonly class="mt-1 w-full bg-gray-50 border border-gray-300 rounded p-2 text-gray-500">
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
          Confirmar Agendamento
        </button>
        
        <button @click="router.push('/')" type="button" class="w-full text-gray-500 text-sm hover:underline">
          Voltar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import axios from 'axios'

const router = useRouter()
const form = ref({
  data: '',
  hora: '',
  cep: '',
  endereco: ''
})

const buscarEndereco = async () => {
  if (form.value.cep.length === 8) {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${form.value.cep}/json/`)
      if (!res.data.erro) {
        form.value.endereco = `${res.data.logradouro}, ${res.data.bairro} - ${res.data.localidade}/${res.data.uf}`
      } else {
        alert("CEP não encontrado")
      }
    } catch (e) {
      console.error("Erro CEP")
    }
  }
}

const salvarAgendamento = async () => {
  try {
    // Verificamos se existe um usuário salvo no navegador
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : { nome: 'Paciente' };

    await api.post('/appointments/create', {
      ...form.value,
      nomePaciente: user.nome
    });

    alert("Consulta agendada com sucesso!");
    router.push('/'); 
  } catch (e) {
    alert("Erro ao conectar com o servidor. Verifique o backend.");
  }
}
</script>