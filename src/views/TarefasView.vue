<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        
        <Box v-if="listaVazia">
            Adicione Alguma Tarefa!!!
        </Box>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
  import Box from '@/components/Tarefas/Box.vue';
  import Formulario from "@/components/Tarefas/Formulario.vue";
  import Tarefa from '@/components/Tarefas/Tarefa.vue';
  import TarefaInterface from '../interfaces/TarefaInterface';
  
  export default defineComponent({
    name: 'App',
    components: {
      Formulario,
      Tarefa,
      Box
    },
    data() {
      return {
        tarefas: [] as Array<TarefaInterface>
      }
    },
    computed: {
      listaVazia (): boolean {
        return this.tarefas.length === 0
      }
    },
    methods: {
      salvarTarefa(tarefa: TarefaInterface) {
        this.tarefas.push(tarefa)
      }
    }
  });
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>