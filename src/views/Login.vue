<template>
    <div class="fullscreen flex items-center justify-center relative">
        <div class="bg-image">
            <div class="overlay"></div>
        </div>
        <div class="flex items-center justify-center p-20 bg-gray-100 rounded-2xl">
            <div class="w-96">
                <h2 class="text-center text-6xl font-bold">Covida</h2>
                <p class="text-center">by Jonas Weidner</p>
                <div class="mt-12">
                    <c-input :placeholder="$t('login.enterEmail')" v-model="email"
                             variant="outline" />
                </div>
                <div class="mt-3">
                    <c-input-group size="md">
                        <c-input
                            pr="5rem"
                            :type="show ? 'text' : 'password'"
                            :placeholder="$t('login.enterPassword')"
                            v-model="password"
                            variant="outline"
                        />
                        <c-input-right-element width="5rem" class="mr-2">
                            <c-button h="1.75rem" size="sm" @click="show = !show">
                                {{ show ? $t('login.hide') : $t('login.show') }}
                            </c-button>
                        </c-input-right-element>
                    </c-input-group>
                </div>
                <c-button class="mt-5 w-full" variant-color="blue"
                          size="md" @click="signIn('email')">
                    {{ $t('login.login') }}
                </c-button>

                <c-button class="mt-5 w-full" variant-color="blue"
                          size="md" @click="signIn('google')">
                    {{ $t('login.loginWithGoogle') }}
                </c-button>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { firebaseSignIn } from "@/services/firebase";

export default Vue.extend({
    data() {
        return {
            email: "",
            password: "",
            show: false
        };
    },
    methods: {
        validate(): boolean {
            if (this.password && this.email) return true;
            this.$toast({
                title: "Please fill in all fields.",
                status: "error"
            });
            return false;
        },
        async signIn(type: "google"|"email") {
            const valid = type === "google" ? true : this.validate();
            if (type === "google" || valid) {
                const signInResponse = await firebaseSignIn(this.email, this.password, type);
                if (signInResponse?.user) {
                    await this.$router.push({ name: "Menu" });
                    this.$toast({
                        title: "Success.",
                        description: "We've logged you in successfully.",
                        status: "info"
                    });
                } else {
                    this.$toast({
                        title: (signInResponse as any).message,
                        status: "error"
                    });
                }
            }
        }
    }
});
</script>


<style>
.fullscreen {
    width: 100vw;
    height: 100vh;
}

.bg-image {
    position: absolute;
    z-index: -1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../assets/images/world-map.jpg");
    background-size: cover;
    filter: blur(4px);
}

.overlay {
    position: absolute;
    z-index: -999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
}
</style>
