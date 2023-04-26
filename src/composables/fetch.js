const getAnnouncements = async () => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements`)
        // const res = await fetch('http://localhost:8080/api/announments')
        if(res.ok){
            return await res.json()
        }else throw new Error('Error, cannot get announcement data')
    } catch(error) {
        console.log(error)
    }
}

export {getAnnouncements}