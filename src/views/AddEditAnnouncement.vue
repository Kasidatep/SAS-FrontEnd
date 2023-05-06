<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncementById,
} from "../composables/fetch";
import annDisplayEnum from "../composables/announcementDisplayEnum";
import { isoToDate, isoToTime, toDate } from "../composables/date";
import Swal from "sweetalert2";

const categoryList = [
  { id: 1, name: "ทั่วไป" },
  { id: 2, name: "ทุนการศึกษา" },
  { id: 3, name: "หางาน" },
  { id: 4, name: "ฝึกงาน" },
];

const router = useRouter();
const route = useRoute();

const isUpdateState = ref(false);
const announcement = ref(null);

const announcementTitle = ref(null);
const announcementCatagory = ref(1);
const announcementDescription = ref(null);
const publishDate = ref(null);
const publishTime = ref(null);
const closeDate = ref(null);
const closeTime = ref(null);
const announcementDisplay = ref(false);
const id = ref(null);
const publishDateTime = computed(() => {
  return toDate(publishDate.value, publishTime.value);
});
const closeDateTime = computed(() => {
  return toDate(closeDate.value, closeTime.value);
});
const annDisplay = computed(() => {
  return announcementDisplay.value == true
    ? annDisplayEnum.Y
    : annDisplayEnum.N;
});

const disabledBtn = computed(() => {
  return (
    announcementTitle.value == null ||
    announcementTitle.value?.length == 0 ||
    announcementDescription.value == null ||
    announcementDescription.value?.length == 0 ||
    isSameValue.value
  );
});

const isSameValue = computed(() => {
  return announcementTitle.value == announcement.value?.announcementTitle &&
    announcementCatagory.value ==
      findCategoryId(announcement.value?.announcementCategory) &&
    announcementDescription.value ==
      announcement.value?.announcementDescription &&
    publishDate.value == isoToDate(announcement.value?.publishDate) &&
    publishTime.value == isoToTime(announcement.value?.publishDate) &&
    closeDate.value == isoToDate(announcement.value?.closeDate) &&
    closeTime.value == isoToTime(announcement.value?.closeDate) &&
    announcementDisplay.value ==
      (announcement.value?.announcementDisplay == "Y")
    ? true
    : false;
});

const validateTitle = computed(() => {
  if (announcementTitle.value?.length == 0 || announcementTitle.value == null)
    return { css: "text-red-500", msg: "not be empty" };
  else if (
    announcementTitle.value?.length > 150 &&
    announcementTitle.value?.length < 200
  )
    return {
      css: "text-yellow-500",
      msg: `Remaining: ${200 - announcementTitle.value?.length}`,
    };
  else if (announcementTitle.value?.length >= 200)
    return { css: "text-red-500", msg: "too long." };
  else return { css: "text-green-500", msg: "" };
});

const validateDesc = computed(() => {
  if (
    announcementDescription.value?.length == 0 ||
    announcementDescription.value == null
  )
    return { css: "text-red-500", msg: "not be empty" };
  else if (
    announcementDescription.value?.length > 9000 &&
    announcementDescription.value?.length < 10000
  )
    return {
      css: "text-yellow-500",
      msg: `Remaining: ${10000 - announcementDescription.value?.length}`,
    };
  else if (announcementDescription.value?.length >= 10000)
    return { css: "text-red-500", msg: "too long." };
  else return { css: "text-green-500", msg: "" };
});

const findCategoryId = (category) =>
  categoryList.find((c) => c.name == category)?.id;

const setAnnouncement = () => {
  announcementTitle.value = announcement.value?.announcementTitle;
  announcementCatagory.value = findCategoryId(
    announcement.value?.announcementCategory
  );
  announcementDescription.value = announcement.value?.announcementDescription;
  publishDate.value = isoToDate(announcement.value?.publishDate);
  publishTime.value = isoToTime(announcement.value?.publishDate);
  closeDate.value = isoToDate(announcement.value?.closeDate);
  closeTime.value = isoToTime(announcement.value?.closeDate);
  announcementDisplay.value =
    announcement.value?.announcementDisplay == "Y" ? true : false;
  id.value = announcement.value?.id;
};

