<script setup>
import { onMounted, ref, computed, onUpdated } from "vue";
import { getAnnouncements } from "../composables/fetch";
import { toLocalDate } from "../composables/date";
import Search from "../components/icons/Search.vue";
import { RouterLink } from "vue-router";
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const input = ref('')

const announcements = ref([])
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
        <div class="w-[95%] sm:w-[90%] pt-14 min-h-[72.5vh]">
            <!-- respronsive -->
            <div class="justify-center items-center flex sm:text-4xl text-3xl font-semibold">
                SIT Annoucement System (SAS)
            </div>
            <div class="w-full flex justify-between pt-12 pb-8 items-center flex-col md:flex-row">
                <div class=" font-semibold text-lg text-center md:flex">
                    Date/Time shown in Timezone :
                    <span class="text-[#336699] pl-2"> {{ timezone }} </span>
                </div>
                <div class="flex gap-4 items-center pt-8  md:pt-0" v-if="announcements.length !== 0">
                    <Search></Search>
                    <input placeholder="Search..."
                        class="text-lg h-10 rounded-lg px-4 w-[23rem] md:w-[13rem] lg:w-[25rem] xl:w-[30rem] bg-[#eeeeee]"
                        v-model.trim="input">
                </div>
            </div>

            <!-- phone responsive -->
            <div v-if="announcements.length !== 0" v-for="(announcement, index) in announcements"
                class="border-gray-400 border-solid border-2 rounded-md   bg-[#e9f4fe] md:hidden mb-12 leading-10 mt-8 pb-2">
                <div class="p-3 px-5 grid grid-flow-row">
                    <div class="flex justify-between items-center ">
                        <div
                            class="border-2 border-solid border-gray-400 px-4 py-1  -mt-8 rounded-md bg-[#336699] text-white text-lg">
                            {{ index + 1 }}</div>
                        <RouterLink :to="{ name: 'AnnouncementDetailView', params: { id: announcement.id } }">
                            <div
                                class="border-2 border-solid border-gray-400 px-4 py-1 -mt-8 rounded-md bg-[#336699] text-white text-lg cursor-pointer">
                                View</div>
                        </RouterLink>
                    </div>
                    <div class=" pt-6 w-full font-semibold text-lg pb-3 text-center">
                        {{ announcement.announcementTitle }} 
                    </div>
                    <div class="flex items-center"><span class="font-semibold w-28 inline-block">PublishDate </span> {{
                        toLocalDate(announcement.publishDate) }}</div>
                    <div class="flex items-center"><span class="font-semibold w-28 inline-block">CloseDate </span> {{
                        toLocalDate(announcement.publishDate) }}</div>
                    <div class="flex justify-between">
                        <div class="w-full">
                            <span class="font-semibold w-28 inline-block">Display</span><span
                                :class="announcement.announcementDisplay === 'N' ? 'text-red-700' : 'text-green-700'"> {{
                                    announcement.announcementDisplay }}</span>
                        </div>
                        <div class="w-full ">
                            <span class="font-semibold w-24 inline-block">Category</span> {{
                                announcement.announcementCategory }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- responsive -->
            <div v-if="announcements.length !== 0"
                class="hidden md:grid grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#336699] text-white">
                <div class="p-5 px-5 place-content-center grid">No.</div>
                <div class="p-5 px-5 grid lg:col-span-4 col-span-3">Title</div>
                <div class="p-5 px-5">Catagory</div>
                <div class="p-5 px-5 xl:grid col-span-2 hidden">Publish Date</div>
                <div class="p-5 px-5 xl:grid col-span-2 hidden">Close Date</div>
                <div class="p-5 px-5 place-content-center grid">Display</div>
                <div class="p-5 px-5 place-content-center grid">Action</div>
            </div>

            <div v-if="announcements.length !== 0" v-for="(announcement, index) in announcements"
                :class="index % 2 === 1 ? 'bg-[#e9f4fe]' : 'bg-white'"
                class="hidden md:grid grid-cols-7 lg:grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-x-[1px] border-b-[1px] text-lg">
                <div class="p-4 px-5 place-content-center grid self-center">{{ index + 1 }}</div>
                <div class="p-4 px-5 grid lg:col-span-4 col-span-3 self-center">
                    {{ announcement.announcementTitle }}
                </div>
                <div class="p-4 px-5 self-center grid">{{ announcement.announcementCategory }}</div>
                <div class="p-4 px-5 self-center xl:grid col-span-2 hidden">
                    {{ toLocalDate(announcement.publishDate) }}
                </div>
                <div class="p-4 px-5 self-center xl:grid col-span-2 hidden">
                    {{ toLocalDate(announcement.closeDate) }}
                </div>
                <div class="p-4 px-5 place-content-center grid"
                    :class="announcement.announcementDisplay === 'N' ? 'text-red-700' : 'text-green-700'">
                    {{ announcement.announcementDisplay }}
                </div>
                <RouterLink :to="{ name: 'AnnouncementDetailView', params: { id: announcement.id } }"
                    class="flex item-center justify-center">
                    <div class="p-4 px-5 place-content-center grid self-center">
                        <div
                            class="border-red bg-[#3399cc] px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] ">
                            view
                        </div>
                    </div>
                </RouterLink>
            </div>
            <div v-if="announcements.length === 0"
                class="w-full pt-[11rem] flex items-center justify-center sm:text-3xl text-2xl font-semibold text-red-600">
                <div
                    class="border-gray-600 border-8 border-double px-28 py-10 rounded-md  bg-opacity-70 tracking-wider font-bold">
                    No Annoucement!!</div>
            </div>
            <div v-if="announcements.length !== 0" class="pt-8 flex justify-end">
                <div class="border-[1px] border-double border-gray-400 w-fit p-2 px-4 bg-[#e9f4fe] bg-opacity-100 rounded-lg">Total Annoucement : {{ announcements.length }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
