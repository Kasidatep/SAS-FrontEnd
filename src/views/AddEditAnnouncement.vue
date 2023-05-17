<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncementById,
  getCategories
} from "../composables/fetch";
import annDisplayEnum from "../composables/announcementDisplayEnum";
import { isoToDate, isoToTime, toDate } from "../composables/date";
import Swal from "sweetalert2";
import { QuillEditor } from "@vueup/vue-quill";

const categoryList = ref([])

const router = useRouter();
const route = useRoute();

const isUpdateState = ref(false);
const announcement = ref(null);

const announcementTitle = ref(null);
const announcementCategory = ref(1);
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

const checkError = () => {
  if (publishDate.value?.length > 0 && new Date(toDate(publishDate.value, publishTime.value)) <= new Date()) showErrorMsg("The publishDate must be a future date")
  if (closeDate.value?.length > 0 && new Date(toDate(closeDate.value, closeTime.value)) < new Date()) showErrorMsg("The closeDate must be a future date")
  if (closeDate.value?.length > 0 && publishDate.value?.length > 0 && (new Date(toDate(closeDate.value, closeTime.value)) <= new Date(toDate(publishDate.value, publishTime.value)))) showErrorMsg("The closeDate must be later than publish date")

}

const disabledBtn = computed(() => {
  console.log(dateDisabledBtn.value)
  checkError()
  return (
    announcementTitle.value == null ||
    announcementTitle.value?.length == 0 ||
    announcementDescription.value == null ||
    announcementDescription.value?.length == 0 ||
    isSameValue.value ||
    dateDisabledBtn.value
  );
});

const dateDisabledBtn = computed(() => {
  return (
    // publish date cannot be past
    ((publishDate.value !== null && publishDate.value?.length != 0) && (new Date(toDate(publishDate.value, publishTime.value)) <= new Date())) ||
    // close date cannot be past
    ((closeDate.value !== null && closeDate.value?.length != 0) && (new Date(toDate(closeDate.value, closeTime.value)) <= new Date())) ||
    ((closeDate.value !== null && closeDate.value?.length != 0) && (publishDate.value !== null && publishDate.value?.length != 0) && (new Date(toDate(closeDate.value, closeTime.value)) <= new Date(toDate(publishDate.value, publishTime.value))))
  )
})

const clearPublishDate = () => {
  if (publishDate.value == "") {
    publishTime.value = ""
  }
  if (publishDate.value != "" && (publishTime.value == null || publishTime.value == "")) {
    publishTime.value = "06:00"
  }
}

const clearCloseDate = () => {
  if (closeDate.value == "") {
    closeTime.value = ""
  }
  if (closeDate.value != "" && (closeTime.value == null || closeTime.value == "")) {
    closeTime.value = "18:00"
  }
}

const disabledPublishDate = computed(() => {
  return publishDate.value == null || publishDate.value.length == 0
});

const disabledCloseDate = computed(() => {
  return closeDate.value == null || closeDate.value.length == 0
});

const isSameValue = computed(() => {
  return announcementTitle.value == announcement.value?.announcementTitle &&
    announcementCategory.value ==
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
  if (announcementTitle.value?.length == 0 || announcementTitle.value == null) {
    return { css: "text-red-500", msg: "not be empty" };
  }

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

const findCategoryId = (category) => {
  return categoryList.value.find(c => c.categoryName == category)?.id
}

const setAnnouncement = () => {
  announcementTitle.value = announcement.value?.announcementTitle;
  announcementCategory.value = findCategoryId(
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
  categoryList.value = await getCategories()
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
      categoryId: announcementCategory.value,
    };
    let status = 400;
    if (isUpdateState.value == false) {
      status = await createAnnouncement(addObj);
    } else {
      addObj.id = id.value;
      status = await updateAnnouncementById(addObj);
    }
    if (status == 200) {
      showAlert(
        "success",
        "Successfully",
        `Your announcement has been ${isUpdateState.value ? "updated" : "created"}.`,
        false,
        false
      );
      router.push({ name: "AdminAnnouncement" })
    } else {
      showAlert(
        "error",
        "Sorry",
        `Your announcement cannot be ${isUpdateState.value ? "updated" : "created"}.`,
        false,
        false
      );
      router.push({ name: "AdminAnnouncement" })
    }

  } else {
    //showAlert('error', 'Sorry', 'Some value cannot be empty', false, false)
    // checkError()
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "warning",
      title: `Cannot ${isUpdateState.value ? "updated" : "created"}.`,
    });
  }
};

const showErrorMsg = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    width: "30rem",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "warning",
    title: `${msg}`,
  });
}
</script>

