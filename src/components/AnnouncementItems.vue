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
        <!-- phone responsive -->
        <div class="border-gray-400 border-solid border-2 rounded-md   bg-[#e9f4fe] md:hidden mb-12 leading-10 mt-8 pb-2">
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
                    toLocalDate(announcement.closeDate) }}</div>
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

        <div :class="index % 2 === 1 ? 'bg-[#e9f4fe]' : 'bg-white'"
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
                    <div class="border-red bg-[#3399cc] px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] ">
                        view
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
 
<style scoped></style>