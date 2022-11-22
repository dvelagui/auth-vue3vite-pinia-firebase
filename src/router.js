import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/users';
import Home from "./views/Home.vue";

const requireAuth = async (to, from, next) => {
    const useStore = useUserStore();
    const user = await useStore.currentUser();
    if (user) {
        next()
    } else {
        next('/login')
    }

}

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: requireAuth
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./views/Register.vue')
    },,
    {
        path: '/editar/:id',
        name: 'Editar',
        component: () => import('./views/Editar.vue'),
        beforeEnter: requireAuth
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;