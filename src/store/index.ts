import ProjetoInterface from "@/interfaces/ProjetoInterface";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, EDITA_PROJETO, EXCLUI_PROJETO, NOTIFICAR } from "./mutations";
import NotificacoesInterface from "@/interfaces/NotificacoesInterface";

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
        [NOTIFICAR](state, notificacao: NotificacoesInterface) {
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notif => notif.id != notificacao.id)
            }, 1000)
        },
        [ADICIONA_TAREFA](state, tarefa: TarefaInterface) {
            state.tarefas.push(tarefa)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}