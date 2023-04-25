<?php
require_once 'common.php';

function read($conn, $sql, &$error){
    $res = query($conn, $sql, $error);
    if($res === false) return false;
    $lists = array();
    while($row = mysqli_fetch_assoc($res)){
        $product = array(
            'product_id' => $row['product_id'],
            'product_name' => $row['product_name'],
            'unit_price' => $row['unit_price'],
            'unit_quantity' => $row['unit_quantity'],
            'in_stock' => $row['in_stock'],
            'product_img' => $row['product_img'],
            'group_id' => $row['group_id'],
        );
        $product = (object) $product;
        $lists[] = $product; // add last
    }
    mysqli_free_result($res);
    return $lists;
}
function index(){
    $error = null;
    $conn = connect('root', '123456', 'assignment1', $error);
    $group_id = $_GET["group_id"];
    $data = read($conn, "select * from products where group_id=$group_id", $error);
    $json = json_encode($data);
    $conn->close();
    echo $json;
}
index();
?>
