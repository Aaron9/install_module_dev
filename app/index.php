<?php
if(!file_exists('config.php')){
	header("Location:install/");
	exit();
}
include ('config.php');
if(!isset($_REQUEST['g']) || !isset($_REQUEST['n'])){
header("Location:".CLIENT_BASE_URL."login.php");	
exit();
}