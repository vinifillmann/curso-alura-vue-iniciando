import http from "@/http";
import ProjetoInterface from "@/interfaces/ProjetoInterface";
import { Estado } from "@/store";
import { GET_PROJETOS, POST_PROJETO, PUT_PROJETO, DELETE_PROJETO } from "@/store/actions";
import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUI_PROJETO, LISTA_PROJETOS } from "@/store/mutations";
import { Module } from "vuex";

export interface ProjetoEstado {
    projetos: ProjetoInterface[]
}

export const projetoState: Module<ProjetoEstado, Estado> = {
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
        }
    },
    getters: {
        projetos(state) {
            return state.projetos
        }
    }
}