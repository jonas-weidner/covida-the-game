<template>
    <div class="w-1/3 flex flex-col justify-end pr-24">
        <h2 class="text-4xl font-bold mb-8 text-center">Neues Spiel erstellen</h2>
        <c-input placeholder="Dein Name" v-model="name" />
        <p class="font-bold text-center mt-8 mb-1">Mitspieler</p>
        <c-radio-group v-model="numberOfPlayers" class="flex items-center flex-col mb-8">
            <c-radio :value=2>2 Spieler</c-radio>
            <c-radio :value=3>3 Spieler</c-radio>
            <c-radio :value=4>4 Spieler</c-radio>
        </c-radio-group>

        <p class="font-bold text-center mb-1">Schwierigkeit</p>
        <c-radio-group v-model="difficulty" class="flex items-center flex-col mb-8">
            <c-radio :value=4>Einstiegerstufe (4 Karten)</c-radio>
            <c-radio :value=5>Standardstufe (5 Karten)</c-radio>
            <c-radio :value=6>Heldenstufe (6 Karten)</c-radio>
        </c-radio-group>

        <p class="font-bold text-center mb-1">Code zum Beitreten</p>
        <div class="flex justify-center items-center">
            <p class="text-center text-2xl">{{ code }}</p>
            <eva-icon class="ml-3" name="copy-outline"
                      animation="pulse" fill="limegreen" @click="copyField" />
        </div>

        <c-button class="mt-5 w-full" variant-color="blue" size="md" @click="createGame">
            Spiel erstellen
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { rword } from "rword";
import { createNewGame, auth } from "@/services/firebase";

export default Vue.extend({
    data() {
        return {
            message: "Copied",
            name: "",
            code: "",
            numberOfPlayers: 4,
            difficulty: 4
        };
    },
    mounted() {
        if (auth.currentUser?.displayName) this.name = auth.currentUser.displayName;
        this.code = (rword.generate(2) as string[]).join("-");
    },
    methods: {
        async createGame() {
            const document =
                await createNewGame(this.code, this.numberOfPlayers, this.difficulty, this.name);
            if (document) {
                this.$store.commit("setCurrentGameCode", this.code);
                await this.$router.push({
                    name: "Game",
                    params: { id: this.code }
                });
            }
        },
        copyField() {
            this.$copyText(this.code).then(() => {
                this.$toast({
                    title: "Code in die Zwischenablage kopiert",
                    status: "success"
                });
            });
        }
    }
});
</script>
