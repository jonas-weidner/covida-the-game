<template>
    <div class="fullscreen flex items-center justify-center relative space-x-20">
        <div class="bg-image relative">
            <div class="overlay"></div>
        </div>
        <create-game />
        <join-game />
        <logout />
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Logout from "@/components/menu/logout";
import JoinGame from "@/components/menu/joinGame";
import CreateGame from "@/components/menu/createGame";
import { firebaseLogout } from "@/services/firebase";

export default Vue.extend({
    components: {
        Logout,
        JoinGame,
        CreateGame
    },
    data() {
        return { code: "" };
    },
    methods: {
        async logout() {
            await firebaseLogout();
            await this.$router.push({ name: "Login" });
        }
    }
});
</script>

<style scoped>
.bg-image {
    position: absolute;
    z-index: -1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../assets/world-map.jpg");
    background-size: cover;
    filter: blur(4px);
}

.overlay {
    position: absolute;
    z-index: -999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
}
</style>
