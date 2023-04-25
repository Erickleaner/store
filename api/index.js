
const fetchSubList = () =>{
    return new Promise(resolve => {
        const url = "http://localhost:8000/php/group_list.php"
        ajaxGet(url,(data)=>{
            resolve(data)
        })
    })
}
const secondList = (group_id) =>{
    return new Promise(resolve => {
        const url = "http://localhost:8000/php/product_list.php"
        ajaxGet(url,(data)=>{
            resolve(data)
        },{group_id})
    })
}

