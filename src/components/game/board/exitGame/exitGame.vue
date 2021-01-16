<template>
    <div>
        <c-button variant-color="blue" size="sm" @click="exitGame">
            <div class="text-xs">Spiel verlassen</div>
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
