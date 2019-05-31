<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    form, input, textarea {
      font: normal 0.9em Verdana, Geneva, sans-serif;
      vertical-align: text-top;
    }
  </style>
  
</head>
  
<body>

<?php
$email_error = "*";
$email_address = "";
$message_text = "";
$email_sent = false;

function cleanInput($input) {
  return htmlspecialchars(stripslashes(trim($input)));
}//cleanInput

  if (isset($_POST['submit'])) {
    if (empty($_POST['email_address'])) {
      $email_error = "Proszę podać adres e-mail";
    } //if
    else {
      $email_address = cleanInput($_POST['email_address']);
      if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
        $email_error = "Błędny adres e-mail";
      }
    }//else
    if (empty($_POST['message_text'])) {
      $message_text = "";
    } 
    else {
      $message_text = cleanInput($_POST['message_text']);
    }//else
    if ($email_error == "*") {
      $mail_to = "zbyszek@azkstrony.pl";
      $subject = "Wiadomość ze strony azetkaankiety.pl";
      $message_text = wordwrap($message_text, 70);
      $headers = "From: azetka@azkstrony.pl" . "\r\n" . "CC: " . $email_address . "\r\n";
      $email_sent = (mail($mail_to, $subject, $message_text, $headers) == 1);
    }//if
  }//if
    
  if ($email_sent) {
    unset($_POST['submit']);
    echo "<h2>Wiadomość została wysłana. Dziekujemy.</h2>";
    echo "<script>document.getElementById('sendamessage').reset();</script>";
  }
  else {
    $script = htmlspecialchars($_SERVER['PHP_SELF']);
    echo "<form id='sendamessage' action='$script' method='post'>";
    echo "   Adres e-mail: <input type='email' size='60' name='email_address' placeholder='ident@adres.pl' value='$email_address'>" .
                          "<span style='color:red;'>$email_error</span><br><br>";
    echo "   Wiadomość:&nbsp; <textarea rows='10' cols='60' name='message_text' placeholder='Wiadomość...'>$message_text</textarea><br><br>";
    echo "   <input type='submit' name='submit' value='Wyślij wiadomość!'>";
    echo "</form>";
//    echo date("h:i:sa");
  }
?>

</body>
</html>