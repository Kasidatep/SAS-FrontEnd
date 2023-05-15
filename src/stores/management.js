import { defineStore,acceptHMRUpdate } from "pinia";
import { ref  } from 'vue'
export const ann = defineStore('announcement',()=>{
    const mode = ref('active')
    const page = ref(0)
    const categoryId = ref(1)

    const activeMode = () => (mode.value='active')
    const closeMode = () => (mode.value='close')

    return { mode,page,categoryId, activeMode, closeMode}
})



if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(ann,import.meta.hot))
}
