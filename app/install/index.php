<?php
require dirname(__FILE__)."/config.php";
$isConfigFileExists = file_exists(CLIENT_APP_CONFIG_PATH."config.php");

$errorMap = array();

if($isConfigFileExists){
	$data = file_get_contents(CLIENT_APP_CONFIG_PATH."config.php");
	if($data != ''){
		$errorMap[] = array("important","A configuraation file exists","Application is already installed. If you want to reinstall, please delete the config file, clear data folder and use a new database during the installation.");
	}
}else{
	$file = fopen(CLIENT_APP_CONFIG_PATH."config.php", "w");
	fwrite($file, '');
	fclose($file);
}

$isConfigFileWritable = is_writable(CLIENT_APP_CONFIG_PATH."config.php");
error_log("Config Writable ".$isConfigFileWritable); 
error_log("Config Exists ".file_exists(CLIENT_APP_CONFIG_PATH."config.php"));

if(!$isConfigFileWritable){
	$errorMap[] = array("important","Configuration file [".CLIENT_APP_CONFIG_PATH."config.php] is not writable","Make this file writable",array("sudo touch ".CLIENT_APP_CONFIG_PATH."config.php","sudo chmod 777 ".CLIENT_APP_CONFIG_PATH."config.php"));
} 

$isConfigSampleFileExists = file_exists(CLIENT_APP_CONFIG_PATH."config.sample.php");

if(!$isConfigSampleFileExists){
	$errorMap[] = array("important","Sample configuration file doesn't exists","Please check :".CLIENT_APP_CONFIG_PATH."config.sample.php");
} 

$isDataFolderExists = is_dir(CLIENT_APP_PATH."data");
$isDataFolderWritable = false;

