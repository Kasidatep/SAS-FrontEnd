<script setup>
import { toLocalDate } from "../composables/date";
import { RouterLink } from "vue-router";

defineProps({
    announcement: Object,
    index: Number
})

</script>
 
<template>
    <div>

        <div :class="index % 2 === 1 ? 'bg-[#e9f4fe]' : 'bg-white'"
            class="hidden md:grid grid-cols-12 border-gray-400 border-solid border-x-[1px] border-b-[1px] text-lg">
            <div class="p-4 place-content-center grid self-center">{{ index + 1 }}</div>
            <div class="ann-title p-4 grid col-span-9 self-center">
                <RouterLink :to="{ name: 'UserAnnouncementDetail', params: { id: announcement.id } }" class="hover:text-[#336699]">
                    {{ announcement.announcementTitle }}
                </RouterLink>
            </div>
            <div class="ann-category p-4  col-span-2 self-center grid">{{ announcement.announcementCategory }}</div>
            <!-- <div class=" p-4 self-center xl:grid col-span-3 hidden grid-cols-4">
                <div class="ann-publish-date col-span-2">{{ toLocalDate(announcement.publishDate) }}</div>
                <div class="ann-close-date col-span-2"> {{ toLocalDate(announcement.closeDate) }}</div>
            </div> -->
        </div>

        <!-- phone responsive -->
        <div class="border-gray-400 border-solid border-2 rounded-md   bg-[#e9f4fe] md:hidden mb-12 leading-10 mt-8 pb-2">
            <div class="p-3 px-5 grid grid-flow-row">
                <div class="flex  items-center ">
                    <div
                        class="border-2 border-solid border-white px-4 py-1  -mt-8 rounded-md bg-[#336699] text-white text-lg">
                        {{ index + 1 }}</div>
                </div>
                <div class="ann-title pt-6 w-full font-semibold text-lg pb-3 text-center">
                    {{ announcement.announcementTitle }}
                </div>
                <div class="ann-publish-date flex items-center"><span class="font-semibold w-28 inline-block">PublishDate
                    </span> {{
                        toLocalDate(announcement.publishDate) }}</div>
                <div class="ann-close-date flex items-center"><span class="font-semibold w-28 inline-block">CloseDate
                    </span> {{
                        toLocalDate(announcement.closeDate) }}</div>
                <div class="ss:flex justify-between">
                    <div class="w-full ann-display flex">
                        <span class="font-semibold inline-block w-28">Display</span><span
                            :class="announcement.announcementDisplay === 'N' ? 'text-red-700' : 'text-green-700'"> {{
                                announcement.announcementDisplay }}</span>
                    </div>
                    <div class="w-full ann-category flex">
                        <span class="font-semibold inline-block w-28">Category</span>
                        <span class="">{{
                            announcement.announcementCategory }}</span>
                    </div>
                </div>
                <div class="pt-3 flex gap-2">
                    <RouterLink :to="{ name: 'AnnouncementDetailView', params: { id: announcement.id } }" class="w-full">
                        <button
                            class="w-full ann-button text-center  px-4 py-1  rounded-md bg-[#3399cc] hover:bg-[#336699] text-white text-lg cursor-pointer">
                            View</button>
                    </RouterLink>
                    <RouterLink :to="{ name: 'DeleteAnnouncement', params: { id: announcement.id } }">
                        <button
                            class="w-fit ann-button   px-4 py-1  rounded-md bg-rose-500 hover:bg-rose-700 text-white text-lg cursor-pointer"
                            @click="deleteAnnoucement">
                            Delete</button>
                    </RouterLink>

                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>