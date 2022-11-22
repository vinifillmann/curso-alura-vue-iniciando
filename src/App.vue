<template>
  <main class="columns is-gapless is-multiline mb-0" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @temaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "@/components/BarraLateral.vue"

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral
  },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  methods: {
    trocarTema(modoEscuro: boolean) {
      this.modoEscuroAtivo = modoEscuro
    }
  }
});
</script>

<style scoped>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}
main.modo-escuro {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}
.conteudo {
  background-color: var(--bg-primary);
}
</style>
