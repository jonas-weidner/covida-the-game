<template>
    <div class="w-1/2 xl:w-1/3 mx-5 flex flex-col p-10 xl:p-20 bg-gray-100 items-center rounded-2xl">
        <h2 class="text-4xl font-bold mb-8 text-center">Einem Spiel beitreten</h2>
        <c-input placeholder="Dein Name" v-model="name" />
        <c-input class="mt-8" placeholder="Game code" v-model="code" />
        <c-button class="mt-5 w-full" variant-color="blue" size="md" @click="joinGame">
            Spiel beitreten
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { auth, joinGame } from "@/services/firebase";

export default Vue.extend({
    data() {
        return {
            code: "",
            name: ""
        };
    },
    mounted() {
        if (auth.currentUser?.displayName) this.name = auth.currentUser.displayName;
    },
    methods: {
        async joinGame() {
            const response = await joinGame(this.code, this.name);

            if (response.success)
                await this.$router.push({
                    name: "Game",
                    params: { id: this.code }
                });
            else
                this.$toast({
                    title: response.error?.message,
                    status: "error"
                });
        }
    }
});
</script>
