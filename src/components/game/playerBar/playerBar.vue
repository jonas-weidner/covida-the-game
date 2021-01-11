<template>
    <div class="flex justify-center h-full w-full">
        <div v-for="player in game.players"
             :key="player.id"
             class="mx-3 w-1/4 px-5 py-1 border-2 border-solid
             border-black shadow-lg overflow-hidden"
        >
            <div class="flex w-full justify-between">
                <p class="font-bold text-xl">{{ player.name }}</p>
                <role-popup :player="player" />
            </div>

            <div class="pt-2 h-36 overflow-y-scroll">
                <div class="rounded bg-gray-200 font-semibold py-2 px-3 mb-2"
                     v-for="(card, index) in player.playingCards" :key="index">
                    <div v-if="card.type === 'CITY'" class="flex items-center">
                        <div :class="regionClass(card.city.region)" />
                        <div class="w-1/3 pl-3">{{ card.city.city }}</div>
                        <div class="w-1/4 text-gray-400">
                            {{ population(card.city.population) }}
                        </div>
                        <div class="w-1/4 cursor-pointer" @click="playHandCard(card)">
                            Karte spielen
                        </div>
                    </div>
                    <div v-if="card.type === 'ACTION'" class="flex items-center">
                        <div class="region"></div>
                        <div class="w-1/3">
                            <action-popup :action="card.action"/>
                        </div>
                        <div class="w-1/4"/>
                        <div class="w-1/4 cursor-pointer" @click="playHandCard(card)">
                            Karte spielen
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import RolePopup from "./rolePopup";
import ActionPopup from "./actionPopup";
import numeral from "numeral";
import { PlayingCard, Region } from "@/types";
import { playHandCard } from "@/services/firebase";
export default Vue.extend({
    components: {
        RolePopup,
        ActionPopup
    },
    props: ["game"],
    methods: {
        regionClass(region: Region): string {
            return `region rounded-full ${region}`;
        },
        population(pop: number): string {
            return numeral(pop).format("'0.0a'");
        },
        async playHandCard(card: PlayingCard): Promise<void> {
            return await playHandCard(card);
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
