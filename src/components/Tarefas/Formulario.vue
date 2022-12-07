<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para ciração de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { TipoNotificacoes } from '@/interfaces/NotificacoesInterface';
import { key } from '@/store';
import { POST_TAREFA } from '@/store/actions';
import { NOTIFICAR } from '@/store/mutations';
import { computed, ref } from 'vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Temporizador from './Temporizador.vue';

export default defineComponent({
    name: "Formulario",
    components: {
        Temporizador
    },
    setup() {
        
        const store = useStore(key)

        const descricao = ref("")
        const idProjeto = ref("")
        const projetos = computed(() => store.state.projetoState.projetos)

        const finalizarTarefa = (tempoDecorrido: number) => {
            const projeto = projetos.value.find(proj => proj.id == idProjeto.value)
            if (!projeto) {
                store.commit(NOTIFICAR, {
                    titulo: "Erro",
                    texto: "Nenhum projeto selecionado!!!",
                    tipo: TipoNotificacoes.FALHA
                })
                return
            }
            store.dispatch(POST_TAREFA, {
                id: new Date().toISOString(),
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            if (!descricao.value) {
                store.commit(NOTIFICAR, {
                    titulo: "Cuidado",
                    texto: "Lembre-se de colocar uma descrição!!!",
                    tipo: TipoNotificacoes.ATENCAO
                })
            }
            descricao.value = ""
        }

        return {
            projetos,
            descricao,
            idProjeto,
            finalizarTarefa
        }
    }
})
</script>
<style>
.formulario {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}
</style>