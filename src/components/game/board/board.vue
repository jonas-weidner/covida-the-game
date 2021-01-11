<template>
        <panZoom>
            <div class="flex justify-center items-center">
                <img src="@/assets/world-map.svg" width="80%" />
            </div>
        </panZoom>
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
