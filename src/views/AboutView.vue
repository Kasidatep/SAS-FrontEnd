<script setup>
import LogosInstagramIconVue from '../components/icons/LogosInstagramIcon.vue';
import LogosGithubIcon from '../components/icons/LogosGithubIcon.vue';
import LogosLinkedinIconVue from '../components/icons/LogosLinkedinIcon.vue';
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
                    Welcome to the SIT Annoucement System (SAS) by 
                    <span class="text-[#336699] font-semibold">J3 Team's</span> 
                    for the INT221 Integrated Information Technology Project I course! In this web pages,
                    you will find all the project announcements and resources of the course.
                </div>
                <div class="w-full flex justify-start">
                    <hr class="w-32">
                </div>

                <div>
                    <div class="text-2xl py-2">
                        3J Team's
                    </div>
                    <div class="grid gap-5 grid-cols-1 lg:grid-cols-3 justify-between w-full">
                        <div class="flex lg:flex-col w-full rounded-lg bg-gradient-to-r lg:bg-gradient-to-b from-[#336699] bg-opacity-20 shadow-xl overflow-hidden"
                            v-for="(member) in team">
                            <img :src="member.img"
                                class="rounded-full m-5 border-2 border-[#464b63] shadow-xl w-52 lg:mx-auto lg:w-[80%]">
                            <div class="flex flex-col">
                                <div class="text-2xl text-center w-fit lg:w-full pt-5 lg:pt-2 lg:pb-1">{{ member.name }}
                                </div>
                                <div class="w-full text-left lg:text-center indent-2 font-light">
                                    <div class="mx-5 px-5 pb-3 pt-1  rounded-lg  bg-[#ffffff50]"
                                        v-html="member.description">

                                    </div>
                                </div>
                                <div class="flex justify-start pt-4 lg:pt-0">
                                    <div class="w-16 h-10 pl-5 flex items-center">
                                        <LogosInstagramIconVue class="w-6 h-6 block" />
                                    </div>
                                    <a class="w-full block h-10 pt-2 text-[#6666ee] text-md truncate" :href="member.ig">
                                        {{ member.ig }}
                                    </a>
                                </div>
                                <div class="flex justify-start">
                                    <div class="w-16 h-10 pl-5 flex items-center">
                                        <LogosLinkedinIconVue class="w-6 h-6 block" />
                                    </div>
                                    <a class="w-full block h-10 pt-2 text-[#6666ee] text-md truncate" :href="member.ln">
                                        {{ member.ln }}
                                    </a>
                                </div>
                                <div class="flex justify-start pb-3">
                                    <div class="w-16 h-10 pl-5 flex items-center">
                                        <LogosGithubIcon class="w-6 h-6 block" />
                                    </div>
                                    <a class="w-full block h-10 pt-2 text-[#6666ee] text-md truncate" :href="member.gh">
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