<template>
  <div class="w-full justify-center flex">
    <div class="w-[95%] ss:w-[90%] sm:w-[80%] md:w-[75%] pt-14 min-h-[72.5vh]">
      <div class="pl-2 items-center flex sm:text-3xl text-2xl font-semibold">
        {{ isUpdateState ? "Edit" : "Add" }} Announcement:
      </div>
      <div class="w-full flex flex-col mt-8 pb-10 md:text-lg border-gray-500 border-solid border-2 rounded-lg">
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-10">
          <div class="flex justify-between">
            <div class="w-fit font-semibold text-lg pb-2">
              Title<span class="text-rose-700 pl-1">*</span>
            </div>
            <div class="text-xs md:text-sm align-text-bottom pt-3" :class="validateTitle.css">
              {{ validateTitle.msg }}
            </div>
          </div>

          <input v-model.trim="announcementTitle" placeholder="หัวเรื่อง" maxlength="200"
            class="ann-title w-full bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base" />
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">
            Category<span class="text-rose-700 pl-1">*</span>
          </div>
          <select v-model="announcementCategory"
            class="ann-category bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg w-full ss:w-[13rem] px-4 h-12">
            <option :value="category.id" class="" v-for="category in categoryList" :selected="category.id == 1">
              {{ category.categoryName }}
            </option>
          </select>
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="flex justify-between">
            <div class="w-fit font-semibold text-lg pb-2">
              Description<span class="text-rose-700 pl-1">*</span>
            </div>
            <div class="text-xs md:text-sm align-text-bottom pt-3" :class="validateDesc.css">
              {{ validateDesc.msg }}
            </div>
          </div>
          <QuillEditor theme="snow" toolbar="full" v-model:content="announcementDescription" content-type="html" class="ann-description text-base pt-3">

          </QuillEditor>

          <!-- <textarea type="text" ref="desc" placeholder="รายละเอียด" maxlength="10000"
            class="ann-description w-full rounded-lg pl-5 text-base pt-3 h-48 border border-gray-300 bg-gray-50"
            v-model.trim="announcementDescription">
          </textarea> -->
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">Publish Date</div>
          <div class="flex gap-6 flex-col ss:flex-row">
            <input type="date" v-model.trim="publishDate" @change="clearPublishDate"
              class="ann-publish-date w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base" />
            <input type="time" v-model.trim="publishTime" @change="time"
              :class="disabledPublishDate ? 'bg-[#919191] bg-opacity-20' : 'bg-gray-50'" :disabled="disabledPublishDate"
              class="ann-publish-time w-full ss:w-[13rem]  border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base" />
          </div>
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">Close Date</div>
          <div class="flex gap-6 flex-col ss:flex-row">
            <input type="date" v-model.trim="closeDate" @change="clearCloseDate"
              class="ann-close-date w-full ss:w-[13rem] bg-gray-50 border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base" />
            <input type="time" v-model.trim="closeTime"
              :class="disabledCloseDate ? 'bg-[#919191] bg-opacity-20' : 'bg-gray-50'" :disabled="disabledCloseDate"
              class="ann-close-time w-full ss:w-[13rem]  border border-gray-300 cursor-pointer h-12 rounded-lg px-4 text-base" />
          </div>
        </div>
        <div class="w-full flex flex-col px-4 ss:px-8 md:px-12 pt-8">
          <div class="w-fit font-semibold text-lg pb-2">Display</div>
          <div>
            <input type="checkbox" class="ann-display cursor-pointer" id="anndisplay" v-model="announcementDisplay" />
            <label for="anndisplay" class="pl-2 cursor-pointer">Check to show this announcement</label>
          </div>
        </div>
        <div class="w-full flex-row px-4 ss:px-8 md:px-12 pt-8 flex sss:gap-6 justify-between ss:justify-start">
          <div class="place-content-left w-fit grid text-lg ">
            <button class="ann-button border-red px-3 sss:px-5 py-1 rounded-lg text-white cursor-pointer"
              @click="addAnnouncement" :class="disabledBtn
                ? 'bg-[#919191] bg-opacity-50 '
                : 'bg-[#3399cc] hover:bg-[#336699]'
                " :disabled="disabledBtn">
              {{ isUpdateState ? "Edit" : "Add" }}
            </button>
          </div>
          <div class="place-content-left w-fit grid text-lg">
            <RouterLink :to="{ name: 'AdminAnnouncement' }">
              <button
                class="ann-button border-red bg-rose-500 hover:bg-rose-700 px-3 sss:px-5 py-1 rounded-lg text-white cursor-pointer">
                Cancel
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
