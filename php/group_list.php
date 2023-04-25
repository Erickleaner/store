<?php
require_once 'common.php';

function read($conn, $sql, &$error){
    $res = query($conn, $sql, $error);
    if($res === false) return false;
    $lists = array();
    while($row = mysqli_fetch_assoc($res)){
        $group = array(
            'group_id' => $row['group_id'],
            'group_name' => $row['group_name']
        );
        $group = (object) $group;
        $lists[] = $group; // add last
    }
    mysqli_free_result($res);
    return $lists;
}
function index()
{
    $error = null;
    $conn = connect('root', '123456', 'assignment1', $error);
    $data = read($conn, 'select group_id,group_name from `groups`', $error);
    $json = json_encode($data);
    $conn->close();
    echo $json;
}
index();
?>
