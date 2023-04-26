<script setup>
import { onMounted, ref, computed, onUpdated } from "vue";
import { getAnnouncements } from "../composables/fetch";
import Search from "./icons/Search.vue";
import { RouterLink } from "vue-router";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const showmenu = ref(false)
const input = ref('')

const announcements = ref([])
console.log(announcements.value)
onMounted(async () => {
    announcements.value = await getAnnouncements()
    // filterAnnouncements.value = announcements.value
})
// const filterAnnouncements = computed(()=>{
//     return announcements.value.filter(announcement=>announcement.id.includes(input.value))
// })

</script>

<template>
    <div class="w-full justify-center flex">
        <div class="w-[90%] pt-14 min-h-[75.25vh]">
            <!-- respronsive -->
            <div class="justify-center items-center flex sm:text-4xl text-3xl font-semibold">
                SIT Annoucement System (SAS)
            </div>
            <div class="w-full flex justify-between pt-12 pb-6 items-center">
                <div class=" font-semibold sm:text-lg text-center md:flex">
                    <span class="hidden md:flex ">Date/Time shown in &#160;</span> Timezone :
                    <span class="text-[#336699] pl-2"> {{ timezone }} </span>
                </div>
                <div>
                    <Search class="sm:hidden cursor-pointer"></Search>
                </div>
                <div class="sm:flex gap-4 items-center hidden">
                    <Search class=""></Search>
                    <input placeholder="Search..." class="text-lg h-10 rounded-lg px-4 w-[12rem] lg:w-[24rem] bg-[#e8e8e8]"
                        v-model.trim="input">
                </div>
            </div>
            <div v-if="announcements.length !== 0"
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
            <div v-if="announcements.length !== 0"
                class="hidden md:grid grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#d8d8d8]">
                <div class="p-3 px-5 place-content-center grid">No.</div>
                <div class="p-3 px-5 grid lg:col-span-4 col-span-3">Title</div>
                <div class="p-3 px-5">Catagory</div>
                <div class="p-3 px-5 xl:grid col-span-2 hidden">Publish Date</div>
                <div class="p-3 px-5 xl:grid col-span-2 hidden">Close Date</div>
                <div class="p-3 px-5 place-content-center grid">Display</div>
                <div class="p-3 px-5 place-content-center grid">Action</div>
            </div>

            <div v-if="announcements.length !== 0" v-for="(announcement, index) in announcements"
                :class="index % 2 === 1 ? 'bg-[#eeeeee]' : 'bg-white'"
                class="hidden md:grid grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-x-[1px] border-b-[1px] text-lg">
                <div class="p-3 px-5 place-content-center grid self-center">{{ index + 1 }}</div>
                <div class="p-3 px-5 grid lg:col-span-4 col-span-3">
                    {{ announcement.announcementTitle }}
                </div>
                <div class="p-3 px-5 self-center grid">{{ announcement.announcementCategory }}</div>
                <div class="p-3 px-5 self-center xl:grid col-span-2 hidden">
                    {{ announcement.publishDate }}
                </div>
                <div class="p-3 px-5 self-center xl:grid col-span-2 hidden">
                    {{ announcement.closeDate }}
                </div>
                <div class="p-3 px-5 place-content-center grid"
                    :class="announcement.announcementDisplay === 'N' ? 'text-red-700' : 'text-green-700'">
                    {{ announcement.announcementDisplay }}
                </div>
                <div class="p-3 px-5 place-content-center grid">
                    <div class="border-red bg-[#3399cc] px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] "
                        @click="showmenu = !showmenu">
                        view
                    </div>
                </div>
            </div >
            <div v-if="announcements.length === 0" class="w-full pt-[12.5rem] flex items-center justify-center sm:text-3xl text-2xl font-semibold text-red-500">
                <div class="border-gray-600 border-2 border-solid px-28 py-10 rounded-md bg-gray-200 bg-opacity-70">No Annoucement!</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
