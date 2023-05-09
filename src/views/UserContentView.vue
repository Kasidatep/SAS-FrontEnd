<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getAnnouncements, getCategories, getPages } from "../composables/fetch";
import Search from "../components/icons/Search.vue";
import Loading from "../components/Loading.vue";
import UserAnnouncementItems from "../components/UserAnnouncementItems.vue";
const mode = 'active'
const size = 5
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const searchText = ref('')
const announcements = ref([])
const categoryList = ref([])
const pages = ref([])
const announcementCategory = ref(1)

const route = useRoute()

const isLoading = ref(true)
const offloading = () => {
    isLoading.value = false
}

onMounted(async () => {
    categoryList.value = await getCategories()
    pages.value = await getPages(mode,0,size)
    console.log(pages.value)
    announcements.value = await pages.value.content
    // announcements.value = await getAnnouncements()
    setTimeout(offloading, 250)
    offloading()
    if (typeof route.params.id == "Number") {
        console.log("Num")
    }
})


const pageChange = async(page) => {
    pages.value = await getPages(mode,page,size)
    announcements.value = await pages.value.content
    console.log
}

const getIndex = (index) => {
    return (pages.value.page*5 )+(index)
}

const filterAnnouncements = computed(() => {
    if (searchText.value.length == 0) return announcements?.value
    return announcements?.value.filter(announcement => {
        return announcement.announcementTitle.toLowerCase().includes(searchText.value.toLowerCase()) ||
            announcement.announcementCategory.toLowerCase().includes(searchText.value.toLowerCase()) ||
            announcement.announcementDisplay.toLowerCase().includes(searchText.value.toLowerCase())
    })
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
            <div class="w-full flex justify-between  pb-8 items-center flex-col lg:flex-row">
                <div class="w-full flex items-center gap-0 xl:">
                    <div class="w-fit font-semibold text-lg  pr-3">
                        Choose Category:
                    </div>
                    <div class="mr-3 ann-category-filter w-fit ann-button bg-[#3399cc] hover:bg-[#336699] px-5 py-1.5 rounded-lg text-white cursor-pointer">
                        All
                    </div>
                    <div class="mr-3 ann-category-filter w-fit hidden 2xl:flex ann-button bg-[#3399cc] hover:bg-[#336699] px-5 py-1.5 rounded-lg text-white cursor-pointer"
                        v-for="category in categoryList" :selected="category.id == 1">
                        {{ category.categoryName }}
                    </div>
                    <select v-model="announcementCategory"
                        class="ann-category-filter bg-gray-50 border 2xl:hidden border-gray-300 text-gray-900 text-base rounded-lg w-full ss:w-[10rem] px-4 h-10">
                        <option :value="category.id" class="" v-for="category in categoryList" :selected="category.id == 1">
                            {{ category.categoryName }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center pt-8 pb-0 md:pb-4 lg:pb-0 lg:pt-0 flex-col justify-center md:flex-row gap-4"
                    v-if="announcements?.length > 0">
                    <div class="flex items-center gap-4">
                        <Search></Search>
                        <input placeholder="Search..."
                            class="text-lg h-10 rounded-lg px-4 10 w-[14rem] sss:w-[17rem] ss:w-[20rem] sm:w-[20rem] md:w-[20rem] lg:w-[12rem] 2xl:w-[20rem] bg-[#eeeeee] cursor-pointer"
                            v-model.trim="searchText">
                    </div>
                    <RouterLink :to="{ name: 'AddAnnouncement' }" v-if="announcements?.length !== 0" class="w-full">
                        <div
                            class="flex w-fit ann-button bg-[#919191] bg-opacity-50 px-5 py-1.5 rounded-lg text-white cursor-pointer text-lg mt-4  md:mt-0 ">
                            Closed&nbsp;Announcement
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div
                class="hidden md:grid grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#336699] text-white">
                <div class="p-5 place-content-center grid">No.</div>
                <div class="p-5 grid col-span-9">Title</div>
                <div class="p-5 grid col-span-2">Category</div>
            </div>

            <div v-if="announcements?.length === 0 || announcements === undefined"
                class="w-full  flex items-center justify-center sm:text-3xl text-2xl font-semibold text-red-600">
                <div
                    class="w-full text-center shadow-lg px-28 py-[2.5rem] rounded-md  bg-opacity-70 tracking-wider font-bold">
                    No Announcements!!
                </div>
            </div>

            <div v-for="(announcement, index) in filterAnnouncements " v-if="announcements?.length !== 0">
                <UserAnnouncementItems :announcement="announcement" :index="getIndex(index)" class="ann-item" />
            </div>

            <div v-if="pages.totalElements >= 5" class="pt-12 flex">
                <button
                    class="ann-page-prev bg-[#336699]  px-5 py-1.5 rounded-tl-lg rounded-bl-lg text-white cursor-pointer text-lg"
                    :class="pages.page <= 0  ? 'btn' : ''">
                    Prev
                </button>
                <button class="px-5 py-1.5 bg-[#e9f4fe] cursor-pointer text-lg " :class="`ann-page-${index}`,index == pages.page?'btnfocus':''" 
                    v-for="(page, index) in pages.totalPages" :key="index" @click="pageChange(index)">
                    {{ index + 1 }}
                </button>
                <button
                    class="ann-page-next bg-[#336699]  px-5 py-1.5 rounded-tr-lg rounded-br-lg text-white cursor-pointer text-lg"
                    :class="pages.page+1 >= pages.totalPages ? 'btn' : ''">
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
.btnfocus{
    background-color: #336699;
    color:white;
}
</style>
