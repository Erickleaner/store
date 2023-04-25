<?php

function connect($user, $password, $dbName, &$error, $host = "localhost", $port = "3306", $charset = "utf8"){
    $connection = @mysqli_connect($host, $user, $password, $dbName, $port);
    if(!$connection){
        $error = mysqli_connect_error();
        return false;
    }
    if(!mysqli_set_charset($connection, $charset)){
        $error = mysqli_error($connection);
        return false;
    }
    return $connection;
}
function query($conn, $sql, &$error){

    $res = mysqli_query($conn, $sql);
    if($res === false){

        $error = mysqli_error($conn);
        return false;
    }
    return $res;
}
header('Content-Type: application/json');
?>
