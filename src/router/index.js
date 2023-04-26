import { createRouter, createWebHistory } from "vue-router"
import Detail from '../components/Detail.vue'
import Content from '../components/Content.vue'
import Test from '../views/Test.vue'
import NotFound from '../views/NotFound.vue'
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'Home',
            component:Content
        },
        {
            path:'/:id',
            name:'announcementDetail',
            component:Detail
        },
        {
            path:'/test',
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