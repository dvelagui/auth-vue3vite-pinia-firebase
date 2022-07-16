<template>
    <div>
<h1>Login</h1>
<form @submit.prevent="inicioSesion">
    <input type="email" placeholder="email de usuario" v-model="email">
    <input type="password" placeholder="contraseña" v-model="password">
    <button type="submit" :disabled="userLogin.loadingUser">Iniciar Sesión</button>
</form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/users.js";
import { useRouter } from "vue-router";

const email = ref('');
const password = ref(''); 
const userLogin = useUserStore();
const router = useRouter();

const inicioSesion = async () => {
   await userLogin.loginUser(email.value, password.value);
   router.push('/');
}

</script>

<style lang="scss" scoped>

</style>