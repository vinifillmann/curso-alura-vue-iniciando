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
import { defineComponent } from 'vue';
import { useStore } from "@/store"
import { ADICIONA_PROJETO, EDITA_PROJETO } from '@/store/mutations';
import { TipoNotificacoes } from '@/interfaces/NotificacoesInterface';
import { NotificacaoMixin } from "@/mixins/Notificar"
// import useNotificador from "@/hooks/Notificador"

export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String
        }
    },
    mixins: [NotificacaoMixin],
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ""
        }
    },
    data() {
        return {
            nomeDoProjeto: ""
        }
    },
    computed: {
        projetoLocalObject() {
            let projetoLocal
            if (this.id) {
                projetoLocal = {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }
            } else {
                projetoLocal = {
                    id: new Date().toISOString(),
                    nome: this.nomeDoProjeto
                }
            }
            return projetoLocal
        }
    },
    methods: {
        salvarProjeto(): void {
            if (this.id) {
                this.store.commit(EDITA_PROJETO, this.projetoLocalObject)
            } else {
                this.store.commit(ADICIONA_PROJETO, this.projetoLocalObject)
            }
            this.nomeDoProjeto = ""
            this.notificar(TipoNotificacoes.SUCESSO, "Sucesso", "O Projeto foi cadastrado com sucesso!")
            this.$router.push("/projetos")
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>

<style scoped>
.projetos {
    padding: 1.25rem;
}
</style>