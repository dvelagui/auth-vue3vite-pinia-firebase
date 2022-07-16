<template>
    <div>
        <h1>HOME</h1>
        <p>{{ useStore.userData.email }}</p>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/users';


const useStore = useUserStore();

</script>

<style lang="scss" scoped>

</style>