<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    form, input, textarea, span {
      font: normal 1em Verdana, Geneva, sans-serif;
      vertical-align: text-top;
    }
    h3 {
      font: bold 1em Verdana, Geneva, sans-serif;
    }
  </style>

</head>

<body>

<?php
$email_error = "*";
$email_address = "";
$message_text = "";
$email_sent = false;
$submit_button = "Wyślij wiadomość!";

function cleanInput($input) {
  return htmlspecialchars(stripslashes(trim($input)));
}//cleanInput

if (isset($_POST['submit_button']) && $_POST['submit_button']==$submit_button) {
//echo "pojawił się submit <br>";
  if (empty($_POST['email_address']) && empty($_POST['message_text'])) {
//echo "dane były puste, a teraz został zrobiony reset i unset <br>";
    echo "<script>document.forms['send_message'].reset();</script>";
    unset($_POST['submit_button']);
  }//if
  else {
//echo "sprawdzam dane: <br>";
    if (empty($_POST['email_address'])) {
      $email_error = "Proszę podać adres e-mail";
    } //if
    else {
      $email_address = cleanInput($_POST['email_address']);
      if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
        $email_error = "Błędny adres e-mail";
      }
    }//else
//echo "email_address=$email_address, <br>";
    if (empty($_POST['message_text'])) {
      $message_text = "";
    }
    else {
      $message_text = cleanInput($_POST['message_text']);
    }//else
//echo "message_text=$message_text, <br>";
    if ($email_error == "*") {
        $mail_to = "zbyszek@azkstrony.pl";
        $subject = "Wiadomość ze strony azetkaankiety.pl";
        $message_text = wordwrap($message_text, 70);
        $headers = "From: azetka@azkstrony.pl" . "\r\n" . "CC: " . $email_address . "\r\n";
        $email_sent = (mail($mail_to, $subject, $message_text, $headers) == 1);
//echo "email_sent=$email_sent<br>";
      }//if
  }//else
}//if

if ($email_sent) {
//  $email_address = "";
//  $message_text = "";
  $submit_button = "Wiadomość została wysłana!";
}
?>

<form name="send_message" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF'])?>" method="post">
  Adres e-mail:
    <input type="email" size="60" name="email_address" placeholder="ident@adres.pl" value="<?php echo $email_address?>">
      <span style="color:red;"><?php echo $email_error?></span>
  <br>
  <br>
  Wiadomość:&nbsp;
    <textarea rows="10" cols="60" name="message_text" placeholder="Wiadomość..." lang="pl"><?php echo $message_text?></textarea>
  <br>
  <br>
  <input type="submit" name="submit_button" value="<?php echo $submit_button?>" style="background-color:#47d147;">
</form>

<?php
if ($email_sent) {
//  echo "<h3>Wiadomość została wysłana. Dziękujemy.</h3>";
  echo "<span>" . date("h:i:sa") . "</span>";
  echo "<script>document.send_message.reset();</script>";
  echo "<script>window.alert('Wiadomość została wysłana. Dziękujemy.');</script>";
  echo "<script>document.send_message.submit();</script>";
}
?>

</body>
</html>