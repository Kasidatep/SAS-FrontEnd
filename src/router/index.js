import { createRouter, createWebHistory } from "vue-router"
import AnnouncementDetailView from '../views/AnnouncementDetailView.vue'
import ContentView from '../views/ContentView.vue'
import Test from '../views/Test.vue'
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
            path:'/announcement',
            name:'Home',
            component:ContentView
        },
        {
            path:'/announcement/:id',
            name:'AnnouncementDetailView',
            component:AnnouncementDetailView
        },
        {
            path:'/announcement/test',
            name:'Test',
            component:Test
        },
        {
          path: "/:notfoundpath(.*)",
          name: "NotFound",
          component: NotFound,
        }
    ]
})
export default router