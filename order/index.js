
let search = decodeURI(document.URL)
let data=search.slice(search.indexOf("=")+1)
data = JSON.parse(data)

$(function () {
    $('#submit').click(function () {
        const email = $('#email').val()
        const address = $('#address').val()
        if (email.trim()===''||address.trim()===''){
            alert('Input cannot be empty!')
            return;
        }
        let json = {
            list:data,
            email:email,
            address:address,
        }
        order(JSON.stringify(json)).then(data=>{
            alert(data.msg)
            window.location.href = '../index.html';
        })
    })
    $('#reset').click(function () {
        $('#email').val('')
        $('#address').val('')
    })
})
