<template>
    <panZoom>
        <div class="flex justify-center items-center relative">
            <div class="paris rounded-full"></div>
            <img src="@/assets/world-map.jpg" width="140%" />
        </div>
    </panZoom>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { exitGame } from "@/services/firebase";
import { Game } from "@/types";

@Component
export default class Board extends Vue {
    @Prop({ required: true }) game!: Game;

    public async exitGame() {
        await exitGame();
        await this.$router.push({ name: "Menu" });
    }
}
</script>

<style scoped>
.paris {
    position: absolute;
    top: 23%;
    left: 50.2%;
    height: 10px;
    width: 10px;
    background-color: blue;
}
</style>
