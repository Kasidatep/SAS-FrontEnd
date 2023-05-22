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
                <div class="text-3xl w-fullfont-bold text-center h-fit px-auto md:px-24 py-5 rounded-lg">
                    About Us
                </div>
                <div class="w-full flex justify-center">
                    <hr class="w-96">
                </div>
                <div class="sss:text-xs ss:text-sm sm:text-xl w-full font-normal text-center h-fit px-5 lg:px-24 py-5 rounded-lg pb-5">
                    Welcome to the SIT Annoucement System (SAS) by
                    <span class="text-[#336699] font-semibold">3J Team's</span>
                    for the INT221 Integrated Information Technology Project I course! In this web pages,
                    you will find all the project announcements and resources of the course.
                </div>
                <div class="w-full flex justify-start">
                    <hr class="w-32">
                </div>

                <div>
                    <div class="text-2xl py-4">
                        3J Team's
                    </div>
                    <div class="grid gap-5 grid-cols-1 lg:grid-cols-3 justify-between w-full">
                        <div class="flex flex-col ss:flex-row lg:flex-col w-full rounded-lg bg-gradient-to-r lg:bg-gradient-to-b from-[#9abee1] bg-opacity-20 shadow-xl overflow-x-scroll md:overflow-hidden mb-4 lg:mb-0"
                            v-for="(member) in team">
                            <img :src="member.img"
                                class="rounded-full m-5 border-2 border-[#464b63] shadow-xl w-36 sss:w-44 ss:w-52 mx-auto ss:mx-4 lg:mx-auto lg:w-[80%]">
                            <div class="flex flex-col ">
                                <div class="w-full text-2xl text-center ss:text-left lg:text-center lg:w-full pt-5 lg:pt-2 lg:pb-1 ">{{ member.name }}
                                </div>
                                <div
                                    class="w-full text-left lg:text-center indent-2 font-light pt-4  min-h-[85px] hidden lg:block">
                                    <div class="mx-5 px-5 pb-3 pt-1  rounded-lg  bg-[#ffffff50]  h-full flex items-center justify-center"
                                        v-html="member.description">

                                    </div>
                                </div>
                                <div class="flex justify-start pt-6 lg:pt-3">
                                    <div class="w-16 h-10 pl-5 flex items-center">
                                        <LogosInstagramIconVue class="w-6 h-6 block" />
                                    </div>
                                    <a class="w-full block h-10 pt-2 text-[#6666ee] text-md truncate">
                                        <a :href="member.ig" target="_blank">{{ member.ig.slice(12) }}</a>
                                    </a>
                                </div>
                                <div class="flex justify-start">
                                    <div class="w-16 h-10 pl-5 flex items-center">
                                        <LogosLinkedinIconVue class="w-6 h-6 block" />
                                    </div>
                                    <a class="w-full block h-10 pt-2 text-[#6666ee] text-md truncate">
                                        <a :href="member.ln" target="_blank">{{ member.ln.slice(12) }}</a>
                                    </a>
                                </div>
                                <div class="flex justify-start pb-3">
                                    <div class="w-16 h-10 pl-5 flex items-center">
                                        <LogosGithubIcon class="w-6 h-6 block" />
                                    </div>
                                    <a class="w-full block h-10 pt-2 text-[#6666ee] text-md truncate">
                                        <a :href="member.gh" target="_blank">{{ member.gh.slice(8) }}</a>
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