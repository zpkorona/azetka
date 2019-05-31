 <?php
$text1 =
"<h3>to jest tekst numer 1</h3><p>takie sobie nic.</p><p>ĄĆĘŁŃÓŚŻŹ</p>";
$text2 =
"<h3>to jest tekst numer 2</h3><p>z obrazkiem <img src='../grafiki/pic02s.jpg'></p>";
$text3 =
"<h3>to jest tekst numer 3</h3><p>z przyciskiem <button type='button' onclick='showPHPcos(\"../php/costam.php\", 2)'>pokaż 2</button></p>";
// get the wersja parameter from URL
$wersja = $_REQUEST["wersja"];
// lookup all hints from array if $wersja is different from ""
if ($wersja === "1") echo $text1;
if ($wersja === "2") echo $text2;
if ($wersja === "3") echo $text3;
?>