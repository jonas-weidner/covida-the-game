<template>
    <div class="flex justify-between items-center cursor-pointer" @click="open">
        <div class="font-bold pt-0.5">{{ city.city }}</div>
        <font-awesome-icon icon="external-link-alt" />

        <c-modal
            :is-open="isOpen"
            :on-close="close"
            size="xl"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ city.city }}</c-modal-header>
                <c-modal-close-button />
                <c-modal-body class="mb-4">
                    <div class="flex items-center justify-center space-x-12 leading-none">
                        <div
                            v-for="color in colors" :key="color"
                            :class="diseaseCubeClasses(color.toUpperCase())"
                        >
                            <div>
                                <c-icon-button icon="add" :isRound="true"
                                    aria-label="Erhöhen"
                                    @click="changeDiseaseLevel(city, color)"/>
                                <div class="my-3">{{ city.diseaseCubes[color] }}</div>
                                <c-icon-button icon="minus" :isRound="true"
                                    aria-label="Verringern"
                                    @click="changeDiseaseLevel(city, color, true)"/>
                            </div>
                        </div>
                    </div>
                    <div v-if="city.playersInCity.length > 0">
                        <div class="font-bold text-xl mt-8 mb-3">Spieler in Stadt</div>
                        <div v-for="player in city.playersInCity" :key="player.id"
                            class="flex items-center justify-between space-x-5 mb-3"
                        >
                            <div class="w-2/5 flex items-center justify-between">
                                <div class="w-8 h-8 rounded-full"
                                     :style="{backgroundColor: player.role.color}"></div>
                                <div class="font-semibold text-lg">{{ player.name }}</div>
                                <c-icon name="arrow-forward" size="25px" />
                            </div>
                            <div class="w-3/5 flex items-center justify-end space-x-2">
                                <autocomplete
                                    :search="search"
                                    @submit="citySelected($event, player)"
                                    placeholder="Search for a city"
                                    aria-label="Search for a city"
                                />
                                <c-tooltip has-arrow label="Spieler in Stadt schicken"
                                           placement="left">
                                    <c-icon-button
                                        :isRound="true"
                                        variant-color="blue"
                                        bg="blue.800"
                                        color="white"
                                        size="lg"
                                        icon="paper-plane"
                                        aria-label="Spieler in Stadt schicken"
                                        @click="sendPlayerToCity(player)"
                                        :isDisabled="newLocationSelectedForPlayer(player)"
                                    />
                                </c-tooltip>
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
import { changeDiseaseLevel, updateCities } from "@/services/firebase";
import { City, Game, Player } from "@/types";
import { cities } from "@/assets/cities";

@Component
export default class CityModal extends Vue {
    @Prop({ required: true }) game!: Game;
    @Prop({ required: true }) city!: City;

    public isOpen = false;
    public playersToLocation: { playerId: string; city: string }[] = [];
    public colors: string[] = ["black", "blue", "red", "yellow"];

    open() {
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
    }

    public newLocationSelectedForPlayer(player: Player): boolean {
        return this.playersToLocation
            .find((element) => element.playerId === player.id) === undefined;
    }

    public diseaseCubeClasses(region: string): string {
        return `${region}-FONT font-bold disease-font text-center`;
    }

    public async changeDiseaseLevel(city: City, color: string, decrease?: boolean): Promise<void> {
        if ((decrease && city.diseaseCubes[color] !== 0) ||
            (!decrease && city.diseaseCubes[color] < 3))
            await changeDiseaseLevel(city, color, decrease);
    }

    public search(input: string): string[] {
        if (input.length < 1) return [];

        return cities.map((city) => city.city).filter(name => {
            return name.toLowerCase().startsWith(input.toLowerCase());
        });
    }

    public citySelected(result: any, player: Player) {
        const existingIndex = this.playersToLocation
            .findIndex((element) => element.playerId === player.id);
        if (existingIndex === -1)
            this.playersToLocation.push({
                playerId: player.id,
                city: result
            });
        else this.playersToLocation[existingIndex].city = result;
    }

    public async sendPlayerToCity(player: Player): Promise<void> {
        const newLocation = this.playersToLocation
            .find((element) => element.playerId === player.id)!.city;
        const updatedCities: City[] = JSON.parse(JSON.stringify(this.game.cities));
        const newCityIndex = updatedCities.findIndex((city) => city.city === newLocation);

        updatedCities[newCityIndex].playersInCity.push(player);

        const oldCityIndex = updatedCities.findIndex((city) => city.city === this.city.city);
        const playerIndex = updatedCities[oldCityIndex]
            .playersInCity.findIndex((playerInCity) => playerInCity.id === player.id);
        updatedCities[oldCityIndex].playersInCity.splice(playerIndex, 1);
        await updateCities(updatedCities);
    }
}
</script>

<style>
.autocomplete-input {
    border-radius: 30px !important;
}
</style>

<style scoped>

.disease-font {
    font-size: 30px;
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
