import Vue from "vue";
import App from "./App.vue";
import Chakra, { CThemeProvider } from "@chakra-ui/vue";
import router from "./router";
import store from "./store";
import EvaIcons from "vue-eva-icons";
import VueClipboard from "vue-clipboard2";
import { firestorePlugin } from "vuefire";
import { auth } from "@/services/firebase";
import "./assets/tailwind.css";
import panZoom from "vue-panzoom";
Vue.use(panZoom);
Vue.config.productionTip = false;
Vue.use(Chakra);
Vue.use(EvaIcons);
Vue.use(VueClipboard);
Vue.use(firestorePlugin);

declare module "vue/types/vue" {
    interface Vue {
        $toast: Chakra;
    }
}

let app;
auth.onAuthStateChanged(() => {
    if (!app)
        app = new Vue({
            router,
            store,
            render: (h) => h(CThemeProvider, [h(App)])
        }).$mount("#app");
});



