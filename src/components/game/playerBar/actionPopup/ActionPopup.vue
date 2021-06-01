<template>
    <div >
        <p class="cursor-pointer" @click="open">
            {{ action ? $t(`actionCards.${action.name}.name`) : "" }}
        </p>

        <c-modal
            :is-open="isOpen"
            :on-close="close"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ $t(`actionCards.${action.name}.name`) }}</c-modal-header>
                <c-modal-close-button />
                <c-modal-body class="mb-4">
                    <p>{{ $t(`actionCards.${action.name}.description`) }}</p>
                </c-modal-body>
            </c-modal-content>
            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { ActionCard } from "@/interfaces";

@Component
export default class ActionPopup extends Vue {
    @Prop({ required: true }) action!: ActionCard;
    public isOpen = false;

    public open() {
        this.$store.commit("setModalState", true);
        this.isOpen = true;
    }

    public close() {
        this.$store.commit("setModalState", false);
        this.isOpen = false;
    }
}
</script>
