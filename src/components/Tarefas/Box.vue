<template>
    <div class="box has-text-weight-bold" :style="estiloBox">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Box",
    data () {
        return {
            estiloBox: {
                backgroundColor: "#BEBEBE"
            }
        }
    }
})
</script>