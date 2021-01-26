<template>
    <div>
        <router-view />
        <language-switcher />
    </div>
</template>

<script>
import LanguageSwitcher from "@/components/languageSwitcher/LanguageSwitcher";
export default {
    name: "App",
    components: { LanguageSwitcher }
};
</script>

<style>
body, html {
    position: fixed;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    color: #02225c;
}
</style>
