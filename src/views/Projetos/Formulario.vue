<template>
    <form @submit.prevent="salvarProjeto">
        <div class="field">
            <label for="nomeDoProjeto" class="label">
                Nome do Projeto
            </label>
            <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
        </div>
        <div class="field">
            <button class="button" type="submit" :disabled="!nomeDoProjeto">
                Salvar
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from "@/store"
import { TipoNotificacoes } from '@/interfaces/NotificacoesInterface';
// import { NotificacaoMixin } from "@/mixins/Notificar"
import { PUT_PROJETO, POST_PROJETO } from '@/store/actions';
import ProjetoInterface from '@/interfaces/ProjetoInterface';
import useNotificador from "@/hooks/Notificador"
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String
        }
    },
    setup(props) {

        const router = useRouter()

        const store = useStore()
        const nomeDoProjeto = ref("")
        const { notificar } = useNotificador()


        if (props.id) {
            const projeto = store.state.projetoState.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || ""
        }

        const getProjetoLocalObject = function (): ProjetoInterface {
            let projetoLocal
            if (props.id) {
                projetoLocal = {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }
            } else {
                projetoLocal = {
                    id: new Date().toISOString(),
                    nome: nomeDoProjeto.value
                }
            }
            return projetoLocal
        }


        const salvarProjeto = () => {
            if (props.id) {
                store.dispatch(PUT_PROJETO, getProjetoLocalObject())
                    .then(() => notificarSucesso())
            } else {
                store.dispatch(POST_PROJETO, getProjetoLocalObject())
                    .then(() => notificarSucesso())
            }
        }

        const notificarSucesso = () =>{
            notificar(TipoNotificacoes.SUCESSO, "Sucesso", "O Projeto foi salvo com sucesso!")
            router.push("/projetos")
        }

        return {
            nomeDoProjeto,
            salvarProjeto
        }
    }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>