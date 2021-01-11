<template>
    <div class="fullscreen flex items-center justify-center">
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

<style>
.logout-button {
    position: absolute;
    top: 10px;
    right: 10px
}
</style>
