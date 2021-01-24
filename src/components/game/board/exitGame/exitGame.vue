<template>
    <div>
        <c-tooltip has-arrow label="Exit game" placement="right">
            <c-icon-button
                :isRound="true"
                variant-color="red"
                bg="red.700"
                color="white"
                size="sm"
                icon="sign-out-alt"
                aria-label="Exit game"
                @click="exitGame"
            />
        </c-tooltip>
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
