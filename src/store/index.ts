import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { ADICIONA_TAREFA, EDITA_TAREFA, LISTA_TAREFAS, NOTIFICAR } from "./mutations";
import NotificacoesInterface from "@/interfaces/NotificacoesInterface";
import { GET_TAREFAS, POST_TAREFA, PUT_TAREFA } from "./actions";
import http from "@/http"
import { ProjetoEstado, projetoState } from "./modulos/projetos";

export interface Estado {
    tarefas: TarefaInterface[]
    notificacoes: NotificacoesInterface[]
    projetoState: ProjetoEstado
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projetoState: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, notificacao: NotificacoesInterface) {
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notif => notif.id != notificacao.id)
            }, 1000)
        },
        [ADICIONA_TAREFA](state, tarefa: TarefaInterface) {
            state.tarefas.push(tarefa)
        },
        [LISTA_TAREFAS](state, tarefas: TarefaInterface[]) {
            state.tarefas = tarefas
        },
        [EDITA_TAREFA](state, tarefa: TarefaInterface) {
            const index = state.tarefas.findIndex(taref => taref.id === tarefa.id)
            state.tarefas[index] = tarefa
        }
    },
    actions: {
        [GET_TAREFAS]({ commit }) {
            http.get("tarefas")
                .then(resposta => commit(LISTA_TAREFAS, resposta.data))
        },
        [POST_TAREFA]({ commit }, tarefa: TarefaInterface) {
            http.post("tarefas", tarefa)
                .then(response => commit(ADICIONA_TAREFA, response.data))
        },
        [PUT_TAREFA]({ commit }, tarefa: TarefaInterface) {
            http.put(`tarefas/${tarefa.id}`, tarefa)
                .then(response => commit(EDITA_TAREFA, response.data))
        }
    },
    modules: {
        projetoState
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}