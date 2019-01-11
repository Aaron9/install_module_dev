<?php

error_reporting(E_ERROR);
date_default_timezone_set('Asia/Calcutta');
ini_set("error_log", "../data/app-install.log");
define('CURRENT_PATH',dirname(__FILE__));
define('CLIENT_APP_PATH',realpath(dirname(__FILE__)."/..")."/");
define('CLIENT_APP_CONFIG_PATH',realpath(dirname(__FILE__)."/..")."/config/");
define('APP_PATH',realpath(dirname(__FILE__)."/../..")."/core/");
define('APP_NAME',"Punch-In");
define('APP_ID',"punchin");

