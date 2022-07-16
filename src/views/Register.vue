<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingreso su correo" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser" >Crear Usuario</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from "../stores/users";
import { useRouter } from "vue-router";

const email = ref('');
const password = ref('');
const userStore = useUserStore()
const router = useRouter();

const handleSubmit = async () => {
    if (!email.value || !password.value > 6) {
        return alert('llena los campos')
    } 

    await userStore.registerUser(email.value, password.value)

    router.push('/');

}


</script>

<style lang="scss" scoped>
</style>