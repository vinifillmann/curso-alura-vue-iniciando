<template>
    <router-link to="/projetos/novo" class="button">
        <span class="icon is-small">
            <i class="fas fa-plus"></i>
        </span>
        <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Nome
                </th>
                <th>
                    Ações
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{ projeto.nome }}</td>
                <td>
                    <router-link :to="`/projetos/${projeto.id}`" class="button">
                        <span class="icon is-small">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </router-link>
                    <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                        <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from "@/store"
import { DELETE_PROJETO, GET_PROJETOS } from '@/store/actions';

export default defineComponent({
    name: "Lista",
    methods: {
        excluir(id: string) {
            this.store.dispatch(DELETE_PROJETO, (this.projetos.filter(proj => proj.id == id))[0])
            this.store.dispatch(GET_PROJETOS)
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_PROJETOS)
        return {
            store,
            projetos: computed(() => store.state.projetoState.projetos)
        }
    }
})
</script>