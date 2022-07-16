<template>
  <div>
<h1>App Base de Vue</h1>
<nav v-if="!userStore.loadingSession" >
  <router-link to="/" v-if="userStore.userData">Home</router-link>
  <router-link to="/login" v-if="!userStore.userData">Login</router-link>
  <router-link to="/register" v-if="!userStore.userData">Register</router-link>
  <button @click="userStore.logOutSesion" v-if="userStore.userData">logout</button>
</nav>
<div v-else>
<p>Loading...</p>
</div>
<router-view></router-view>
  </div>
</template>

<script setup>
import { useUserStore } from "./stores/users";

const userStore = useUserStore();

</script>


<style lang="scss" scoped>

</style>