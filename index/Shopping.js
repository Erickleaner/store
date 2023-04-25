
class Shopping{
    constructor(subList) {
        this.src = ""
        this.name = null;
        this.stock = null;
        this.number = null;
        this.price = null;
        this.quantity = null;
        this.img_url = null;
        this.id = null;
        this.cart = new Cart(subList)
        this.source = null
    }
    init(){
        this.initView();
        this.initEvent();
        this.cart.init()
    }
    initView(){
        this.detailView = document.getElementById('goods_detail')
        this.imgView = document.getElementById('goods_img')
        this.nameView = document.getElementById('goods_name')
        this.priceView = document.getElementById('goods_price')
        this.quantityView = document.getElementById('goods_quantity')
        this.stockView = document.getElementById('goods_stock')
        this.numView = document.getElementById('goods_number')
        this.downView = document.getElementById('num_down')
        this.upView = document.getElementById('num_up')
        this.insertView = document.getElementById('goods_insert')
    }
    updateStock(){
        this.source.in_stock = this.stock
        this.stockView.innerText = this.stock
    }
    updateBackStock(id){
        if (this.id === id){
            this.stock = this.source.in_stock
            this.stockView.innerText = this.stock
        }
    }
    initEvent(){
        let _this = this
        this.downView.onclick = () =>{
            if (this.number>0){
                this.number--
                this.numView.innerText = this.number
            }
        }
        this.upView.onclick = () =>{
            if (this.number<this.stock){
                this.number++
                this.numView.innerText = this.number
            }
        }
        this.insertView.onclick = () =>{
            if (this.number===0){
                alert('The purchase quantity cannot be 0!')
                return
            }
            this.stock -= this.number;
            let data = _this.getDataObj()
            this.cart.insertGeneral(data)
            this.updateStock()
        }
    }
    display(){
        let img = this.detailView.getElementsByTagName('img')[0]
        let purchase = this.detailView.getElementsByTagName('div')[0];
        let textOrder = document.getElementById('text_order');
        img.style.display="block"
        purchase.style.display="flex"
        textOrder.style.display="inline"
    }
    getDataObj(){
        return {
            product_id:this.id,
            product_name:this.name,
            in_stock:this.stock,
            number:this.number,
            unit_price:this.price,
            unit_quantity:this.quantity,
            product_img:this.img_url
        }
    }
    setGoodsData(data){
        this.id = data.product_id;
        this.name = data.product_name;
        this.stock = data.in_stock;
        this.number = 0;
        this.price = data.unit_price;
        this.quantity = data.unit_quantity;
        this.img_url = data.product_img;
    }
    showDetail(data){
        this.source = data
        this.setGoodsData(data)
        this.imgView.src = `../assets/img/goods/${data.product_img}`
        this.nameView.innerText = data.product_name
        this.priceView.innerText = data.unit_price
        this.quantityView.innerText = data.unit_quantity
        this.stockView.innerText = data.in_stock
        this.numView.innerText = this.number
        this.display()
    }
}
