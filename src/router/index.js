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
            path:'/admin/announcement',
            name:'Home',
            component:ContentView
        },
        {
            path:'/admin/announcement/:id',
            name:'AnnouncementDetailView',
            component:AnnouncementDetailView
        },
        {
            path:'/about-us',
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