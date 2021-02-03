<template>
    <div
        class="w-1/2 xl:w-1/3 mx-5 flex flex-col justify-end p-10 xl:p-20 bg-gray-100 items-center rounded-2xl">
        <h2 class="text-4xl font-bold mb-8 text-center">{{ $t('menu.createNewGame') }}</h2>
        <c-input :placeholder="$t('menu.yourName')" v-model="name" />
        <p class="font-bold text-center mt-8 mb-1">{{ $t('menu.numberOfPlayers') }}</p>
        <c-radio-group v-model="numberOfPlayers" class="flex items-center flex-col mb-8">
            <c-radio :value=2>2 {{ $t('menu.players') }}</c-radio>
            <c-radio :value=3>3 {{ $t('menu.players') }}</c-radio>
            <c-radio :value=4>4 {{ $t('menu.players') }}</c-radio>
            <c-radio :value=5>5 {{ $t('menu.players') }}</c-radio>
        </c-radio-group>

        <p class="font-bold text-center mb-1">{{ $t('menu.difficulty') }}</p>
        <c-radio-group v-model="difficulty" class="flex items-center flex-col mb-8">
            <c-radio :value=4>{{ $t('menu.introductory') }} (4 {{ $t('menu.cards') }})</c-radio>
            <c-radio :value=5>{{ $t('menu.standard') }} (5 {{ $t('menu.cards') }})</c-radio>
            <c-radio :value=6>{{ $t('menu.heroic') }} (6 {{ $t('menu.cards') }})</c-radio>
        </c-radio-group>

        <p class="font-bold text-center mb-1">{{ $t('menu.gameCode') }}</p>
        <div class="flex justify-center items-center">
            <p class="text-center text-2xl">{{ code }}</p>
            <eva-icon class="ml-3" name="copy-outline"
                      animation="pulse" fill="limegreen" @click="copyField" />
        </div>

        <c-button class="mt-5 w-full" variant-color="blue" size="md" @click="createGame">
            {{ $t('menu.createGame') }}
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
