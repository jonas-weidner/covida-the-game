<template>
    <div>
        <c-modal
            :is-open="isOpen"
            :on-close="close"
            size="xl"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ $t('yourTurnModal.title') }}</c-modal-header>
                <c-modal-close-button />
                <c-modal-body class="mb-4">
                    {{ $t('yourTurnModal.body') }}
                </c-modal-body>
                <c-modal-footer class="flex justify-center">
                    <c-button variant-color="blue" mr="3" @click="close">
                        {{ $t('yourTurnModal.letsGo') }}
                    </c-button>
                </c-modal-footer>
            </c-modal-content>

            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class YourTurnModal extends Vue {
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
