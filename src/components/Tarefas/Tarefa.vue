<template>
    <Box>
        <div class="columns clicavel" @click="() => { $emit('tarefaClickada', tarefa) }">
            <div class="column is-5">
                {{ tarefa.descricao || "Tarefa Sem Descrição" }}
            </div>
            <div class="column">
                {{ tarefa.projeto.nome }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import Cronometro from './Cronometro.vue';
import { defineComponent, PropType } from 'vue';
import TarefaInterface from '@/interfaces/TarefaInterface';
import Box from './Box.vue';

export default defineComponent({
    name: "Tarefa",
    components: {
        Cronometro,
        Box
    },
    props: {
        tarefa: {
            type: Object as PropType<TarefaInterface>,
            required: true
        }
    },
    emits: ["tarefaClickada"]
})
</script>

<style scoped>
.clicavel {
    cursor: pointer;
}
</style>