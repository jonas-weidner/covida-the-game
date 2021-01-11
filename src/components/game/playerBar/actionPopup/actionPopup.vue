<template>
    <div >
        <p class="cursor-pointer pl-3" @click="open">
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
import { Vue } from "vue-property-decorator";
export default Vue.extend({
    props: ["action"],
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
