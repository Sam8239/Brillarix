<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $formcontent = "From: $name \nSubject: $subject \nMessage: $message";
    $recipient = "work@visionaryclouds.com";
    $mailheader = "From: $email \r\n";

    if (mail($recipient, $subject, $formcontent, $mailheader)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Error! Please try again.";
    }
}
