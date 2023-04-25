<?php
require_once 'common.php';
require_once 'email.php';
function success(){
    $obj = array(
        'msg' => 'order successfully',
    );
    $obj = (object) $obj;
    return $obj;
}
function update($conn,$in_stock,$product_id){
    mysqli_query($conn,"UPDATE products SET in_stock=$in_stock
    WHERE product_id='$product_id'");
}
function orderStr($data){
    $msg = "Address:" . $data->address . "\n";
    $msg .= "Product order list:\n";
    $list = $data->list;
    $len=count($list);
    for($x=0;$x<$len;$x++)
    {
        $element = $list[$x];
        $msg .= "The number of ".$element->product_name." is ".$element->number."\n";
    }
    return $msg;
}
function index(){
    $conn = connect('root', '123456', 'assignment1', $error);
    $data = $_GET["json"];
    $data = json_decode($data);
    $list = $data->list;
    $email = $data->email;

    $len=count($list);

    for($x=0;$x<$len;$x++)
    {
        $element = $list[$x];
        update($conn,$element->in_stock,$element->product_id);
    }
    sendEmail(orderStr($data),$email);
    $obj = success();
    $json = json_encode($obj);
    echo $json;
}
index();
?>
