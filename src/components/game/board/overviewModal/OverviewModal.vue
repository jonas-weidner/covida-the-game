<template>
    <div>
        <c-tooltip has-arrow :label="$t('overviewModal.tooltip')" placement="right">
            <c-icon-button
                :isRound="true"
                variant-color="blue"
                bg="blue.800"
                color="white"
                size="sm"
                icon="eye"
                aria-label="Open overview"
                @click="open"
            />
        </c-tooltip>

        <c-modal
            :is-open="isOpen"
            :on-close="close"
            size="xl"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ $t(`overviewModal.title`) }}</c-modal-header>
                <c-modal-close-button />
                <c-modal-body class="mb-4">
                    <p class="font-bold text-lg">{{ $t('overviewModal.infectedCities') }}</p>
                    <div v-for="city in infectedCities" :key="city.city"
                         class="flex items-center justify-between"
                    >
                        <div>{{ $t(`cities.${city.city}`) }}</div>
                        <div class="flex items-center space-x-5">
                            <div
                                v-for="color in colors" :key="color"
                                :class="diseaseCubeClasses(color.toUpperCase())"
                            >
                                <div class="my-1">{{ city.diseaseCubes[color] }}</div>
                            </div>
                        </div>
                    </div>

                    <p class="font-bold text-lg mt-4">{{ $t('overviewModal.players') }}</p>
                    <div v-for="player in game.players" :key="player.id"
                         class="flex items-center justify-between my-1">
                        <div>{{ player.name }}</div>
                        <div>{{ $t(`roles.${player.role.name}.name`) }}</div>
                        <div>{{ cityInWhichPlayerIsCurrently(player) }}</div>
                    </div>
                </c-modal-body>
            </c-modal-content>
            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { City, Game, Player } from "@/types";

@Component
export default class OverviewModal extends Vue {
    @Prop({ required: true }) game!: Game;
    public isOpen = false;
    public colors: string[] = ["black", "blue", "red", "yellow"];

    get infectedCities(): City[] {
        if (this.game)
            return this.game.cities
                .filter((city) => Object.values(city.diseaseCubes).find((color) => color > 0));
        return [];
    }

    public diseaseCubeClasses(region: string): string {
        return `${region}-FONT font-bold disease-font text-center`;
    }

    public cityInWhichPlayerIsCurrently(req: Player): string {
        const cityWithPlayer = this.game?.cities
            .find((city) => city.playersInCity.find((player) => player.id === req.id));

        if (!cityWithPlayer) return "";
        return this.$t(`cities.${cityWithPlayer?.city}`).toString();
    }

    public open() {
        this.$store.commit("setModalState", true);
        this.isOpen = true;
    }

    public close() {
        this.$store.commit("setModalState", false);
        this.isOpen = false;
    }
}
</script>

<style scoped>

.disease-font {
    font-size: 18px;
}

.BLUE {
    background-color: blue;
}

.RED {
    background-color: #EF0C5B;
}

.YELLOW {
    background-color: #F5C700;
}

.BLACK {
    background-color: black;
}

.BLUE-FONT {
    color: blue;
}

.RED-FONT {
    color: #EF0C5B;
}

.YELLOW-FONT {
    color: #F5C700;
}

.BLACK-FONT {
    color: black;
}
</style>
