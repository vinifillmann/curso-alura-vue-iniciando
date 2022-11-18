<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || "Tarefa Sem Descrição" }}
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
    }
})
</script>

<style scoped>
</style>