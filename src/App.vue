<template>
  <main class="columns is-gapless is-multiline mb-0" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @temaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        
        <Box v-if="listaVazia">
          Adicione Alguma Tarefa!!!
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "./components/BarraLateral.vue"
import Box from './components/Box.vue';
import Formulario from "./components/Formulario.vue";
import Tarefa from './components/Tarefa.vue';
import TarefaInterface from './interfaces/TarefaInterface';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  data() {
    return {
      tarefas: [] as Array<TarefaInterface>,
      modoEscuroAtivo: false
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
    },
    trocarTema(modoEscuro: boolean) {
      this.modoEscuroAtivo = modoEscuro
    }
  }
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primary: #fff;
  --text-primary: #000;
}
main.modo-escuro {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}
.conteudo {
  background-color: var(--bg-primary);
}
</style>
