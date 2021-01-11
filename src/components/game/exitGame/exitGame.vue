<template>
    <div>
        <c-button variant-color="blue" size="md" @click="exitGame">
            Spiel verlassen
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { exitGame } from "@/services/firebase";
export default Vue.extend({
    methods: {
        async exitGame() {
            await exitGame();
            await this.$router.push({ name: "Menu" });
        }
    }
});
</script>