if(!$isDataFolderExists){
	$errorMap[] = array("important","Data directory does not exists","Please create directory :".CLIENT_APP_PATH."data",array("sudo mkdir ".CLIENT_APP_PATH."data"));	
}else{
	$file = fopen(CLIENT_APP_PATH."data/test.txt","w");
	if($file){
		fwrite($file,"Test file write");
		fclose($file);
		
		$data = file_get_contents(CLIENT_APP_PATH."data/test.txt");
		
		if($data == "Test file write"){
			$isDataFolderWritable = true;	
		}
		unlink(CLIENT_APP_PATH."data/test.txt");
	}
	if(!$isDataFolderWritable){
		$errorMap[] = array("important","Data folder is not writable","Provide wirte permission to the web server user to ".CLIENT_APP_PATH."data",array("sudo chmod 777 ".CLIENT_APP_PATH."data"));		
	}
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
    <meta name="author" content="">

	<title><?=APP_NAME?></title>

	<link rel="stylesheet" href="bootstrap/css/bootstrap.css">
	<link rel="stylesheet" href="style.css">
	<link rel="icon" href="bootstrap/image/config.gif" type="image/gif" sizes="16x16">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

	<script type="text/javascript" src="bootstrap/js/jquery.js"></script>
	<script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="bootstrap/js/jquery.buttonLoader.js"></script>
</head>
<body>

	<script type="text/javascript">

  	$(document).ready(function() {
  		var url = top.location.href;
  		
  		url = url.substring(0,url.lastIndexOf('/app'));
  		$("#BASE_URL").val(url);	
  	});

  		function testDB(){
  		$('#testBtn').buttonLoader('start');	
  	  	var request = {};
  	  	request["APP_DB"] = $("#APP_DB").val();
  	  	request["APP_USERNAME"] = $("#APP_USERNAME").val();
  	  	request["APP_PASSWORD"] = $("#APP_PASSWORD").val();
  	  	request["APP_HOST"] = $("#APP_HOST").val();
  	  	request["action"] = "TEST_DB";

	  	$.post("submit.php",request , function(data) {
	  		
	  		if(data.status == "SUCCESS"){
	  			alert(data.msg);
	  			$('#testBtn').buttonLoader('stop');
	  			$("#installBtn").removeAttr('disabled');
	  		}else{
	  			alert(data.msg);
	  			$('#testBtn').buttonLoader('stop');
	  		}
	  	},"json");
  	}

  	function install(){
  		$('#installBtn').buttonLoader('start');
  	  	var request = {};
  	  	request["APP_DB"] = $("#APP_DB").val();
  	  	request["APP_USERNAME"] = $("#APP_USERNAME").val();
  	  	request["APP_PASSWORD"] = $("#APP_PASSWORD").val();
  	  	request["APP_HOST"] = $("#APP_HOST").val();
  	  	request["action"] = "INS";

  	  	request["LOG"] = $("#LOG").val();
  	  	request["BASE_URL"] = $("#BASE_URL").val();

  	  	if(request["BASE_URL"] == undefined || request["BASE_URL"] == null 
  	    	  	|| request["BASE_URL"] == ""){
  	  		alert("Invalid Base URL");
    	  	return;
  	  	}

  	  	if(request["BASE_URL"].indexOf("http://") == 0 || request["BASE_URL"].indexOf("https://") == 0){
  	  	}else{
  	  	  	alert("Invalid Base URL");
  	  	  	return;
  	  	}

  	  	if(!endsWith(request["BASE_URL"],"/")){
  	  		request["BASE_URL"] = request["BASE_URL"] + "/";  	
  	  	}
  	  	$("#installBtn").attr('disabled','disabled');
	  	$.post("submit.php",request , function(data) {
	  		
	  		if(data.status == "SUCCESS"){
	  			alert(data.msg);
	  			$('#installBtn').buttonLoader('stop');
	  			top.location.href = request["BASE_URL"]+"app/";
	  		}else{
	  			alert(data.msg);
	  			$('#installBtn').buttonLoader('stop');
	  			$("#installBtn").removeAttr('disabled');
	  		}
	  	},"json");
  	}

  	function endsWith(str,pattern) {
  	    var d = str.length - pattern.length;
  	    return d >= 0 && str.lastIndexOf(pattern) === d;
  	};

  </script>

	<div class="container-fluid" style="max-width:800px;padding-top:10px;margin:auto">
	 <h1><?=APP_NAME?> Installation</h1><img id="install" src="bootstrap/image/install.gif" alt="Install"> 
  	<p class="label label-warning p1">
  	Please do not install this application if you have already installed (this could break existing installation)
  	</p>
  	<?php if(count($errorMap)>0){?>
	  	<?php foreach($errorMap as $error){?>
	  	<p class="p2">
	  	<span style="font-size:14px;font-weight: bold;" class="label label-danger"><?=$error[1]?></span><br/>
	  	<?=$error[2]?><br/>
	  		<?php if(!empty($error[3]) && is_array($error[3])){?>
	  			
		  		<?php foreach($error[3] as $command){?>
		  		<span class="label label-danger">
		  		<?=$command?></span><br/>
		  		<?php }?>
		  		
		  	<?php }?>
	  	</p>
		<hr/>  	
	  	<?php }?>
	  	Once above errors are corrected, please reload the page<br/><br/>
	  	<button onclick="location.reload();;return false;" class="btn btn-info">Reload</button>
	  <?php }else{?>
	  			<form class="form-horizontal" id="install_step1">
				<div class="form-group">
					<span class="label label-warning" id="install_step1_error" style="display:none;"></span>
				</div>
			<div class="form-group">
				<label class="control-label" for="LOG">Log file path</label>
				  	<input class="form-control" type="text" id="LOG" name="LOG" value="data/punch-in.log"/>
				  	<span class="label label-default p1">Keep this empty if you want logs to be in web server's default logs</span>
			</div>
			<div class="form-group">
				<label class="control-label" for="BASE_URL">App Url</label>
				  	<input class="form-control" type="text" id="BASE_URL" name="BASE_URL" value=""/>
				  	<span class="label label-default p1">This is the web path to folder that you copy <?=APP_NAME?> sources (e.g http://yourdomain.com/<?=APP_NAME?>/)</span>
			</div>
			<div class="form-group">
				<label class="control-label" for="APP_DB">MySql Database Name</label>
				  	<input class="form-control" type="text" id="APP_DB" name="APP_DB" value="punchindb"/>
				  	<span class="label label-default p1">Application DB Name</span>
			</div>
			<div class="form-group">
				<label class="control-label" for="APP_USERNAME">Database User</label>
				  	<input class="form-control" type="text" id="APP_USERNAME" name="APP_USERNAME" value="root"/>
				  	<span class="label label-default p1">Database username</span>
			</div>
			<div class="form-group">
				<label class="control-label" for="APP_PASSWORD">Database User Password</label>
				  	<input class="form-control" type="password" id="APP_PASSWORD" name="APP_PASSWORD" value=""/>
				  	<span class="label label-default p1">Database user's password</span>
			</div>
			<div class="form-group">
				<label class="control-label" for="APP_HOST">Database Host</label>
				  	<input class="form-control" type="text" id="APP_HOST" name="APP_HOST" value="localhost"/>
				  	<span class="label label-default p1">MySql DB Host</span>
			</div>
			<div class="form-group">
		      		<button id="testBtn" onclick="testDB();return false;" class="btn btn-default">Test Database Connectivity</button>
		      		<button id="installBtn" onclick="install();return false;" class="btn btn-success" disabled="disabled">Install Application</button>
		  	</div>
		</form>
	<?php }?>
	</div>
	<div class="row-fluid" style="height:10px;">
      <div class="span12" style="padding:5px;">
        <p style="text-align:center;font-size: 10px;">
          <span class="label label-primary p1"><?=APP_NAME?> All rights reserved.</span>
    	</p>
      </div>
    </div>
</body>
</html>

