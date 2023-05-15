<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getAnnouncements, getCategories, getPages } from "../composables/fetch";
import Loading from "../components/Loading.vue";
import UserAnnouncementItems from "../components/UserAnnouncementItems.vue";
import {getPageList} from "../composables/paginationController";
import { ann } from "../stores/management"

const annManage = ann()
const size = 5

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const announcements = ref([])
const categoryList = ref([])
const pages = ref([])
const announcementCategory = ref(0)
const dropdownPageSelector = ref(0)
const route = useRoute()

const isLoading = ref(true)
const offloading = () => {
    isLoading.value = false
}

onMounted(async () => {
    categoryList.value = await getCategories()
    pages.value = await getPages(annManage.mode, annManage.page, size, announcementCategory.value)
    announcements.value = await pages.value?.content
    dropdownPageSelector.value = pages.value.page
    // announcements.value = await getAnnouncements()
    setTimeout(offloading, 250)
    offloading()
    if (typeof route.params.id == "Number") {
    }
})

const pageChange = async (page) => {
    pages.value = await getPages(annManage.mode, page, size, announcementCategory.value)
    annManage.page = await pages.value.page
    announcements.value = await pages.value.content
    console.log(annManage.page)
    dropdownPageSelector.value = pages.value.page
}

const currentCategory = async () => {
    pages.value = await getPages(annManage.mode, 0, size, announcementCategory.value)
    announcements.value = await pages.value.content
}

const switchMode = async () => {
    annManage.mode == "active" ? annManage.closeMode() : annManage.activeMode()
    annManage.page = 0
    pages.value = await getPages(annManage.mode, 0, size, announcementCategory.value)
    announcements.value = await pages.value.content
}

const getIndex = (index) => {
    return (pages.value.page * 5) + (index)
}

const showPaginate = computed(()=>{
    return getPageList(pages.value.page, pages.value.totalElements)
})
</script>

<template>
    <div class="w-full justify-center flex">
        <Loading v-show="isLoading" />

        <div class="w-[95%] sm:w-[90%] pt-14 min-h-[72.5vh]">
            <!-- responsive -->
            <div class="text-center sm:text-4xl text-3xl font-semibold">
                SIT Annoucement System (SAS)
            </div>
            <div class="w-full flex justify-between pt-12 pb-8 items-center flex-col lg:flex-row">
                <div class=" font-semibold text-lg text-center md:flex">
                    Date/Time shown in Timezone :
                    <span class="text-[#336699] pl-2"> {{ timezone }} </span>
                </div>
            </div>
            <div class="w-full flex justify-between pb-8  items-center flex-col lg:flex-row">
                <div class="w-full flex items-center justify-center lg:justify-start">
                    <div class="w-fit font-semibold text-lg pr-0 sm:pr-3">
                        Choose Category:
                    </div>
                    <select v-model="announcementCategory" @change="currentCategory"
                        class="ann-category-filter bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-[10rem] px-4 h-10">
                        <option value="0" selected>ทั้งหมด</option>
                        <option :value="category.id" class="" v-for="category in categoryList">
                            {{ category.categoryName }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center flex-col justify-center md:flex-row gap-4 pt-4 lg:pt-0 md:pb-2 lg:pb-0">
                    <div @click="switchMode" v-if="annManage.mode == 'active'"
                        class="flex w-fit ann-button bg-rose-500 hover:bg-rose-700 px-5 py-1.5 rounded-lg text-white cursor-pointer text-lg mt-4  lg:mt-0 ">
                        Closed&nbsp;Announcement
                    </div>
                    <div @click="switchMode" v-if="annManage.mode == 'close'"
                        class="flex w-fit ann-button bg-emerald-500 hover:bg-emerald-700  px-5 py-1.5 rounded-lg text-white cursor-pointer text-lg mt-4  lg:mt-0 ">
                        Active&nbsp;Announcement
                    </div>
                </div>
            </div>

            <div v-if="annManage.mode=='active'"
                class="hidden md:grid grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#336699] text-white">
                <div class="p-5 place-content-center grid">No.</div>
                <div class="p-5 grid col-span-9">Title</div>
                <div class="p-5 grid col-span-2">Category</div>
            </div>

            <div v-if="annManage.mode=='close'"
                class="hidden md:grid grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#336699] text-white">
                <div class="p-5 place-content-center grid">No.</div>
                <div class="p-5 grid col-span-7">Title</div>
                <div class="p-5 grid col-span-2">Close Date</div>
                <div class="p-5 grid col-span-2">Category</div>
            </div>


            <div v-if="announcements?.length === 0 || announcements === undefined"
                class="w-full  flex items-center justify-center  md:text-2xl sm:text-xl text-lg font-semibold text-red-600">
                <div
                    class="w-full text-center shadow-lg px-auto py-[2.5rem] rounded-md  bg-opacity-70 tracking-wider font-bold">
                    No Announcements!!
                </div>
            </div>

            <div v-for="(announcement, index) in announcements " v-if="announcements?.length !== 0" class="ann-item">
                <UserAnnouncementItems :announcement="announcement" :index="getIndex(index)" :mode="annManage.mode"/>
            </div>

            <div v-if="pages?.totalElements > 5" class="pt-12 flex justify-center md:justify-start  px-[10%] md:px-0">
                <button
                    class="ann-page-prev bg-[#336699]  px-5 py-1.5 rounded-tl-lg rounded-bl-lg text-white cursor-pointer text-lg "
                    :class="pages?.first ? 'btn' : ''" @click="pageChange(pages?.page - 1)" :disabled="pages?.first">
                    Prev
                </button>


                <button class="px-5 py-1.5 bg-[#e9f4fe] cursor-pointer text-lg hidden md:flex"
                    :class="`ann-page-${index}`, page-1 == pages?.page ? 'btnfocus' : ''"
                    v-for="(page, index) in showPaginate" :key="index" @click="pageChange(page-1)">
                    {{ page }}
                </button>
                <button class="px-5 py-1.5 bg-[#e9f4fe] cursor-pointer text-lg hidden lg:flex" v-if="pages.totalPages > 10 && pages.last == false" >
                    ...
                </button>

                <select class="flex justify-center w-full bg-[#e9f4fe] md:hidden" v-model="dropdownPageSelector" @change="pageChange(dropdownPageSelector)">
                    <option v-for="(page, index) in pages.totalPages" :key="index" :value="(page-1)"  class="text-center">
                        {{ page }}
                    </option>
                </select>

                <button
                    class="ann-page-next bg-[#336699]  px-5 py-1.5 rounded-tr-lg rounded-br-lg text-white cursor-pointer text-lg"
                    :class="pages?.last ? 'btn' : ''" @click="pageChange(pages?.page + 1)" :disabled="pages?.last" >
                    Next
                </button>
            </div>

            
        </div>
    </div>
</template>

<style scoped>
.btn {
    background-color: #919191;
    opacity: 0.5;
    cursor: default;
}

.btnfocus {
    background-color: #336699;
    color: white;
}

.btnfo:focus {
    background-color: #336699;
    color: white;
}
</style>
