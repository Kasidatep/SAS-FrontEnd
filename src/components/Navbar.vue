<script setup>
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
    <div class="w-full h-20 bg-[#336699] flex items-center">
        <img src="images/sit_logo.png" class="h-12 pl-[5%] ">
    </div>
    <div id="navbar" class="w-full h-20 bg-[#336699] flex items-center z-50">
        <img src="images/sit_logo.png" class="h-12 pl-[5%] ">
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