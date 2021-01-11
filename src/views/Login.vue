<template>
    <div class="fullscreen teal flex items-center justify-center">
        <div class="beige py-16 flex items-center justify-center">
            <div class="w-96">
                <h2 class="text-center text-6xl font-bold">Covida</h2>
                <p class="text-center">by Jonas Weidner</p>
                <div class="mt-12">
                    <c-input placeholder="Email Adresse eingeben" v-model="email"
                             variant="outline" />
                </div>
                <div class="mt-3">
                    <c-input-group size="md">
                        <c-input
                            pr="5rem"
                            :type="show ? 'text' : 'password'"
                            placeholder="Passwort eingeben"
                            v-model="password"
                            variant="outline"
                        />
                        <c-input-right-element width="5rem" class="mr-2">
                            <c-button h="1.75rem" size="sm" @click="show = !show">
                                {{ show ? 'Hide' : 'Show' }}
                            </c-button>
                        </c-input-right-element>
                    </c-input-group>
                </div>
                <c-button class="mt-5 w-full" variant-color="blue"
                          size="md" @click="signIn('google')">
                    Einloggen mit Google
                </c-button>
                <c-button class="mt-5 w-full" variant-color="blue"
                          size="md" @click="signIn('email')">
                    Einloggen
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

.teal {
    background-color: #13BDB6;
}

.beige {
    background-color: white;
    width: 100vw;
}
</style>
