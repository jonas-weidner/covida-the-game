<template>
    <div class="resize-button-wrapper">
        <c-icon-button
            :isRound="true"
            variant-color="blue"
            bg="blue.800"
            color="white"
            size="lg"
            aria-label="Expand"
            :icon="expanded ? 'arrow-down' : 'arrow-up'"
            @click="$emit('resize')"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ResizeButton extends Vue {
    @Prop({ default: false }) expanded!: boolean;
}
</script>

<style scoped>
.resize-button-wrapper {
    position: absolute;
    z-index: 10;
    bottom: 2%;
    right: 2%;
}
</style>
