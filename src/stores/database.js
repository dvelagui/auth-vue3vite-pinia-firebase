import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from "firebase/firestore";
import {
    defineStore
} from "pinia";
import {
    auth,
    db
} from "../firebase";
import { nanoid } from 'nanoid'
import router from "../router";


export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false
    }),
    actions: {
        async getUrls() {
            this.loadingDoc = true;
            try {
                // console.log(auth.currentUser.uid);
                const q = query(collection(db, "urls"), where("user", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                   // console.log(doc.id, " => ", doc.data());
                    this.documents.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingDoc = false;
            }
        },
        async getUrl(id) {
            try {
                const docRef = doc(db, "urls", id);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    throw new Error('no existe el doc');
                };

                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error('No tienes autorizacion de borrar este evento')
                    
                }          
                return docSnap.data().name;
                
            } catch (error) {
                console.error();
            } finally {

            }


        },
        async addUrl(name, id) {
            const fecha = new Date()
            const idNew = id
            try {
                const objetoDocs = {
                    name: name,
                    short: nanoid(5),
                    user: auth.currentUser.uid,
                    fecha: fecha
                }
                const docRef = await setDoc(doc(db, "urls", `${idNew}`), objetoDocs)
                this.documents.push({
                    ...objetoDocs,
                    id: idNew
                })
            } catch (error) {
                console.log(error);
            } finally {

            }
        },
        async deleteUrl(id) {
                try {
                    const docRef = doc(db, "urls", id);
                    const docSnap = await getDoc(docRef);
                    if (!docSnap.exists()) {
                        throw new Error('no existe el doc');
                    };

                    if (docSnap.data().user !== auth.currentUser.uid) {
                        throw new Error('No tienes autorizacion de borrar este evento')
                        
                    }          
                    await deleteDoc(docRef);
                    this.documents = this.documents.filter(item => item.id !== id)
                } catch (error) {
                    console.log(error);
                }
        },
        async updateUrl(id, newName) {
            try {
                this.$reset();
                const docRef = doc(db, "urls", id);
                    const docSnap = await getDoc(docRef);
                    if (!docSnap.exists()) {
                        throw new Error('no existe el doc');
                    };

                    if (docSnap.data().user !== auth.currentUser.uid) {
                        throw new Error('No tienes autorizacion de borrar este evento')
                        
                    }   
                    await updateDoc(docRef, {
                        name: newName
                    })
                    //this.documents = this.documents.map(item => item.id === id ? ({...item, name: newName}) : item)
                    router.push('/')
            } catch (error) {
                console.log(error);
            } finally {
            }
        }
    },
})