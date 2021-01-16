<template>
    <div class="mt-5 flex flex-col">
        <c-button variant-color="blue" size="sm" @click="drawInfectionCard">
            <div class="text-xxs">Infektionskarte ziehen</div>
        </c-button>

        <c-button class="mt-1" size="sm" @click="drawInfectionCard(true)">
            <div class="text-xxs">Letzte Infektionskarte ziehen</div>
        </c-button>

        <c-button class="mt-1" variant-color="blue" size="sm" @click="shuffleAndBackOnTop">
            <div class="text-xxs">Mischen und zurück</div>
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { drawInfectionCard, shuffleAndBackOnTop } from "@/services/firebase";

@Component
export default class DrawInfectionCard extends Vue {
    public async drawInfectionCard(last?: boolean): Promise<void> {
        await drawInfectionCard(last);
    }

    public async shuffleAndBackOnTop(): Promise<void> {
        await shuffleAndBackOnTop();
    }
}
</script>
