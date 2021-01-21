<template>
    <div class="mt-5">
        <h2 class="text-lg font-bold text-center">Infektionsablegestapel</h2>
        <div class="max-h-24 pt-1 overflow-y-scroll">
            <div v-if="sortedDiscardPile.length === 0" class="text-xs text-gray-700">
                Keine Karten im Ablegestapel
            </div>
            <div
                class="rounded bg-gray-200 font-semibold mb-1"
                v-for="(card) in sortedDiscardPile" :key="card.city"
            >
                <div class="flex items-center relative">
                    <div :class="regionClass(card.region)" />
                    <div class="pl-8 text-sm text-left">{{ card.city }}</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CityCard, Region } from "@/types";

@Component
export default class InfectionDiscardPile extends Vue {
    @Prop({ default: () => [] }) discardPile!: CityCard[];

    get sortedDiscardPile() {
        return JSON.parse(JSON.stringify(this.discardPile)).reverse();
    }

    public regionClass(region: Region): string {
        return `region rounded text-left ${region}`;
    }
}
</script>

<style scoped>
.region {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20px;
}

.BLUE {
    background-color: blue;
}

.RED {
    background-color: red;
}

.YELLOW {
    background-color: #ffd500;
}

.BLACK {
    background-color: black;
}
</style>
