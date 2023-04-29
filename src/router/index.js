import { createRouter, createWebHistory } from "vue-router"
import AnnouncementDetailView from '../views/AnnouncementDetailView.vue'
import ContentView from '../views/ContentView.vue'
import AboutUs from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'Default',
            component:ContentView
        },
        {
            path:`${import.meta.env.VITE_BASE_FRONT_PATH}`,
            name:'Default',
            component:ContentView
        },
        {
            path:`${import.meta.env.VITE_BASE_FRONT_PATH}/admin/announcement`,
            name:'Home',
            component:ContentView
        },
        {
            path:`${import.meta.env.VITE_BASE_FRONT_PATH}/admin/announcement:id`,
            name:'AnnouncementDetailView',
            component:AnnouncementDetailView
        },
        {
            path:`${import.meta.env.VITE_BASE_FRONT_PATH}/about-us`,
            name:'AboutUs',
            component:AboutUs
        },
        {
          path: "/:notfoundpath(.*)",
          name: "NotFound",
          component: NotFound,
        }
    ]
})
export default router