import TarefaInterface from "@/interfaces/TarefaInterface";
import { Estado } from "@/store";
import { Module } from "vuex";
import http from "@/http"
import { GET_TAREFAS, POST_TAREFA, PUT_TAREFA } from "@/store/actions";
import { ADICIONA_TAREFA, LISTA_TAREFAS, EDITA_TAREFA } from "@/store/mutations";


export interface TarefaEstado {
    tarefas: TarefaInterface[]
}

export const tarefaState: Module<TarefaEstado, Estado> = {
    mutations: {
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
        [GET_TAREFAS]({ commit }, filtro?: string) {
            let url = "tarefas"
            if (filtro) {
                url += "?descricao=" + filtro
            }
            http.get(url)
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
}