<template>
    <panZoom @init="onInit" :options="panZoomOptions">
        <div class="flex justify-center items-center relative">
            <img src="@/assets/world-map.jpg" width="3500px" height="1750px"
                 style="filter: brightness(70%);"
                 class="select-none"
            />

            <div
                v-for="city in citiesWithPosition" :key="city.city"
                :class="cityClasses(city.region)"
                :style="{
                    left: `${city.location.left}%`,
                    top: `${city.location.top}%`,
                    paddingLeft: '0.5px'
                }"
            >
                <div
                    class="w-full h-full flex items-center justify-center"
                    @dblclick="placeOrRemoveResearchStation(city)"
                    @mouseover="researchFocus = city.city"
                    @mouseleave="researchFocus = null"
                >
                    <img
                        v-if="city.researchStation"
                        src="@/assets/icon-ui-2-home.svg" width="50%"
                    />
                    <img
                        class="opacity-50"
                        v-if="!city.researchStation && researchFocus === city.city"
                        src="@/assets/icon-ui-2-home.svg" width="50%"
                    />
                </div>
                <div
                    :class="cityPopoverClasses(city.labelPosition)"
                    @mouseover="focused = city.city"
                    @mouseleave="focused = null"
                >
                    <city-modal :game="game" :city="city" />
                    <div class="flex items-center justify-between leading-none">
                        <div
                            v-for="color in colors" :key="color"
                            :class="diseaseCubeClasses(color.toUpperCase())"
                        >
                            <div v-if="city.diseaseCubes[color] > 0 || focused === city.city">
                                <div
                                    v-if="focused === city.city"
                                    @click="changeDiseaseLevel(city, color)">+
                                </div>
                                <div>{{ city.diseaseCubes[color] }}</div>
                                <div
                                    v-if="focused === city.city"
                                    @click="changeDiseaseLevel(city, color, true)">-
                                </div>
                            </div>
                        </div>
                    </div>
                    <Container
                        @drop="onDrop"
                        group-name="playerInCity"
                        :get-child-payload="getChildPayload"
                        class="flex items-center justify-between mt-0.5 w-full">
                        <Draggable v-for="(player, playerIndex) in city.playersInCity"
                              :key="playerIndex">
                            <div
                                :style="{ backgroundColor: player.role.color }"
                                class="w-2 h-2 rounded"
                            />
                        </Draggable>
                    </Container>
                </div>
            </div>
        </div>
    </panZoom>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { changeDiseaseLevel, exitGame, updateCities } from "@/services/firebase";
import { City, Game, Region } from "@/types";
import { Container, Draggable } from "vue-smooth-dnd";
import CityModal from "@/components/game/board/cityModal";

@Component({
    components: {
        CityModal,
        Container,
        Draggable
    }
})
export default class Board extends Vue {
    @Prop({ required: true }) game!: Game;

    public focused: string = null!;
    public researchFocus: string = null!;
    public colors: string[] = ["black", "blue", "red", "yellow"];
    public panZoom: any = null!;
    public panZoomOptions = {
        zoomDoubleClickSpeed: 1,
        beforeMouseDown: this.shouldPan,
        minZoom: 1.05,
        transformOrigin: {
            x: 0.5,
            y: 0.5
        },
        initialY: 0.5,
        initialX: 0.5,
        bounds: true,
        boundsPadding: 0.1
    }

    public onInit(instance) {
        this.panZoom = instance;
        this.panZoom.moveTo(0.5, 0.5);
    }

    get citiesWithPosition(): City[] {
        if (!this.game) return [];
        return this.game.cities.filter((city) => city.location);
    }

    public shouldPan(e: any): any {
        console.log(e, this.focused);
        return this.focused != null;
    }

    public cityClasses(region: Region): string {
        return `absolute rounded-full bg-green-600
            origin-center cursor-pointer flex items-center justify-center
            border border-solid border-white ${region} city-dot`;
    }

    public diseaseCubeClasses(region: string): string {
        return `${region}-FONT font-bold disease-font text-center`;
    }

    public cityPopoverClasses(position: string): string {
        return `city-popover-${position} rounded-sm shadow-lg w-11 select-none`;
    }

    public async changeDiseaseLevel(city: City, color: string, decrease?: boolean): Promise<void> {
        if ((decrease && city.diseaseCubes[color] !== 0) ||
            (!decrease && city.diseaseCubes[color] < 3))
            await changeDiseaseLevel(city, color, decrease);
    }

    public getChildPayload(index: number) {
        const dragStartCity = this.game.cities.findIndex((city) => city.city === this.focused);
        return {
            startIndex: dragStartCity,
            playerIndex: index
        };
    }

    public async onDrop(dropResult: { removedIndex: number; addedIndex: number; payload: {
        startIndex: number; playerIndex: number; }; }): Promise<void> {
        if (dropResult.removedIndex == null && dropResult.addedIndex != null) {
            const payload = dropResult.payload;
            const cities = [...this.game.cities];
            const player = cities[payload.startIndex].playersInCity.splice(payload.playerIndex, 1);
            const endIndex = this.game.cities.findIndex((city) => city.city === this.focused);
            cities[endIndex].playersInCity = [...cities[endIndex].playersInCity, ...player];
            await updateCities(cities);
        }
    }

    public async exitGame() {
        await exitGame();
        await this.$router.push({ name: "Menu" });
    }

    public async placeOrRemoveResearchStation(city: City): Promise<void> {
        const cities = [...this.game.cities];
        const cityIndex = cities.findIndex((cit) => cit.city === city.city);
        cities[cityIndex].researchStation = !cities[cityIndex].researchStation;
        await updateCities(cities);
    }
}
</script>

<style scoped>
.smooth-dnd-container {
    min-height: 10px !important;
}

.city-dot {
    height: 20px;
    width: 20px;
}

.city-popover-bottom {
    position: absolute;
    left: -80%;
    top: 110%;
    background-color: white;
    z-index: 4;
    font-size: 4px;
    padding: 2px;
}

.city-popover-top {
    position: absolute;
    left: -80%;
    top: -170%;
    background-color: white;
    z-index: 4;
    font-size: 4px;
    padding: 2px;
}

.city-popover-right {
    position: absolute;
    right: -270%;
    top: -35%;
    background-color: white;
    z-index: 4;
    font-size: 4px;
    padding: 2px;
}

.city-popover-left {
    position: absolute;
    left: -270%;
    top: -35%;
    background-color: white;
    z-index: 4;
    font-size: 4px;
    padding: 2px;
}

.disease-font {
    font-size: 6px;
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
