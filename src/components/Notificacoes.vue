<template>
    <div class="notificacoes">
        <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';
import { defineComponent } from 'vue';
import { TipoNotificacoes } from "@/interfaces/NotificacoesInterface"


export default defineComponent({
    name: "Notificacoes",
    data() {
        return {
            contexto: {
                [TipoNotificacoes.SUCESSO]: "is-success",
                [TipoNotificacoes.FALHA]: "is-danger",
                [TipoNotificacoes.ATENCAO]: "is-warning"
            }
        }
    },
    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 18px;
    z-index: 1;
}
</style>