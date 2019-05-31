<?php
$new_visit = false;
if (array_key_exists("new_visit", $_REQUEST))
  $new_visit = $_REQUEST["new_visit"] == "true";

$cnt_file = "visit_counter.txt";
$lst_file = "visit_loglist.txt";
$counters = array (0, 0);
$remote_addr = "noIPaddress";

if (file_exists($cnt_file)) {
  $file = fopen($cnt_file, "r");
  if ($file) {
    flock($file, LOCK_SH);
    $counters = fgetcsv($file, 64, ";");
    flock($file, LOCK_UN);
    fclose($file);
  }//if
}//if
if ($new_visit)
  $counters[0]++;
$counters[1]++;
 
$file = fopen($cnt_file, "w");
flock($file, LOCK_EX);
fputcsv($file, $counters, ";");
flock($file, LOCK_UN);
fclose($file); 

if (array_key_exists("REMOTE_ADDR" , $_SERVER))
  $remote_addr = $_SERVER["REMOTE_ADDR"];
$file = fopen($lst_file, "a+");
flock($file, LOCK_EX);
fwrite($file, $counters[0] . "/" . $counters[1] . ";" . $remote_addr  . ";" . date("Y-m-d h:i:s") . "\n");
flock($file, LOCK_UN);
fclose($file); 

echo $counters[0] . "/" . $counters[1];
?>