const showAlert = (type, title, desc, cancelButton, goBack) => {
  Swal.fire({
    title: title,
    text: desc,
    icon: type,
    showCancelButton: cancelButton,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then((result) => {
    if (result.isConfirmed) {
      if (goBack) router.go(-1);
    }
  });
  //alert(desc)
  //if(goBack) router.go(-1)
};

onMounted(async () => {
  if (typeof route.params.id !== "undefined") {
    isUpdateState.value = true;
    announcement.value = await getAnnouncementById(route.params.id);
    if (announcement.value === null || announcement.value === undefined) {
      showAlert(
        "warning",
        "sorry",
        "The request page is not available",
        false,
        true
      );
    }
    setAnnouncement();
  } else {
    isUpdateState.value = false;
  }
});

const addAnnouncement = async () => {
  if (!disabledBtn.value) {
    const addObj = {
      announcementTitle: announcementTitle.value,
      announcementDescription: announcementDescription.value,
      publishDate: publishDateTime.value,
      closeDate: closeDateTime.value,
      announcementDisplay: annDisplay.value,
      categoryId: announcementCatagory.value,
    };
    let status = 400;
    if (isUpdateState.value == false) {
      status = await createAnnouncement(addObj);
    } else {
      addObj.id = id.value;
      status = await updateAnnouncementById(addObj);
    }
    if (status == 200)
      showAlert(
        "success",
        "Successfully",
        `Your announcement has ${isUpdateState.value ? "updated" : "created"}.`,
        false,
        true
      );
    else
      showAlert(
        "error",
        "Sorry",
        `Your announcement cannot be ${
          isUpdateState.value ? "update" : "create"
        }.`,
        false,
        true
      );
  } else {
    //showAlert('error', 'Sorry', 'Some value cannot be empty', false, false)

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1250,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "warning",
      title: "Some value cannot be empty",
    });
  }
};
</script>

<template>
  <div class="w-full justify-center flex">
    <div class="w-[95%] ss:w-[90%] sm:w-[80%] md:w-[75%] pt-14 min-h-[72.5vh]">
      <div class="pl-2 items-center flex sm:text-3xl text-2xl font-semibold">
        {{ isUpdateState ? "Edit" : "Add" }} Announcement:
      </div>
      <div
        class="w-full flex flex-col mt-8 pb-10 md:text-lg border-gray-500 border-solid border-2 rounded-lg"
      >
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-10">
          <div class="flex justify-between">
            <div class="w-fit font-semibold text-lg pb-2">
              Title<span class="text-rose-700 pl-1">*</span>
            </div>
            <div
              class="text-xs md:text-sm align-text-bottom pt-3"
              :class="validateTitle.css"
            >
              {{ validateTitle.msg }}
            </div>
          </div>

          <input
            v-model.trim="announcementTitle"
            placeholder="หัวเรื่อง"
            maxlength="200"
            class="ann-title w-full bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base"
          />
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">
            Catagory<span class="text-rose-700 pl-1">*</span>
          </div>
          <select
            v-model="announcementCatagory"
            class="ann-catagory bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full ss:w-[13rem] px-4 h-12"
          >
            <option
              :value="catagory.id"
              class=""
              v-for="catagory in categoryList"
              :selected="catagory.id == 1"
            >
              {{ catagory.name }}
            </option>
          </select>
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="flex justify-between">
            <div class="w-fit font-semibold text-lg pb-2">
              Description<span class="text-rose-700 pl-1">*</span>
            </div>
            <div
              class="text-xs md:text-sm align-text-bottom pt-3"
              :class="validateDesc.css"
            >
              {{ validateDesc.msg }}
            </div>
          </div>
          <textarea
            type="text"
            ref="desc"
            placeholder="รายละเอียด"
            maxlength="10000"
            class="ann-description w-full rounded-lg pl-5 text-base pt-3 h-48 border border-gray-300 bg-gray-50"
            v-model.trim="announcementDescription"
            @keyup.enter="bl.focus()"
          ></textarea>
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">Publish Date</div>
          <div class="flex gap-6 flex-col ss:flex-row">
            <input
              type="date"
              v-model.trim="publishDate"
              class="ann-publish-date w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base"
            />
            <input
              type="time"
              v-model.trim="publishTime"
              class="ann-publish-time w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base"
            />
          </div>
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">Close Date</div>
          <div class="flex gap-6 flex-col ss:flex-row">
            <input
              type="date"
              v-model.trim="closeDate"
              class="ann-close-date w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base"
            />
            <input
              type="time"
              v-model.trim="closeTime"
              class="ann-close-time w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base"
            />
          </div>
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">Display</div>
          <div>
            <input
              type="checkbox"
              class="ann-display cursor-pointer"
              id="anndisplay"
              v-model="announcementDisplay"
            />
            <label for="anndisplay" class="pl-2 cursor-pointer"
              >Check to show this announcement</label
            >
          </div>
        </div>
        <div
          class="w-full flex-row px-4 ss:px-8 md:px-12 pt-8 flex sss:gap-6 justify-between ss:justify-start"
        >
          <div class="place-content-left w-fit grid text-lg">
            <div
              class="ann-button border-red px-3 sss:px-5 py-1 rounded-lg text-white cursor-pointer"
              @click="addAnnouncement"
              :class="
                disabledBtn
                  ? 'bg-[#919191] bg-opacity-50 disabled'
                  : 'bg-[#3399cc] hover:bg-[#336699]'
              "
            >
              {{ isUpdateState ? "Edit" : "Add" }}
            </div>
          </div>
          <div class="place-content-left w-fit grid text-lg">
            <RouterLink :to="{ name: 'Home' }">
              <div
                class="ann-button border-red bg-rose-500 hover:bg-rose-700 px-3 sss:px-5 py-1 rounded-lg text-white cursor-pointer"
              >
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
