export const getPageList = (page, totalpage) => {
    let arrPage = []
    if(totalpage<10){
        for (let index = 1; index <= totalpage; index++) {
            arrPage.push(index) 
        }
    }
    if(totalpage>10){
        if(page < 9){
            for (let index = 1; index <= 10; index++) {
                arrPage.push(index) 
            }
        }else{
            for (let index = page-8 ; index <= page+1; index++) {
                arrPage.push(index) 
            }
        }

    }
    return arrPage
}