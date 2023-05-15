<script setup>
import { onMounted, ref, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAnnouncements,deleteAnnouncementById } from "../composables/fetch";
import Search from "../components/icons/Search.vue";
import Loading from "../components/Loading.vue";
import AnnouncementItems from "../components/AnnouncementItems.vue";
import Swal from "sweetalert2";


const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const searchText = ref('')
const announcements = ref([])

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const offloading = () => {
    isLoading.value = false
}

onMounted(async () => {
    announcements.value = await getAnnouncements()
    setTimeout(offloading, 250)
    offloading()
    if(typeof route.params.id=="Number"){
        console.log("Num")
    }
})
const filterAnnouncements = computed(() => {
    if (searchText.value.length == 0) return announcements?.value
    return announcements?.value.filter(announcement => {
        return announcement.announcementTitle.toLowerCase().includes(searchText.value.toLowerCase()) ||
            announcement.announcementCategory.toLowerCase().includes(searchText.value.toLowerCase()) ||
            announcement.announcementDisplay.toLowerCase().includes(searchText.value.toLowerCase())
    })
})

const deleteAnnoucement = async (id) => { 
    const status = await deleteAnnouncementById(id)
    if(status==200){
          // announcements.value = announcements.value.filter(announcement=> announcement.id !== id)
           announcements.value = await getAnnouncements()
          
           
    }else{
       
    }
}

const showDeleteAlert = async (deleteId) => {
   // await router.push({ name: 'DeleteAnnouncement' , params: {id:deleteId}})
    
    Swal.fire({
        title: 'Do you want to delete?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteAnnoucement(deleteId)
        }
    })
}

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
                <div class="flex  items-center pt-8 pb-0 md:pb-4 lg:pb-0 lg:pt-0 flex-col justify-center md:flex-row gap-4"
                    v-if="announcements?.length > 0">
                    <div class="flex items-center gap-4">
                        <Search></Search>
                        <input placeholder="Search..."
                            class="text-lg h-10 rounded-lg px-4 10 w-[14rem] sss:w-[17rem] ss:w-[20rem] sm:w-[20rem] md:w-[20rem] lg:w-[15rem] xl:w-[20rem] 2xl:w-[25rem] bg-[#eeeeee] cursor-pointer"
                            v-model.trim="searchText">
                    </div>
                    <RouterLink :to="{ name: 'AddAnnouncement' }" v-if="announcements?.length !== 0">
                        <div
                            class="w-fit ann-button   bg-emerald-500 px-5 py-1.5 rounded-lg text-white cursor-pointer hover:bg-emerald-700 text-lg mt-4  md:mt-0">
                            Add Annoucement
                        </div>
                    </RouterLink>
                </div>
            </div>

            <div 
                class="hidden md:grid grid-cols-8 lg:grid-cols-9 xl:grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#336699] text-white">
                <div class="p-5 place-content-center grid">No.</div>
                <div class="p-5  grid lg:col-span-4 col-span-3">Title</div>
                <div class="p-5 ">Category</div>
                <div class="p-5  xl:grid col-span-3 grid-cols-4 hidden">
                    <div class="col-span-2">Publish Date</div>
                    <div class="col-span-2">Close Date</div>
                </div>
                <div class="p-5 place-content-center grid">Display</div>
                <div class="p-5 place-content-center grid col-span-2">Action</div>
            </div>

            <div v-if="announcements?.length === 0 || announcements === undefined"
                class="w-full  flex items-center justify-center  md:text-2xl sm:text-xl text-lg font-semibold text-red-600">
                <div
                    class="w-full text-center shadow-lg px-auto py-[2.5rem] rounded-md  bg-opacity-70 tracking-wider font-bold">
                    No Announcements!!
                </div>
            </div>

            <div v-for="(announcement, index) in filterAnnouncements " v-if="announcements?.length !== 0">
                <AnnouncementItems :announcement="announcement" @deleteAnnoucement="showDeleteAlert" :index="index" class="ann-item" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
