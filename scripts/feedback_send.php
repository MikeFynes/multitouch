<?php


// DATA FROM FORM
$colorRating= $_POST["colorRating"];
$lookFeel= $_POST["lookFeel"];
$freeComment= $_POST["freeComment"];	

//Email info
$subject = "Feedback from Screen!";
$message ='<h2>We got some feedback! </h2>

<p>Colour rating is: '.$colorRating.' .</p>
<p>Look and feel rating is: '.$lookFeel.' . </p>
<p>Free comment: '.$freeComment.' . </p>


	<br />';


$to= 'michaef@metropolia.fi';
$from = "MultiTouch";
$headers = "MIME-Version: 1.0" . "\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\n";
$headers .= "From: $from" . "\n";
//Action
mail($to,$subject,$message, $headers);

header("location: ../feedback.html");
?>