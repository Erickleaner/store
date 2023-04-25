
class Cart{
    constructor(subList) {
        this.goodsList = []
        this.subList = subList
    }
    init(){
        this.initView();
        this.initEvent();
    }
    initView(){
        this.payBt = document.getElementById('pay')
        this.cartContentView = document.getElementById('cart_content')
    }
    initEvent(){
        let _this = this
        this.payBt.onclick = () =>{
            window.location.href = '../order/index.html'+'?data='+JSON.stringify(_this.goodsList);
        }
    }
    getGoods(data){
        for (let i=0;i<this.goodsList.length;i++){
            let val = this.goodsList[i]
            if (val.product_id === data.product_id)
                return val
        }
        return null
    }
    renderGoods(data){
        let goodsView = document.getElementById(`goods_${data.product_id}`)
        let stockView = goodsView.getElementsByClassName('num-stock')[0]
        let numView = goodsView.getElementsByClassName('num-goods')[0]
        stockView.innerHTML = data.in_stock
        numView.innerHTML = data.number
    }
    btSwitch(){
        if (this.goodsList.length===0){
            this.payBt.disabled = true
            this.payBt.style.cursor = 'auto'
        }else {
            this.payBt.disabled = false
            this.payBt.style.cursor = 'pointer'
        }
    }
    insertGeneral(data){
        let goodsData = this.getGoods(data)
        if (goodsData === null){
            this.goodsList.push({...data})
            this.insertGoods(data)
        }else {
            goodsData.in_stock = data.in_stock
            goodsData.number += data.number
            this.renderGoods(goodsData)
        }
        this.btSwitch()
    }
    insertGoods(data){
        let _this = this
        let goodsView = document.createElement('div')
        goodsView.id = `goods_${data.product_id}`
        goodsView.classList.add('card')
        goodsView.classList.add('goods-purchase')
        goodsView.classList.add('bottom-m15')
        goodsView.innerHTML = this.goodsTemplate(data)
        let removeView = goodsView.getElementsByClassName('remove-img')[0]
        removeView.onclick = () => {
            for (let i=0;i<_this.goodsList.length;i++){
                let val = _this.goodsList[i];
                if (val.product_id===data.product_id){
                    this.cartContentView.removeChild(goodsView)
                    _this.goodsList.splice(i,1)
                    _this.btSwitch()
                    _this.subList.numBack(val)
                    break;
                }
            }
        }

        this.cartContentView.append(goodsView)
    }
    goodsTemplate(data){
        return `<div class="card-remove">
              <img src="../assets/img/remove.png" class="remove-img">
            </div>
            <img src="../assets/img/goods/${data.product_img}" class="bought-img">
            <div class="bought">
              <div class="top">
                <h4>${data.product_name}</h4>
              </div>
              <div class="space-between">
                <span>Unit Price:</span>
                <span>${data.unit_price}</span>
              </div>
              <div class="space-between">
                <span>Unit Quantity:</span>
                <span>${data.unit_quantity}</span>
              </div>
              <div class="space-between">
                <span>Stock on Hand:</span>
                <span class="num-stock">${data.in_stock}</span>
              </div>
              <div class="space-between">
                <span>Units(s):</span>
                <span class="num-goods">${data.number}</span>
              </div>
            </div>`;
    }
}
