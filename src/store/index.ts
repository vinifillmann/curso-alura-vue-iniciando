import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./mutations";
import NotificacoesInterface from "@/interfaces/NotificacoesInterface";
import { ProjetoEstado, projetoState } from "./modulos/projetos";
import { TarefaEstado, tarefaState } from "./modulos/tarefas";

export interface Estado {
    notificacoes: NotificacoesInterface[]
    tarefaState: TarefaEstado
    projetoState: ProjetoEstado
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefaState: {
            tarefas: []
        },
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
        }
    },
    modules: {
        projetoState,
        tarefaState
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}