<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = "Lead From Brillarix Website";
    $formcontent = "From: $firstName $lastName\nSubject: $subject\nMessage: $message";
    $recipient = "contact@brillarix.com";
    $mailheader = "From: $email \r\n";

    if (mail($recipient, $subject, $formcontent, $mailheader)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Error! Please try again.";
    }
}
