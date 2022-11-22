<template>
    <div>
        <h1>Editar</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="newUrl">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';


const route = useRoute()
const databaseStore = useDatabaseStore()
const newUrl = ref('')

const handleSubmit = async () => {
    await databaseStore.updateUrl(route.params.id, newUrl.value);
    

}

onMounted(async () => {
    newUrl.value = await databaseStore.getUrl(route.params.id);
    console.log(newUrl.value);

})

</script>

<style lang="scss" scoped>

</style>