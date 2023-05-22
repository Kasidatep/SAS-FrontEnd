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
            <div class=" items-center flex sm:text-3xl text-2xl font-semibold justify-between pb-6 "
                v-if="announcement.id !== null && announcement.id !== undefined">
                <div class="h-full ">
                    Annoucement Detail:
                </div>
                <div class="sm:text-lg text-sm sss:text-base flex flex-col w-fit inline bg-slate-200 py-1 px-4 border rounded-lg ">
                   <span class="ann-counter text-center w-full">{{ announcement.viewCount }}</span><span class="ann-counter text-center w-full">#VIEWS</span>  
                </div>
            </div>

            <div class="w-full flex flex-col pb-10 md:text-lg border-gray-500 border-solid border-2 rounded-lg"
                v-if="announcement.id !== null && announcement.id !== undefined">
                <div class="w-full flex flex-col md:flex-row px-4 ss:px-8 md:px-12 pt-10">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Title</div>
                    <div class="w-full flex justify-between items-center ann-title">
                        {{ announcement.announcementTitle }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-4 ss:px-8 md:px-12 pt-5 md:pt-10">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Category</div>
                    <div class="w-full flex justify-between items-center ann-category">
                        {{ announcement.announcementCategory }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-4 ss:px-8 md:px-12 pt-5 md:pt-10">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Description</div>
                    <div class="w-full flex justify-between items-center ann-description"
                        v-html="announcement.announcementDescription">
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-4 ss:px-8 md:px-12 pt-5 md:pt-10">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">PublishDate</div>
                    <div class="w-full flex justify-between items-center ann-publish-date">
                        {{ toLocalDate(announcement.publishDate) }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-4 ss:px-8 md:px-12 pt-5 md:pt-10">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">CloseDate</div>
                    <div class="ann-close-date w-full flex justify-between items-center ">
                        {{ toLocalDate(announcement.closeDate) }}
                    </div>
                </div>
                <div class="w-full flex flex-col md:flex-row px-4 ss:px-8 md:px-12 pt-5 md:pt-10">
                    <div class="w-40 font-semibold text-lg pb-2 md:pb-0">Display</div>
                    <div class="ann-display w-full flex justify-between items-center "
                        :class="announcement.announcementDisplay === 'N' ? 'text-red-700' : 'text-green-700'">
                        {{ announcement.announcementDisplay }}
                    </div>
                </div>
            </div>
            <div class="flex gap-6 justify-between ss:justify-start">
                <div class="py-8 place-content-left w-fit grid text-lg">
                    <RouterLink :to="{ name: 'AdminAnnouncement' }"
                        v-if="announcement.id !== null && announcement.id !== undefined">
                        <div
                            class="ann-button border-red bg-[#3399cc] px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-[#336699] ">
                            Back
                        </div>
                    </RouterLink>
                </div>
                <div class="py-8 place-content-left w-fit grid text-lg">
                    <RouterLink :to="{ name: 'EditAnnouncement' }"
                        v-if="announcement.id !== null && announcement.id !== undefined">
                        <div
                            class="ann-button border-red bg-yellow-500 px-5 py-1 rounded-lg text-white cursor-pointer hover:bg-yellow-700 ">
                            Edit
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>