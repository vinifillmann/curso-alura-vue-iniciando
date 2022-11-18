<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoTema }}
        </button>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "BarraLateral",
        emits: ["temaAlterado"],
        methods: {
            alterarTema () {
                this.modoEscuro = !this.modoEscuro
                this.$emit("temaAlterado", this.modoEscuro)
            }
        },
        computed: {
            textoTema (): string {
                if (this.modoEscuro) {
                    return "Desativar Modo Escuro!"
                }
                return "Ativar Modo Escuro!"
            }
        },
        data () {
            return {
                modoEscuro: false
            }
        }
    })
</script>

<style scoped>
    header {
        padding: 1rem;
        background-color: #0d3b66;
        width: 100%;
        height: 100vh;
        min-height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
</style>