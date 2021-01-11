import { auth } from "@/services/firebase";
export const authGuard = (to, _, next) => {
    if (auth.currentUser) return next();
    return next({ name: "Login" });
};
