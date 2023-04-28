<script setup>
import Info from '../components/icons/Info.vue'
import team from "../assets/data/team.json"
</script>
 
<template>
    <div class="w-full min-h-[72.5vh]">
        <div class="w-full pt-16 flex items-center justify-center font-semibold">
            <div class="w-[80%]">
                <div class="text-3xl w-fullfont-bold text-center h-fit px-24 py-3 rounded-lg">
                    About Us
                </div>
                <div class="w-full flex justify-center">
                    <hr class="w-96">
                </div>
                <div class="text-xl w-full font-normal text-center h-fit px-5 lg:px-24 py-3 rounded-lg pb-5">
                    Welcome to the SIT Annoucement System (SAS) by <span class="text-[#336699] font-semibold">J3 Teams</span> for the INT221 Integrated Information Technology Project I course! In this web pages, you will find all the project announcements and resources you need to successfully complete the course.
                </div>
                <div class="w-full flex justify-start">
                    <hr class="w-32">
                </div>
                
                <div>
                    <div class="text-2xl py-2">
                     Members List
                    </div>
                    <div class="grid gap-5 grid-cols-1 lg:grid-cols-3 justify-between w-full">
                        <div class="flex lg:flex-col w-full rounded-lg bg-[#336699] bg-opacity-20 shadow-xl overflow-hidden" v-for="(member) in team">
                            <img :src="member.img" class="rounded-full m-5 border-2 border-[#464b63] shadow-xl w-52 lg:mx-auto lg:w-[80%]">
                            <div class="flex flex-col">
                                <div class="text-2xl text-center w-fit lg:w-full pt-5 lg:pt-2">{{member.name}}</div>
                                <div class="w-96 md:w-[36rem] lg:w-[90%] px-5 pb-3 pt-1 indent-2 font-light truncate">
                                    {{ member.description }}
                                </div>
                                <div class="flex justify-start pt-4 lg:pt-0">
                                    <div class="w-16 h-10 pl-3">
                                        <Info class="w-8 h-8"/>
                                    </div>
                                    <a class="w-full block h-10 pt-1 text-[#6666ee] text-md" :href="member.ig">
                                        {{ member.ig }}
                                    </a>
                                </div>
                                <div class="flex justify-start">
                                    <div class="w-16 h-10 pl-3">
                                        <Info class="w-8 h-8"/>
                                    </div>
                                    <a class="w-full block h-10 pt-1 text-[#6666ee] text-md" :href="member.ln">
                                        {{ member.ln }}
                                    </a>
                                </div>
                                <div class="flex justify-start">
                                    <div class="w-16 h-10 pl-3">
                                        <Info class="w-8 h-8"/>
                                    </div>
                                    <a class="w-full block h-10 pt-1 text-[#6666ee] text-md" :href="member.gh">
                                        {{ member.gh }}
                                    </a>
                                </div>
                                
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    </div>
</template>
 
<style scoped></style>