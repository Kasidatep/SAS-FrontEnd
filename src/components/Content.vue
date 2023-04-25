<script setup>
import { ref } from "vue";
import datas from "../assets/data/mock-up.json";
console.log(datas.announcement);
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const announcements = ref(datas.announcement)
const showmenu = ref(false)
</script>

<template>
    <div class="w-full justify-center flex">
        <div v-if="showmenu" class="h-[40rem] bg-blue z-50 w-[80%] mb-auto fixed mt-auto rounded-[2rem] bg-[#336699]">
        </div>
        <div class="w-[90%] pt-14">
            <!-- respronsive -->
            <div class="justify-center items-center flex text-4xl font-semibold">
                SIT Annoucement System (SAS)
            </div>
            <div class="pt-12 pb-6 font-semibold text-lg text-center md:flex">
                Date/Time shown in Timezone:
                <span class="text-[#336699] pl-2"> {{ timezone }} </span>
            </div>
            <div
                class="border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#e8e8e8] md:hidden">
                <div class="p-3 px-5 grid grid-flow-row">
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                    <div>a</div>
                </div>
            </div>

            <!-- respronsive -->
            <div
                class="hidden md:grid grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#e8e8e8]">
                <div class="p-3 px-5 place-content-center grid">No.</div>
                <div class="p-3 px-5 grid lg:col-span-4 col-span-3">Title</div>
                <div class="p-3 px-5">Catagory</div>
                <div class="p-3 px-5 xl:grid col-span-2 hidden">Publish Date</div>
                <div class="p-3 px-5 xl:grid col-span-2 hidden">Close Date</div>
                <div class="p-3 px-5 place-content-center grid">Display</div>
                <div class="p-3 px-5 place-content-center grid">Action</div>
            </div>

            <div v-for="announcement in announcements"
                class="hidden md:grid grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-x-[1px] border-b-[1px] text-lg">
                <div class="p-3 px-5 place-content-center grid self-center">{{ announcement.id }}</div>
                <div class="p-3 px-5 grid lg:col-span-4 col-span-3">
                    {{ announcement.title }}
                </div>
                <div class="p-3 px-5 self-center grid">{{ announcement.catagory }}</div>
                <div class="p-3 px-5 self-center xl:grid col-span-2 hidden">
                    {{ announcement.date }}
                </div>
                <div class="p-3 px-5 self-center xl:grid col-span-2 hidden">
                    {{ announcement.closedate }}
                </div>
                <div class="p-3 px-5 place-content-center grid"
                    :class="announcement.display === 'N' ? 'text-red-700' : 'text-green-700'">
                    {{ announcement.display }}
                </div>
                <div class="p-3 px-5 place-content-center grid">
                    <div class="border-red bg-[#3399cc] px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] "
                        @click="showmenu = !showmenu">
                        {{ announcement.action }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
