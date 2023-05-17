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


const isOpen = () => {

}
</script>
 
<template>
    <div class="w-full bg-[#285481] z-50 fixed">
        <div class="px-[5%] flex items-center justify-between w-full ">
            <div class="flex flex-col md:flex-row md:justify-between w-full">
                <div class="flex justify-between h-20">
                    <div class="my-auto">
                        <RouterLink :to="{ name: 'Home' }"><img src="../assets/sit_logo.png" class="h-12 cursor-pointer"
                                @click="userView = true">
                        </RouterLink>
                    </div>
                    <div class="flex md:hidden text-xl text-white  gap-2 cursor-pointer pl-6 sss:pl-8 ss:pl-10 sm:pl-12 h-full items-center" @click="isOpen">Menu</div>
                </div>
                <div class="flex flex-col w-full md:w-fit md:flex-row">
                    <RouterLink :to="{ name: 'UserAnnouncement' }">
                        <div class="text-xl text-white w-full flex justify-center items-center h-10 my-3 md:my-0 gap-2 px-2 mx-2 cursor-pointer md:h-full bg-[#33669950] rounded-md md:bg-[#285481]">
                            <MdiAccount></MdiAccount>
                            <div class="">User</div>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'AdminAnnouncement' }">
                        <div
                            class="text-xl text-white w-full flex justify-center items-center h-10 my-3 md:my-0 gap-2 px-2 mx-2 cursor-pointer md:h-full bg-[#33669950] rounded-md md:bg-[#285481]">
                            <MdiAccountCog></MdiAccountCog>
                            <div class="">Admin</div>
                        </div>
                    </RouterLink>
                    <RouterLink :to="{ name: 'AboutUs' }">
                        <div
                            class="text-xl text-white w-full flex justify-center items-center h-10 my-3 md:my-0 gap-2 px-2 mx-2 cursor-pointer md:h-full bg-[#33669950] rounded-md md:bg-[#285481]">
                            <Info></Info>
                            <div>About Us</div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
    <!-- 
    <div id="navbar" class="w-full h-20 bg-[#285481] z-30">
        <div class="px-[5%] flex items-center justify-between w-full h-full ">
            <RouterLink :to="{ name: 'Home' }"><img src="../assets/sit_logo.png" class="h-12 cursor-pointer" @click="userView = true">
            </RouterLink>
            <div class="flex">
                <RouterLink :to="{ name: 'AdminAnnouncement' }" >
                    <div class="text-xl text-white flex items-center gap-2 cursor-pointer h-full" v-if="userView == true" @click="userView = false">
                        <MdiAccountCog ></MdiAccountCog>
                        <div class="hidden sm:flex">Admin</div>
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'UserAnnouncement' }" >
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
    </div> -->
    <div class="w-full pt-40 h-20 drop-shadow-lg bg-white ">
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