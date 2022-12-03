import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import TarefasView from "../views/TarefasView.vue"
import ProjetosView from "../views/ProjetosView.vue"
import Formulario from "@/views/Projetos/Formulario.vue"
import Lista from "@/views/Projetos/Lista.vue"

const rotas: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Tarefas",
        component: TarefasView
    },
    {
        path: "/projetos",
        component: ProjetosView,
        children: [
            {
                path: "",
                name: "Projetos",
                component: Lista
            },
            {
                path: "novo",
                name: "NovoProjeto",
                component: Formulario
            },
            {
                path: ":id",
                name: "EditarProjeto",
                component: Formulario,
                props: true
            },
        ]
    }
]

const roteador = createRouter({
    history: createWebHistory(),
    routes: rotas
})

export default roteador
