<script setup>
import { ref } from 'vue';
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>
 
<template>
    <div class="w-full justify-center flex">
        <div class="w-[90%] pt-14">
            <div class="justify-center items-center flex md:text-4xl text-3xl font-semibold">SIT Anoucement System (SAS)
            </div>
            <div class="py-6 font-semibold text-lg">
                Date/Time shown in Timezone: <span class="text-[#336699]">{{ timezone }} </span>
            </div>
            <div
                class="grid grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-[1px] rounded-t-md font-semibold text-lg bg-[#e8e8e8]">
                <div class="p-3 px-5 place-content-center grid ">No.</div>
                <div class="p-3 px-5 grid col-span-4 ">Title</div>
                <div class="p-3 px-5 ">Catagory</div>
                <div class="p-3 px-5 xl:grid col-span-2 hidden">Publish Date</div>
                <div class="p-3 px-5 xl:grid col-span-2 hidden">Close Date</div>
                <div class="p-3 px-5 place-content-center grid">Display</div>
                <div class="p-3 px-5 place-content-center grid">Action</div>
            </div>
            <div class="grid grid-cols-8 xl:grid-cols-12 border-gray-400 border-solid border-x-[1px] border-b-[1px] text-lg ">
                <div class="p-3 px-5 place-content-center grid self-center">1</div>
                <div class="p-3 px-5 grid col-span-4 ">Lorem ipsum dolor sit,odi deleniti accusantium laudantium voluptates
                    totam eaque quae?</div>
                <div class="p-3 px-5 self-center grid">ทั่วไป</div>
                <div class="p-3 px-5 self-center xl:grid col-span-2 hidden">19 Apr 2023, 06.00</div>
                <div class="p-3 px-5 self-center xl:grid col-span-2 hidden">8 May 2023, 18.00</div>
                <div class="p-3 px-5 place-content-center grid" :class="1 === 1 ? 'text-red-700' : 'text-green-500'">Y</div>
                <div class="p-3 px-5 place-content-center grid ">
                    <div class="border-red bg-[#3399cc] px-5 py-1 rounded-lg text-white">
                        view
                    </div>
                </div>
            </div>
            <div class="w-[1%]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati doloremque sint, blanditiis odio provident corrupti velit consequatur sapiente facilis, reiciendis iste deleniti suscipit, culpa labore quibusdam maxime autem iure sit!
            </div>
        </div>
    </div>
</template>
 
<style scoped></style>