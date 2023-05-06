const getAnnouncements = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements`)
        // const res = await fetch('http://localhost:8080/api/announments')
        if (res.ok) {
            return await res.json()
        } else throw new Error('Error, cannot get announcement data')
    } catch (error) {
        console.log(error)
    }
}

const getAnnouncementById = async (id) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements/${id}`)
        if (res.ok) {
            return await res.json()
        } else throw new Error('Error, cannot get announcement id ' + id)
    } catch (error) {
        console.log(error)
    }
}


const createAnnouncement = async (create) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(create)
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

const updateAnnouncementById = async (edit) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements/${edit.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(edit)
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

const deleteAnnouncementById = async (deleteId) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements/${deleteId}`, {
            method: 'DELETE'
        })
        return res.status
    }
    catch (err) {
        console.log(err)
    }
}

export { getAnnouncements, getAnnouncementById, createAnnouncement, updateAnnouncementById, deleteAnnouncementById }