<script setup>
import { RouterLink } from 'vue-router';
import Info from './icons/Info.vue'
// scroll navbar
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-100px";
    }
}
</script>
 
<template>
    <div class="w-full h-20 bg-[#285481]">
        <div class="px-[5%] flex items-center justify-between w-full h-full">
            <RouterLink :to="{ name: 'Default' }"><img src="../assets/sit_logo.png" class="h-12 cursor-pointer">
            </RouterLink>
            <RouterLink :to="{name:'AboutUs'}">
                <div class="text-xl text-white flex items-center gap-2 cursor-pointer">
                    <Info></Info>
                    <div>About Us</div>
                </div>
            </RouterLink>
        </div>
    </div>
    <div id="navbar" class="w-full h-20 bg-[#285481] z-50">
        <div class="px-[5%] flex items-center justify-between w-full h-full">
            <RouterLink :to="{ name: 'Default' }"><img src="../assets/sit_logo.png" class="h-12 cursor-pointer">
            </RouterLink>
        </div>
    </div>
    <div class="w-full h-20 drop-shadow-lg bg-white">
    </div>
</template>
 
<style scoped>
#navbar {
    position: fixed;
    top: -100px;
    width: 100%;
    transition: top 0.5s;
}
</style>