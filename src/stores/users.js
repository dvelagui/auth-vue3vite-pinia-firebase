import { defineStore } from "pinia";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    auth
} from "../firebase";
import router from "../router";
import {
    useDatabaseStore
} from "./database";




export const useUserStore = defineStore('danyStore', {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false
    }),
    actions: {
        async registerUser(email, password) {
            this.loadingUser = true;
            try {
                    const {
                        user
                    } = await createUserWithEmailAndPassword(auth, email, password);
                    console.log(user);
                    this.userData = {
                        email: user.email,
                        uid: user.uid
                    }
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingUser = false;
            }
        },
        async loginUser(email, password) {
            this.loadingUser = true;
            try {
                const {
                    user
                } = await signInWithEmailAndPassword(auth, email, password);
                this.userData = {
                    email: user.email,
                    uid: user.uid
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.loadingUser = false;
            }
        },
        async logOutSesion() {
            const databaseStore = useDatabaseStore();
            databaseStore.$reset();
            try {
                await signOut(auth);
                this.userData = null;
                router.push('/login')
            } catch (error) {
                console.log(error);
            }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                const unsuscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.userData = {
                            email: user.email,
                            uid: user.uid
                        }
                    } else {
                        this.userData = null;
                        const databaseStore = useDatabaseStore();
                        databaseStore.$reset();
                    }
                    resolve(user)
                }, e => reject(e))
                unsuscribe()
            })
        }
    }
})