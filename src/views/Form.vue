<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese ID" v-model="id">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDatabaseStore } from '../stores/database';

const databaseStore = useDatabaseStore();

const url = ref("");
const id = ref("");

const handleSubmit = () => {
    databaseStore.addUrl(url.value, id.value);
}

</script>
