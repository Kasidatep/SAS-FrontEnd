<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { getAnnouncementById, createAnnouncement } from "../composables/fetch";

const categoryList = [
    { id: 1, name: "ทั่วไป" },
    { id: 2, name: "ทุนการศึกษา" },
    { id: 3, name: "หางาน" },
    { id: 4, name: "ฝึกงาน" }
]

const router = useRouter()
const route = useRoute()

const isUpdateState = ref(false)
const annoucement = ref({})

const announcementTitle = ref('a')
const announcementCatagory = ref('')
const announcementDescription = ref('')
const publishDate = ref('1999-02-30')
const publishTime = ref('')
const closeDate = ref('')
const closeTime = ref('')
const announcementDisplay = ref('')

const publishDateTime = computed(()=>{
    const StringDate = `${publishDate.value} ${publishTime.value}`
    const date = new Date(StringDate)
    return date.toISOString()
})

const closeDateTime = computed(()=>{
    const StringDate = `${closeDate.value} ${closeTime.value}`
    const date = new Date(StringDate)
    return date.toISOString()
})

const showAlert = () => {
    // Swal.fire({
    //     title: 'Sorry',
    //     text: 'The request page is not available',
    //     icon: 'warning',
    //     showCancelButton: false,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'OK'
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         router.push({ name: 'Home' })
    //     }
    // })
    alert('The request page is not available')
    router.push({ name: 'Home' })
}

onMounted(async () => {
    // edit
    if (typeof router.params?.id == "Number") {
        isUpdateState.value = true
        announcement.value = await getAnnouncementById(route.params.id)
        if(announcement.value === null || announcement.value === undefined){
            showAlert()
        }
    } 
    // add
    else  {
        isUpdateState.value = false
    } 
})

const addAnnouncement = async () =>{
    const addObj = {
        announcementTitle:announcementTitle.value,
        announcementDescription:announcementDescription.value,
        publishDate:publishDate.value,
        publishTime:publishTime.value,
        closeDate: closeDateTime.value,
        announcementDisplay:announcementDisplay.value,
        categoryId:announcementCatagory.value,
        
    }
    createAnnouncement(addObj)
    console.log(addObj)
}

</script>
 
<template>
    <div class="w-full justify-center flex">
        <div class="w-[90%] sm:w-[80%] md:w-[75%] pt-14 min-h-[72.5vh]">
            <div class=" items-center flex sm:text-3xl text-2xl font-semibold">
                Add Announcement:
            </div>
            <div class="w-full flex flex-col mt-8 pb-10 md:text-lg border-gray-500 border-solid border-2 rounded-lg">
                <div class="w-full flex flex-col px-8 md:px-12 pt-10">
                    <div class="w-40 font-semibold text-lg pb-2">Title<span class="text-rose-700 pl-1">*</span></div>
                    <input v-model.trim="announcementTitle" placeholder="หัวเรื่อง"
                        class="ann-title w-full bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base">
                </div>
                <div class="w-full flex flex-col px-8 md:px-12 pt-8">
                    <div class="w-40 font-semibold text-lg pb-2">Catagory<span class="text-rose-700 pl-1">*</span></div>
                    <select v-model="announcementCatagory"
                        class="ann-catagory bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg  w-full ss:w-[13rem] px-4 h-12">
                        <option :value="catagory.id" class="" v-for="catagory in categoryList" :selected="catagory.id == 1">{{
                            catagory.name }}</option>
                    </select>
                </div>
                <div class="w-full flex flex-col px-8 md:px-12 pt-8 ">
                    <div class="w-40 font-semibold text-lg pb-2">Description<span class="text-rose-700 pl-1">*</span></div>
                    <textarea type="text" ref="desc" placeholder="รายละเอียด"
                        class="ann-description w-full rounded-lg pl-5 text-base pt-3 h-48 border border-gray-300 bg-gray-50"
                        v-model="announcementDescription" @keyup.enter="bl.focus()"></textarea>
                </div>
                <div class="w-full flex flex-col px-8 md:px-12 pt-8 ">
                    <div class="w-40 font-semibold text-lg pb-2">
                        Publish Date
                    </div>
                    <div class="flex gap-6 flex-col ss:flex-row">
                        <input type="date" v-model.trim="publishDate"
                            class="ann-publish-date w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base">
                        <input type="time" v-model.trim="publishTime" step="1"
                            class="ann-publish-time w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base">
                    </div>
                </div>
                <div class="w-full flex flex-col px-8 md:px-12 pt-8 ">
                    <div class="w-40 font-semibold text-lg pb-2">
                        Close Date
                    </div>
                    <div class="flex gap-6 flex-col ss:flex-row">
                        <input type="date" v-model.trim="closeDate"
                            class="ann-close-date w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base">
                        <input type="time" v-model.trim="closeTime" step="1"
                            class="ann-close-time w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base">
                    </div>
                </div>
                <div class="w-full flex flex-col px-8 md:px-12 pt-8 ">
                    <div class="w-40 font-semibold text-lg pb-2">
                        Display
                    </div>
                    <div>
                        <input type="checkbox" class="ann-display" v-model="announcementDisplay"><span class="pl-2">Check to show this announcement</span>
                    </div>
                </div>
                <div class="w-full flex-row px-8 md:px-12 pt-8  flex sss:gap-6 justify-between ss:justify-start">
                    <div class=" place-content-left w-fit grid text-lg">
                            <div class="ann-button border-red bg-[#3399cc] px-3 sss:px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] "
                                aria-disabled="" @click="addAnnouncement">
                                Submit
                            </div>
                    </div>
                    <div class="place-content-left w-fit grid text-lg">
                        <RouterLink :to="{ name: 'Home' }">
                            <div
                                class="ann-button border-red bg-rose-500 hover:bg-rose-700 px-3 sss:px-5 py-1 rounded-lg text-white cursor-pointer  ">
                                Cancel
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>