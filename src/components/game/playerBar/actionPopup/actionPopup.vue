<template>
    <div >
        <p class="cursor-pointer" @click="open">
            {{ action ? action.name : "" }}
        </p>

        <c-modal
            :is-open="isOpen"
            :on-close="close"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ action.name }}</c-modal-header>
                <c-modal-close-button />
                <c-modal-body class="mb-4">
                    <p>{{ action.description }}</p>
                </c-modal-body>
            </c-modal-content>
            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { ActionCard } from "@/types";

@Component
export default class ActionPopup extends Vue {
    @Prop({ required: true }) action!: ActionCard;
    public isOpen = false;

    open() {
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
    }
}
</script>
