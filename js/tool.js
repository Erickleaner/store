const ajaxGet = (url,callback,data = {}) => {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    let query = ''
    let keyArr = Object.keys(data)
    if (keyArr.length!==0){
        query += '?'
        for (let i=0;i<keyArr.length;i++){
            let key = keyArr[i]
            if (i!==keyArr.length-1)
                query += `${key}=${data[key]}&`
            else
                query +=`${key}=${data[key]}`
        }
    }
    xhr.open("GET", url + query, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
}
