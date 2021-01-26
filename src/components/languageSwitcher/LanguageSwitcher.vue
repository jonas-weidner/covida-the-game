<template>
    <div class="language-switcher-wrapper shadow-2xl flex items-center space-x-2 rounded-tr-lg">
        <div class="cursor-pointer w-5 h-5 rounded-full overflow-hidden"
             @click="$i18n.locale ='en'">
            <img src="@/assets/united-kingdom.svg" />
        </div>
        <div class="cursor-pointer w-5 h-5 rounded-full overflow-hidden"
             @click="$i18n.locale ='de'">
            <img src="@/assets/germany.svg" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LanguageSwitcher extends Vue {

}
</script>

<style scoped>
.language-switcher-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
    background-color: white;
}
</style>
