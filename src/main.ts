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
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faSignOutAlt,
    faPlay,
    faUndo,
    faForward,
    faHandHoldingMedical,
    faRandom,
    faExternalLinkAlt,
    faPaperPlane,
    faCapsules,
    faTimesCircle,
    faCheckDouble,
    faGift,
    faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import i18n from "./i18n";

Vue.use(Autocomplete);
Vue.use(panZoom);
Vue.config.productionTip = false;
Vue.use(EvaIcons);
Vue.use(VueClipboard);
Vue.use(firestorePlugin);

library.add(faExternalLinkAlt);
library.add(faCapsules);
library.add(faTimesCircle);
library.add(faCheckDouble);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Chakra, {
    icons: {
        iconPack: "fa",
        iconSet: {
            faSignOutAlt,
            faPlay,
            faUndo,
            faForward,
            faHandHoldingMedical,
            faRandom,
            faPaperPlane,
            faCapsules,
            faGift,
            faEye
        }
    }
});

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
            i18n,
            render: (h) => h(CThemeProvider, [h(App)])
        }).$mount("#app");
});



