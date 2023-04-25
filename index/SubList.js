
class SubList{
    constructor() {
        this.shopping = new Shopping(this)
        this.list = null
    }
    subTemplate(name){
        return `<div class="sub-content">
              <h3>${name}</h3>
              <img src="../assets/img/down.png" class="direction-icon">
            </div>
            <div class="sub-list"></div>`
    }
    clearSubView(){
        this.subListView.innerHTML = ''
    }
    addSubView(subName,id){
        let subView = document.createElement('div')
        subView.classList.add('first-sub')
        subView.innerHTML = this.subTemplate(subName)
        subView.id = id
        let subContent = subView.getElementsByClassName('sub-content')[0]
        let subFont = subContent.getElementsByTagName('h3')[0]
        subFont.onclick = () =>{
            let subList = subView.getElementsByClassName('sub-list')[0]
            let img = subContent.getElementsByTagName('img')[0]
            if (subList.style.display!=='none'){
                subList.style.display = 'none'
                img.src = '../assets/img/up.png'
            }else {
                subList.style.display = 'flex'
                img.src = '../assets/img/down.png'
            }
        }
        this.subListView.append(subView)
    }
    secondTemplate(name){
        return `<h4>${name}</h4>`
    }
    getProductData(second_id){
        let strArr = second_id.split('_')
        return this.getObjById(strArr[1])
    }
    addSecondView(name,sub_id,second_id){
        let secondView = document.createElement('div')
        secondView.classList.add('second-sub')
        secondView.innerHTML = this.secondTemplate(name)
        secondView.id = second_id
        let subListView =document.getElementById(sub_id)
        let secondListView = subListView.getElementsByClassName('sub-list')[0];
        secondListView.append(secondView)
        let secondFont = secondView.getElementsByTagName('h4')[0]
        let _this = this
        secondFont.onclick = () =>{
            let data = _this.getProductData(second_id)
            this.shopping.showDetail(data)
        }


    }
    initView(){
        this.btSearch = document.getElementById('bt_search')
        this.subListView = document.getElementById('sub_list_view')
    }
    init(){
        this.initView()
        this.initEvent()
        this.shopping.init()
        fetchSubList().then(list=>{
            list.forEach((val,index)=>{
                const sub_id = `sub_${val.group_id}`
                this.addSubView(val.group_name,sub_id)
                secondList(val.group_id).then(data => {
                    list[index] = {
                        ...val,
                        seconds:data
                    }
                    data.forEach((val)=>{
                        this.addSecondView(val.product_name,sub_id,`second_${val.product_id}`)
                    })
                })
            })
            this.list = list
        })
    }
    viewByFilter(){
        let filterList = []
        let text = $('#text_search').val();
        text = text.trim()
        this.list.forEach(val=>{
            let seconds = val.seconds
            let filterSeconds = []
            seconds.forEach(val=>{
                if (val.product_name.includes(text))
                    filterSeconds.push(val)
            })
            if (filterSeconds.length>0){
                let copySub = {...val}
                copySub.seconds = filterSeconds
                filterList.push(copySub)
            }
        })
        this.filterList = filterList
    }
    searchRender(){
        this.clearSubView()
        this.filterList.forEach((val)=>{
            const sub_id = `sub_${val.group_id}`
            this.addSubView(val.group_name,sub_id)
            val.seconds.forEach((val)=>{
                this.addSecondView(val.product_name,sub_id,`second_${val.product_id}`)
            })
        })
    }
    numBack(obj){
        let val = this.getObjById(obj.product_id)
        val.in_stock += obj.number
        this.shopping.updateBackStock(obj.product_id)
    }
    getObjById(id){
        for (let i=0;i<this.list.length;i++){
            let sub = this.list[i]
            let seconds = sub.seconds
            for (let j=0;j<seconds.length;j++){
                if (seconds[j].product_id===id){
                    return seconds[j]
                }
            }
        }
    }
    initEvent(){
        let _this = this
        this.btSearch.onclick = () =>{
            _this.viewByFilter()
            _this.searchRender()
        }
    }
}
