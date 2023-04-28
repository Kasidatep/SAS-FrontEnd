<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAnnouncementById } from "../composables/fetch";
import { toLocalDate } from "../composables/date";
import Swal from 'sweetalert2'

const route = useRoute()
const id = route.params.id
const announcement = ref('')
const router = useRouter()

onMounted(async () => {
    announcement.value = await getAnnouncementById(id)
    if(announcement.value === null || announcement.value===undefined ){
        showAlert()
    }
})

const showAlert = () => {
      Swal.fire({
        title: 'Sorry',
        text: 'The requested page is not available!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({ name: 'Home' })
        }
      })
    }
</script>
 
<template>
    <div class="w-full justify-center flex">
        <div class="w-[90%] sm:w-[80%] md:w-[75%] pt-14 min-h-[72.5vh]" >
            <div class="justify-center items-center flex sm:text-4xl text-3xl font-semibold" v-if="announcement.id!==null && announcement.id!==undefined">
                SIT Annoucement System (SAS)
            </div>
            <div class="w-full flex flex-col mt-12 pb-12 md:text-lg border-gray-500 border-solid border-2 rounded-lg" v-if="announcement.id!==null && announcement.id!==undefined">
                <div class="w-full flex flex-col md:flex-row px-8 md:px-12 pt-12">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Title</div>
                    <div class="w-full flex justify-between items-center ">
                        {{ announcement.announcementTitle }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-8 md:px-12 pt-5 md:pt-12">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Category</div>
                    <div class="w-full flex justify-between items-center ">
                        {{ announcement.announcementCategory }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-8 md:px-12 pt-5 md:pt-12">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Description</div>
                    <div class="w-full flex justify-between items-center" v-html="announcement.announcementDescription">
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-8 md:px-12 pt-5 md:pt-12">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">PublishDate</div>
                    <div class="w-full flex justify-between items-center">
                        {{ toLocalDate(announcement.publishDate) }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-8 md:px-12 pt-5 md:pt-12">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">CloseDate</div>
                    <div class="w-full flex justify-between items-center ">
                        {{ toLocalDate(announcement.closeDate) }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-8 md:px-12 pt-5 md:pt-12">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Display</div>
                    <div class="w-full flex justify-between items-center "
                        :class="announcement.announcementDisplay === 'N' ? 'text-red-700' : 'text-green-700'">
                        {{ announcement.announcementDisplay }}
                    </div>
                </div>

            </div>
            <RouterLink :to="{ name: 'Home' }" v-if="announcement.id!==null && announcement.id!==undefined">
                <div class="py-8 place-content-left w-fit grid text-lg">
                    <div class="border-red bg-[#3399cc] px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] ">
                        &lt; Back
                    </div>
                    
                </div>
            </RouterLink>
        </div>
    </div>
</template>
 
<style scoped></style>