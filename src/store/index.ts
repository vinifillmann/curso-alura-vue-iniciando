import ProjetoInterface from "@/interfaces/ProjetoInterface";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, EDITA_PROJETO, EDITA_TAREFA, EXCLUI_PROJETO, LISTA_PROJETOS, LISTA_TAREFAS, NOTIFICAR } from "./mutations";
import NotificacoesInterface from "@/interfaces/NotificacoesInterface";
import { DELETE_PROJETO, GET_PROJETOS, GET_TAREFAS, POST_PROJETO, POST_TAREFA, PUT_PROJETO, PUT_TAREFA } from "./actions";
import http from "@/http"

interface Estado {
    projetos: ProjetoInterface[]
    tarefas: TarefaInterface[]
    notificacoes: NotificacoesInterface[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, projeto: ProjetoInterface) {
            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, projeto: ProjetoInterface) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUI_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [LISTA_PROJETOS](state, projetos: ProjetoInterface[]) {
            state.projetos = projetos
        },
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
        [GET_PROJETOS]({ commit }) {
            http.get("projetos")
                .then(resposta => commit(LISTA_PROJETOS, resposta.data))
        },
        [POST_PROJETO](context, projeto: ProjetoInterface) {
            return http.post("projetos", projeto)
        },
        [PUT_PROJETO](context, projeto: ProjetoInterface) {
            return http.put(`projetos/${projeto.id}`, projeto)
        },
        [DELETE_PROJETO](context, projeto: ProjetoInterface) {
            return http.delete(`projetos/${projeto.id}`)
        },
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
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}