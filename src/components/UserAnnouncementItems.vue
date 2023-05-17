<script setup>
import { toLocalDate } from "../composables/date";
import { RouterLink } from "vue-router";
import { getAnnouncementCount } from "../composables/fetch";
import { useRouter } from "vue-router";
const props = defineProps({
    announcement: Object,
    index: Number,
    mode: String
}
)
const router = useRouter()
const goToDetail = async (id) => {
    const status = await getAnnouncementCount(id)
    router.push({ name: 'UserAnnouncementDetail', params: { id: id } })
    console.log(status)
    console.log(id)
}
</script>
 
<template>
    <div>

        <div :class="index % 2 === 1 ? 'bg-[#e9f4fe]' : 'bg-white'" v-if="mode == 'active'"
            class="hidden md:grid grid-cols-12 border-gray-400 border-solid border-x-[1px] border-b-[1px] text-lg">
            <div class="p-4 place-content-center grid self-center">{{ index + 1 }}</div>
            <div class="ann-title p-4 grid col-span-9 self-center">
                <div @click="goToDetail(announcement.id)" class="hover:text-[#336699] cursor-pointer w-fit">
                    {{ announcement.announcementTitle }}
                </div>
            </div>
            <div class="ann-category p-4  col-span-2 self-center grid">{{ announcement.announcementCategory }}</div>
        </div>

        <div :class="index % 2 === 1 ? 'bg-[#e9f4fe]' : 'bg-white'" v-if="mode == 'close'"
            class="hidden md:grid grid-cols-12 border-gray-400 border-solid border-x-[1px] border-b-[1px] text-lg">
            <div class="p-4 place-content-center grid self-center">{{ index + 1 }}</div>
            <div class="ann-title p-4 grid col-span-7 self-center">
                <div @click="goToDetail(announcement.id)" class="hover:text-[#336699] cursor-pointer">
                    {{ announcement.announcementTitle }}
                </div>
            </div>
            <div class="ann-close-date p-4 col-span-2 self-center grid" v-if="mode == 'close'"> {{
                toLocalDate(announcement.closeDate) }}</div>
            <div class="ann-category p-4 col-span-2 self-center grid">{{ announcement.announcementCategory }}</div>
        </div>



        <!-- phone responsive -->
        <div class="border-gray-400 border-solid border-2 rounded-md   bg-[#e9f4fe] md:hidden mb-12 leading-10 mt-8 pb-2">
            <div class="p-3 px-5 grid grid-flow-row">
                <div class="flex  items-center ">
                    <div
                        class="border-2 border-solid border-white px-4 py-1  -mt-8 rounded-md bg-[#336699] text-white text-lg">
                        {{ index + 1 }}</div>
                </div>
                <div class="ann-title pt-6 w-full font-semibold text-lg pb-2 flex justify-center">
                    <div @click="goToDetail(announcement.id)" class="hover:text-[#336699] cursor-pointer w-fit">
                        {{ announcement.announcementTitle }}
                    </div>
                </div>
                <div class="w-full ann-category flex justify-center py-4">
                    <span class="bg-[#336699]  rounded-lg text-white w-1/2 text-center">{{
                        announcement.announcementCategory }}</span>
                </div>
                <div class="flex w-full justify-center" v-if="mode == 'close'">
                    <span class="text-rose-500 pr-2">Closed on:</span><span class=" ann-close-date">{{
                        toLocalDate(announcement.closeDate) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>