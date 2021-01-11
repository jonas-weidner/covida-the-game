<template>
    <div class="text-center mt-8">
        <h2 class="text-2xl font-bold text-center">Ausbrüche</h2>
        <div class="flex items-center justify-center space-x-5">
            <p class="text-6xl font-bold text-center text-blue-600">
                {{ game.outbreaks }}
            </p>
            <div class="flex justify-around items-center space-x-3">
                <c-icon-button
                    variant-color="blue"
                    aria-label="Verringern"
                    size="md"
                    icon="minus"
                    @click="removeOutbreak"
                />

                <c-icon-button
                    variant-color="blue"
                    aria-label="Erhöhen"
                    size="md"
                    icon="add"
                    @click="addOutbreak"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { addOutbreak, removeOutbreak } from "@/services/firebase";
export default Vue.extend({
    props: ["game"],
    methods: {
        async removeOutbreak() {
            await removeOutbreak();
        },
        async addOutbreak() {
            await addOutbreak();
        }
    }

});
</script>
