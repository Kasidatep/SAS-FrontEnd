<script setup>
import { RouterLink } from 'vue-router';
import Info from './icons/Info.vue'
import MdiAccountCog from './icons/MdiAccountCog.vue';
import MdiAccount from './icons/MdiAccount.vue';
import { onMounted, ref } from 'vue'
// scroll navbar
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-100px";
    }
}

const userView = ref(true)
onMounted(() => {
    userView.value = true
})
</script>
 
<template>
    <div class="w-full h-20 bg-[#285481]">
        <div class="px-[5%] flex items-center justify-between w-full h-full ">
            <RouterLink :to="{ name: 'Default' }"><img src="../assets/sit_logo.png" class="h-12 cursor-pointer"
                    @click="userView = true">
            </RouterLink>
            <div class="flex">
                <RouterLink :to="{ name: 'Home' }">
                    <div class="text-xl text-white flex items-center gap-2 cursor-pointer h-full" v-if="userView == true"
                        @click="userView = false">
                        <MdiAccountCog></MdiAccountCog>
                        <div class="hidden sm:flex">Admin</div>
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'Default' }">
                    <div class="text-xl text-white flex items-center gap-2 cursor-pointer h-full" v-if="userView == false"
                        @click="userView = true">
                        <MdiAccount></MdiAccount>
                        <div class="hidden sm:flex">User</div>
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'AboutUs' }">
                    <div
                        class="text-xl text-white flex items-center gap-2 cursor-pointer pl-6 sss:pl-8 ss:pl-10 sm:pl-12 h-full">
                        <Info></Info>
                        <div class="hidden sm:flex">About Us</div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>

    <div id="navbar" class="w-full h-20 bg-[#285481] z-50">
        <div class="px-[5%] flex items-center justify-between w-full h-full ">
            <RouterLink :to="{ name: 'Default' }"><img src="../assets/sit_logo.png" class="h-12 cursor-pointer" @click="userView = true">
            </RouterLink>
            <div class="flex">
                <RouterLink :to="{ name: 'Home' }" >
                    <div class="text-xl text-white flex items-center gap-2 cursor-pointer h-full" v-if="userView == true" @click="userView = false">
                        <MdiAccountCog ></MdiAccountCog>
                        <div class="hidden sm:flex">Admin</div>
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'Default' }" >
                    <div class="text-xl text-white flex items-center gap-2 cursor-pointer h-full" v-if="userView == false" @click="userView = true">
                        <MdiAccount></MdiAccount>
                        <div class="hidden sm:flex">User</div>
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'AboutUs' }">
                    <div class="text-xl text-white flex items-center gap-2 cursor-pointer pl-6 sss:pl-8 ss:pl-10 sm:pl-12 h-full">
                        <Info></Info>
                        <div class="hidden sm:flex">About Us</div>
                    </div>
                </RouterLink>
            </div>
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
}</style>