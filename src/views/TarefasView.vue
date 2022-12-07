<template>
  <Formulario />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @tarefaClickada="selecionarTarefa" />

    <Box v-if="listaVazia">
      <span v-if="!filtro">Adicione Alguma Tarefa!!!</span>
      <span v-else>Nenhuma Tarefa Encontrada!!!</span>
    </Box>

    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:header>
        <p class="modal-card-title">Editando Tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição
          </label>
          <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" maxlength="45"
            @keypress="(event) => { if (event.key == 'Enter') { editarTarefa() } }">
        </div>
      </template>
      <template v-slot:footer>
        <button class="button is-success" :disabled="!tarefaSelecionada.descricao" @click="editarTarefa">Salvar
          alterações</button>
        <button class="button" @click="fecharModal">Cancelar</button>
        </template>
    </Modal>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Box from '@/components/Tarefas/Box.vue';
import Formulario from "@/components/Tarefas/Formulario.vue";
import Tarefa from '@/components/Tarefas/Tarefa.vue';
import Modal from '@/components/Tarefas/Modal.vue';
import { useStore } from '@/store';
import { GET_PROJETOS, GET_TAREFAS, PUT_TAREFA } from '@/store/actions';
import TarefaInterface from '@/interfaces/TarefaInterface';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal
  },
  data() {
    return {
      tarefaSelecionada: null as TarefaInterface | null
    }
  },
  computed: {
    listaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(GET_TAREFAS)
    store.dispatch(GET_PROJETOS)

    const filtro = ref("")

    const tarefas = computed(() => store.state.tarefaState.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)))

    watchEffect(() => {
      store.dispatch(GET_TAREFAS)
      filtro.value
    })

    return {
      tarefas,
      store,
      filtro
    }
  },
  methods: {
    selecionarTarefa(tarefa: TarefaInterface): void {
      this.tarefaSelecionada = tarefa
    },
    fecharModal(): void {
      this.tarefaSelecionada = null
      this.store.dispatch(GET_TAREFAS)
    },
    editarTarefa(): void {
      this.store.dispatch(PUT_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  }
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
</style>