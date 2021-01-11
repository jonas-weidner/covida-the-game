<template>
    <div class="mt-8">
        <h2 class="text-2xl font-bold text-center">Ablegestapel</h2>
        <div class="h-48 px-9 pt-3 overflow-y-scroll">
            <div class="rounded bg-gray-200 font-semibold py-2 px-3 mb-2" v-for="(card, index) in
            playerDiscardPile"
                 :key="index">
                <div v-if="card.type === 'CITY'" class="flex items-center">
                    <div :class="regionClass(card.city.region)" />
                    <div class="pl-3">{{ card.city.city }}</div>
                </div>
                <div v-if="card.type === 'ACTION'" class="flex items-center">
                    <div class="region"></div>
                    <action-popup :action="card.action"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { Region } from "@/types";
export default Vue.extend({
    props: ["playerDiscardPile"],
    methods: {
        regionClass(region: Region): string {
            return `region rounded-full ${region}`;
        }
    }
});
</script>

<style scoped>
.region {
    height: 8px;
    width: 8px;
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
