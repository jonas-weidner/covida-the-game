import { auth, getAuthorizedPlayers } from "@/services/firebase";
import store from "@/store";
export const authGuard = async (to, _, next) => {
    let authorizedPlayers = store.getters.getAuthorizedPlayers;
    if (authorizedPlayers.length === 0) {
        authorizedPlayers = await getAuthorizedPlayers();
        store.commit("setAuthorizedPlayers", authorizedPlayers);
    }


    if (auth.currentUser && authorizedPlayers.includes(auth.currentUser!.email!)) return next();
    return next({ name: "Login" });
};
