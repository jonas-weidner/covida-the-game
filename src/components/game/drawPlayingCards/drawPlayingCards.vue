<template>
    <div class="mt-8">
        <c-button variant-color="blue" size="md" @click="drawPlayingCards">
            2 Spielerkarten ziehen
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { drawPlayingCards } from "@/services/firebase";
export default Vue.extend({
    methods: {
        async drawPlayingCards(): Promise<void> {
            return await drawPlayingCards();
        }
    }
});
</script>
