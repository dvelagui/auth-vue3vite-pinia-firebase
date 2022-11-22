<template>
    <div>
        <h1>HOME</h1>
        <p>{{ useStore.userData.email }}</p>
        <Form></Form>
        <p v-if="databaseStore.loadingDoc">Loading Data...</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">{{ item.id }} - {{ item.name }} - {{ item.short
            }}
            <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
            <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useDatabaseStore } from '../stores/database';
import { useUserStore } from '../stores/users';
import Form from "./Form.vue";


const useStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();



databaseStore.getUrls();



</script>

<style lang="scss" scoped>
</style>