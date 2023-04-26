<script setup>
import Navbar from './components/Navbar.vue';
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';
</script>
 
<template>
<div>
  <Navbar></Navbar>
  <RouterView></RouterView>
  <Footer></Footer>
</div>
</template>
<style scoped>

</style>