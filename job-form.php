<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'] ?? '';
    $lastName  = $_POST['lastName'] ?? '';
    $email     = $_POST['email'] ?? '';
    $jobTitle  = $_POST['job-title'] ?? '';

    $subject   = "Job Application from Brillarix Website";
    $recipient = "contact@brillarix.com";
    $messageText = "From: $firstName $lastName\nJob Title: $jobTitle";

    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['resume']['tmp_name'];
        $fileName    = $_FILES['resume']['name'];
        $fileSize    = $_FILES['resume']['size'];
        $fileType    = $_FILES['resume']['type'];

        $allowedTypes = ['application/pdf'];
        if (!in_array($fileType, $allowedTypes)) {
            echo "Invalid file type. Only PDF files are allowed.";
            exit;
        }

        $fileContent = file_get_contents($fileTmpPath);
        $encodedContent = chunk_split(base64_encode($fileContent));

        $boundary = md5("brillarix-job-application");

        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "From: $email\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n\r\n";

        $body  = "--{$boundary}\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $body .= $messageText . "\r\n\r\n";

        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: {$fileType}; name=\"{$fileName}\"\r\n";
        $body .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= $encodedContent . "\r\n";
        $body .= "--{$boundary}--";

        if (mail($recipient, $subject, $body, $headers)) {
            echo "We have recieved your application. Thank you!";
        } else {
            echo "Error! Please try again.";
        }
    } else {
        $headers = "From: $email\r\n";
        if (mail($recipient, $subject, $messageText, $headers)) {
            echo "Thank you! Your application has been sent (without attachment).";
        } else {
            echo "Error! Please try again.";
        }
    }
}