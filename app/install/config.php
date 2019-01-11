<?php
error_reporting(E_ERROR);
ini_set("error_log", "../data/install_module_dev.log");
define('CURRENT_PATH', dirname(__FILE__));
define('CLIENT_APP_PATH', realpath(dirname(__FILE__)."/..")."/");
define('APP_PATH', realpath(dirname(__FILE__)."/../..")."/core/");
define('APP_NAME', "INSTALL MODULE");
define('APP_ID', "devmodule");