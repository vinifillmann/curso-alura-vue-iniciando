import ProjetoInterface from "@/interfaces/ProjetoInterface";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import TarefaInterface from "@/interfaces/TarefaInterface";

interface Estado {
    projetos: ProjetoInterface[]
    tarefas: TarefaInterface[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: []
    },
    mutations: {
        "ADICIONA_PROJETO"(state, projeto: ProjetoInterface) {
            state.projetos.push(projeto)
        },
        "EDITA_PROJETO"(state, projeto: ProjetoInterface) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        "ADICIONA_TAREFA"(state, tarefa: TarefaInterface) {
            state.tarefas.push(tarefa)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}