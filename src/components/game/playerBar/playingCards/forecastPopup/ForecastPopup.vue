<template>
    <div>
        <c-modal
            :is-open="isOpen"
            :on-close="close"
            :closeOnOverlayClick="false"
            :closeOnEsc="false"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ $t('playerCards.forecast') }}</c-modal-header>
                <c-modal-close-button />
                <c-modal-body class="mb-4">
                    <div class="text-sm mb-3">{{ $t('playerCards.forecastDescription') }}</div>
                    <div class="flex items-center space-x-2">
                        <div class="font-bold text-xs">{{ $t('other.top') }}</div>
                        <c-icon name="arrow-down" size="12px" />
                    </div>
                    <Container @drop="onDrop" group-name="playingCards" :get-child-payload="getChildPayload">
                        <Draggable class="rounded bg-gray-200 font-semibold mt-1 overflow-hidden"
                                   v-for="(card, index) in firstSix" :key="index">
                            <div class="draggable-item cursor-pointer">
                                <div class="flex items-center relative py-1">
                                    <div :class="regionClass(card.region)" />
                                    <div class="pl-8 text-sm text-left">{{ card.city }}</div>
                                </div>
                            </div>
                        </Draggable>
                    </Container>
                </c-modal-body>
                <c-modal-footer class="flex justify-center">
                    <c-button variant-color="blue" mr="3" @click="close">
                        {{ $t('other.confirm') }}
                    </c-button>
                </c-modal-footer>
            </c-modal-content>
            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Container, Draggable } from "vue-smooth-dnd";
import { CityCard, Game, PlayingCard, Region } from "@/types";
import { applyDrag } from "@/services/dnd";
import { initializeInfectionDeck } from "@/services/firebase";

@Component({
    components: {
        Container,
        Draggable
    }
})
export default class ForecastPopup extends Vue {
    @Prop({ required: true }) readonly game!: Game;

    public firstSix: CityCard[] = [];

    @Watch("game", { immediate: true })
    onGameChange(game: Game) {
        if (this.firstSix.length === 0 && game.infectionDeck) {
            const reversed = JSON.parse(JSON.stringify(game.infectionDeck));
            this.firstSix = reversed.splice(reversed.length - 6).reverse();
        }
    }

    public isOpen = false;
    public open() { this.isOpen = true; }
    public async close() {
        this.isOpen = false;

        const reversedSix = JSON.parse(JSON.stringify(this.firstSix)).reverse();
        let global = JSON.parse(JSON.stringify(this.game.infectionDeck));
        global.splice(global.length - 6).reverse();
        global = [...global, ...reversedSix];
        await initializeInfectionDeck(global);
    }

    public getChildPayload(index: number): CityCard {
        return this.firstSix[index];
    }

    public async onDrop(dropResult: { removedIndex: number; addedIndex: number; payload: PlayingCard }): Promise<void> {
        this.firstSix = applyDrag([...this.firstSix], dropResult);
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
    background-color: #EF0C5B;
}

.YELLOW {
    background-color: #ffd500;
}

.BLACK {
    background-color: black;
}
</style>
