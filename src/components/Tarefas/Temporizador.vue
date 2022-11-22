<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos" />
        <button class="button" @click="iniciarContagem()" :disabled="cronometroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizarContagem()" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
    name: "Temporizador",
    emits: ["aoTemporizadorFinalizado"],
    data () {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    components: {
        Cronometro
    },
    methods: {
        iniciarContagem () {
            if (this.cronometro === 0) {
                this.cronometro = setInterval(() => {
                    this.tempoEmSegundos += 1
                }, 1000)
                this.cronometroRodando = true
            }
        },
        finalizarContagem () {
            if (this.cronometro !== 0) {
                clearInterval(this.cronometro)
                this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos)
                this.tempoEmSegundos = 0
                this.cronometro = 0
                this.cronometroRodando = false
            }
        }
    }
})
</script>