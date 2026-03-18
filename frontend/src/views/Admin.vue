<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 class="text-3xl font-bold text-blue-800">Painel do Secretário 🏥</h1>
        <div class="flex gap-4">
          <button @click="carregarDados" class="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 font-semibold">
            🔄 Atualizar
          </button>
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition font-semibold">
            Sair
          </button>
        </div>
      </div>

      <!-- Tabela de Agendamentos -->
      <div class="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-blue-600 text-white text-sm uppercase">
              <tr>
                <th class="px-6 py-4">Paciente</th>
                <th class="px-6 py-4">Data/Hora</th>
                <th class="px-6 py-4">Endereço</th>
                <th class="px-6 py-4 text-center">Clima (Previsão)</th>
                <th class="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="agenda in agendamentos" :key="agenda._id" class="hover:bg-blue-50 transition">
                <td class="px-6 py-4 font-medium text-gray-800">{{ agenda.nomePaciente }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <div class="font-bold">{{ agenda.data }}</div>
                  <div class="text-xs">{{ agenda.hora }}</div>
                </td>
                <td class="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
                  {{ agenda.endereco }}
                </td>
                <td class="px-6 py-4 text-center">
                  <!-- Alerta de Clima (Requisito do TD) -->
                  <span 
                    :class="agenda.previsaoClima.includes('Chuva') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'"
                    class="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                  >
                    {{ agenda.previsaoClima }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <button class="text-red-500 hover:text-red-700 text-xs font-bold underline">
                    Cancelar
                  </button>
                </td>
              </tr>
              <tr v-if="agendamentos.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-gray-400">Nenhum agendamento encontrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const agendamentos = ref([])

const carregarDados = async () => {
  try {
    const response = await api.get('/appointments/all');
    agendamentos.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar dados");
  }
}

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/');
}

// Carrega os dados assim que a tela abre
onMounted(carregarDados)
</script>