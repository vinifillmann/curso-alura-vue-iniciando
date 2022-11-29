<template>
  <Formulario />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />

    <Box v-if="listaVazia">
      Adicione Alguma Tarefa!!!
    </Box>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Box from '@/components/Tarefas/Box.vue';
import Formulario from "@/components/Tarefas/Formulario.vue";
import Tarefa from '@/components/Tarefas/Tarefa.vue';
import { useStore } from '@/store';
import { GET_TAREFAS } from '@/store/actions';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(GET_TAREFAS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>