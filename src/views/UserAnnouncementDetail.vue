<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAnnouncementByIdCount } from "../composables/fetch";
import Swal from 'sweetalert2'
import { toLocalDate } from "../composables/date";
import { ann } from "../stores/management";

const annManage = ann()

const route = useRoute()
const id = route.params.id
const announcement = ref('')
const router = useRouter()
onMounted(async () => {
    announcement.value = await getAnnouncementByIdCount(id)
    if (announcement.value === null || announcement.value === undefined) {
        showAlert()
    }
})

const showAlert = () => {
    Swal.fire({
        title: 'Sorry',
        text: 'The request page is not available',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            router.push({ name: 'Home' })
        }
    })
    // alert('The request page is not available')
    // router.push({ name: 'Home' })
}
</script>
 
<template>
    <div class="w-full justify-center flex">
        <div class="w-[95%] ss:w-[90%] sm:w-[80%] md:w-[75%] pt-14 min-h-[72.5vh]">
            <div class="w-full flex flex-col mt-8 pb-10 md:text-lg border-gray-500 border-solid border-2 rounded-lg relative"
                v-if="announcement.id !== null && announcement.id !== undefined">
                <div class="w-full px-4 ss:px-8 md:px-12 pt-10">
                    <div class="font-semibold text-2xl pb-2 md:pb-0 ann-title text-center w-[90%] mx-auto ">{{ announcement.announcementTitle
                    }}</div>
                    <div class="opacity-30 font-semibold pt-3 text-xl ann-category text-center">{{
                        announcement.announcementCategory }}</div>
                </div>
                <div class="w-full items-center px-4 ss:px-8 md:px-12 pt-5 md:pt-10 indent-12">
                 
                         <div class="ann-description" v-html="announcement.announcementDescription">
                    </div>
                    
                   
                </div>
                <div class="px-4 ss:px-8 md:px-12 pt-5 md:pt-10 flex w-full justify-end" v-if="annManage.mode == 'close'">
                    <span class="text-rose-500 pr-2">Closed on:</span><span class=" ann-close-date">{{
                        toLocalDate(announcement.closeDate) }}</span>
                </div>
                
            </div>
            <div class="flex gap-6 justify-between ss:justify-start">
                <div class="py-8 place-content-left w-fit grid text-lg">
                    <RouterLink :to="{ name: 'UserAnnouncement' }"
                        v-if="announcement.id !== null && announcement.id !== undefined">
                        <div
                            class="ann-button bg-[#3399cc] px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] ">
                            Back
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>

</style>