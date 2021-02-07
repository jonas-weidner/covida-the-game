<template>
    <div>
        <c-modal
            :is-open="isOpen"
            :on-close="close"
            size="xl"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ $t('youWonModal.title') }}</c-modal-header>
                <c-modal-body class="mb-4">
                    {{ $t('youWonModal.body') }}
                </c-modal-body>
            </c-modal-content>

            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { DiseaseState, DiseaseStates, Game } from "@/types";

@Component
export default class YouWonModal extends Vue {
    @Prop({ required: true }) game!: Game;

    @Watch("game.diseaseStates", { deep: true })
    onDiseaseStateChange(diseaseStates: DiseaseStates, oldStates: DiseaseStates) {
        const notFound = Object.values(diseaseStates)
            .find((state) => state === DiseaseState.NotFound);

        const oldNotFound = Object.values(oldStates)
            .find((state) => state === DiseaseState.NotFound);

        if (!notFound && oldNotFound && this.game.started) {
            this.startConfetti();
            this.open();
            setTimeout(() => this.$confetti.stop(), 13000);
        }
    }

    public isOpen = false;

    public startConfetti() {
        this.$confetti.start({
            particles: [
                { type: "rect" },
                { type: "circle" }
            ],
            defaultDropRate: 20,
            defaultSize: 18,
            particlesPerFrame: 3
        });
    }

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
