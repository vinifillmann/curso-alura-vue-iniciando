import ProjetoInterface from "@/interfaces/ProjetoInterface";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, EDITA_PROJETO, EXCLUI_PROJETO, LISTA_PROJETOS, LISTA_TAREFAS, NOTIFICAR } from "./mutations";
import NotificacoesInterface from "@/interfaces/NotificacoesInterface";
import { DELETE_PROJETO, GET_PROJETOS, GET_TAREFAS, POST_PROJETO, PUT_PROJETO } from "./actions";
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
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}