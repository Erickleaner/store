
const order = (json) =>{
    return new Promise(resolve => {
        const url = "http://localhost:8000/php/order.php"
        ajaxGet(url,(data)=>{
            resolve(data)
        },{json})
    })
}
