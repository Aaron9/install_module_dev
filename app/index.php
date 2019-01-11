<?php

if(!file_exists("config/config.php")){
	header("Location: install/");
	exit();
}
include ('config/config.php');
include APP_BASE_PATH.'lib/include/init.php';
$CSRFToken = $obj->CSRF->generate('my_token');
if(!isset($_REQUEST['g']) || !isset($_REQUEST['n'])){
header("Location:".CLIENT_BASE_URL."home.php");	
exit();
}
if(isset($_COOKIE['LockMode'])){
header("Location:".CLIENT_BASE_URL."lockscreen.php");	
exit();	
}
$group = $_REQUEST['g'];
$name= $_REQUEST['n'];

$directory = scandir(APP_BASE_PATH);

if(in_array($group, $directory)){
  
  if(!empty($group) AND !empty($name)){
	$name = str_replace("..","",$name);	
	$name = str_replace("/","",$name);
	include APP_BASE_PATH.'/'.$group.'/'.$name.'/index.php';

}else{

	include APP_BASE_PATH."error/404.php";
	exit();
}
  }else{

    include APP_BASE_PATH."error/404.php";
	exit();
  }


