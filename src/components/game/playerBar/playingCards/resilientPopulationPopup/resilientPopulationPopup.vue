<template>
    <div>
        <c-modal
            :is-open="isOpen"
            :on-close="close"
            :closeOnOverlayClick="false"
            :closeOnEsc="false"
        >
            <c-modal-content ref="content">
                <c-modal-header>Zähe Bevölkerung</c-modal-header>
                    <c-modal-body class="mb-4">
                        <div class="pt-1 overflow-y-scroll">
                            <div
                                class="rounded bg-gray-200 font-semibold mb-1"
                                v-for="(card, index) in sortedDiscardPile" :key="card.city"
                            >
                                <div class="flex items-center justify-between relative">
                                    <div :class="regionClass(card.region)" />
                                    <div class="w-4/5 pl-8 text-sm text-left py-1">{{ card.city }}</div>
                                    <c-icon-button
                                        variant-color="blue"
                                        aria-label="Karte entfernen"
                                        size="sm"
                                        icon="small-close"
                                        @click="removeCard(index)"
                                    />
                                </div>

                            </div>
                        </div>
                    </c-modal-body>
            </c-modal-content>
            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Game, Region } from "@/types";
import { initializeInfectionDiscardPile } from "@/services/firebase";

@Component
export default class ResilientPopulationPopup extends Vue {
    @Prop({ required: true }) readonly game!: Game;

    get sortedDiscardPile() {
        return this.game.infectionDiscardPile;
    }

    public isOpen = false;
    public open() { this.isOpen = true; }
    public close() { this.isOpen = false; }

    public regionClass(region: Region): string {
        return `region rounded text-left ${region}`;
    }

    public async removeCard(index: number): Promise<void> {
        const newDiscardPile = [...this.game.infectionDiscardPile];
        newDiscardPile.splice(index, 1);
        await initializeInfectionDiscardPile(newDiscardPile);
        this.close();
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
