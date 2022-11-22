<template>
    <header>
        <h1>
            <router-link to="/">
                <img class="btn-home" src="../assets/logo.png" alt="">
            </router-link>
        </h1>
        <button class="button" @click="alterarTema">
            {{ textoTema }}
        </button>
        <nav class="mt-5">
            <ul class="painel">
                <li>
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </router-link>
                </li>
                <li>
                    <router-link to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "BarraLateral",
    emits: ["temaAlterado"],
    methods: {
        alterarTema() {
            this.modoEscuro = !this.modoEscuro
            this.$emit("temaAlterado", this.modoEscuro)
        }
    },
    computed: {
        textoTema(): string {
            if (this.modoEscuro) {
                return "Desativar Modo Escuro!"
            }
            return "Ativar Modo Escuro!"
        }
    },
    data() {
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

.btn-home {
    transition: 100ms;
}

.btn-home:hover {
    transform: scale(1.05);
    transition: 100ms;
}

.painel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

nav {
    width: 100%;
}

.painel li {
    margin: 8px 0;
}

.link {
    color: #fff;
}

.link:hover {
    color: #FAF0CA;
}

.link.router-link-active {
    color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
    .painel {
        flex-direction: row;
        justify-content: space-around;
    }
}
</style>