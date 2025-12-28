<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'server146c.irwebspace.com';
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 2;
    $mail->Username = 'moro@spectoshimatsu.com';
    $mail->Password = 'z9pKifTW725SI0ov';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('moro@spectoshimatsu.com', 'Website Form');
    $mail->addAddress('moro@spectoshimatsu.com');

    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form';
    $mail->Body = "
        Name: {$_POST['name']}<br>
        Email: {$_POST['email']}<br>
        Phone: {$_POST['phone']}<br>
        Industry: {$_POST['industry']}<br>
        Message: {$_POST['message']}
    ";

    $mail->send();
    echo 'EMAIL SENT';
} catch (Exception $e) {
    echo 'ERROR: ' . $mail->ErrorInfo;
}
