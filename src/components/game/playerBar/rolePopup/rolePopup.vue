<template>
    <div >
        <p class="font-bold text-xl cursor-pointer" @click="open">
           {{ player.role ? player.role.name : "" }}
        </p>

        <c-modal
            :is-open="isOpen"
            :on-close="close"
        >
            <c-modal-content ref="content">
                <c-modal-header>{{ player.role ? player.role.name : "" }}</c-modal-header>
                <c-modal-close-button />
                <c-modal-body v-if="player.role" class="mb-4">
                    <p><strong>Aktionen:</strong></p>
                    <div v-for="(action, index) in player.role.actions" :key="index">
                        <p>- {{action}}</p>
                    </div>
                    <div v-if="player.role.notes" class="mt-8">
                        <strong>Notizen:</strong><br> {{ player.role.notes }}
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
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        }
    }
});
</script>
