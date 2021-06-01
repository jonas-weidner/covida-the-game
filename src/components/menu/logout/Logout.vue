<template>
    <div class="logout-button">
        <c-button variant-color="blue" size="sm" @click="Logout">
            <div class="text-xs">{{ $t("menu.logout") }}</div>
        </c-button>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { firebaseLogout } from "@/services/firebase";

export default Vue.extend({
    methods: {
        async logout() {
            await firebaseLogout();
            await this.$router.push({ name: "Login" });
        }
    }
});
</script>

<style scoped>
.logout-button {
    position: absolute;
    top: 10px;
    right: 10px
}
</style>
