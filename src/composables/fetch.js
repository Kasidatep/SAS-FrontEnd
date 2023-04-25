const get = async () => {
    try{
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announments`)
        // const res = await fetch('http://localhost:8080/api/announments')
    } catch(error) {
        console.log(error)
    }
}