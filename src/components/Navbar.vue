<script setup>
import Search from './icons/Search.vue'
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
    <div class="w-full h-20 bg-[#336699]">
        <div class="px-[5%] flex items-center justify-between w-full h-full">
            <img src="images/sit_logo.png" class="h-12">
            <div class="flex gap-4">
                <Search class="text-white"></Search>
                <input placeholder="Search..." class="text-lg rounded-lg px-4 w-[20rem] bg-white"> 
            </div>
        </div>
    </div>
    <div id="navbar" class="w-full h-20 bg-[#336699] z-50">
        <div class="px-[5%] flex items-center justify-between w-full h-full">
            <img src="images/sit_logo.png" class="h-12">
            <div>
                <input>
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
}
</style>