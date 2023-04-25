<?php
function sendEmail($message,$to){
    $subject = "Order Mail";
    $from = "your own email";
    $headers = "From: $from";
    mail($to, $subject, $message, $headers);
}



