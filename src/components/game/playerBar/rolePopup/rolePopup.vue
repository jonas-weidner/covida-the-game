<template>
    <div >
        <p class="font-bold text-xs cursor-pointer underline pr-2 select-none" @click="open">
           {{ player.role ? $t(`roles.${player.role.name}.name`) : "" }}
        </p>

        <c-modal
            :is-open="isOpen"
            :on-close="close"
        >
            <c-modal-content ref="content">
                <c-modal-header>
                    {{ player.role ? $t(`roles.${player.role.name}.name`) : "" }}
                </c-modal-header>
                <c-modal-close-button />
                <c-modal-body v-if="player.role" class="mb-4">
                    <p><strong>{{ $t('roleModal.actions') }}:</strong></p>
                    <div v-for="(_, index) in player.role.actions" :key="index">
                        <p>- {{ $t(`roles.${player.role.name}.actions.${index+1}`) }}</p>
                    </div>
                    <div v-if="player.role.notes" class="mt-8">
                        <strong>{{ $t('roleModal.notes') }}:</strong>
                        <br> {{ $t(`roles.${player.role.name}.notes`) }}
                    </div>
                </c-modal-body>
            </c-modal-content>
            <c-modal-overlay />
        </c-modal>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
export default Vue.extend({
    props: ["player"],
    data () {
        return { isOpen: false };
    },
    methods: {
        open() {
            this.$store.commit("setModalState", true);
            this.isOpen = true;
        },
        close() {
            this.$store.commit("setModalState", false);
            this.isOpen = false;
        }
    }
});
</script>
