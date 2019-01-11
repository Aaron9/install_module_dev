<?php

ini_set('error_log', 'data/punch-in.log');

define('APP_NAME', 'Punch-In');

define('CLIENT_NAME', 'app');
define('APP_BASE_PATH', 'C:\xampp7\htdocs\punch-in/core/');
define('CLIENT_BASE_PATH', 'C:\xampp7\htdocs\punch-in\app/');
define('BASE_URL','http://localhost:7777/punch-in/web/');
define('CLIENT_BASE_URL','http://localhost:7777/punch-in/app/');

define('APP_DB', 'punchindb');
define('APP_USERNAME', 'root');
define('APP_PASSWORD', '');
define('APP_HOST', 'localhost:3307');
define('APP_CON_STR', 'mysqli://'.APP_USERNAME.':'.APP_PASSWORD.'@'.APP_HOST.'/'.APP_DB);

define('APP_FAVICON_PATH', '_APP_BASE_FAVICON_PATH_');
define('FILE_TYPES', 'jpg,png,jpeg');
define('MAX_FILE_SIZE_KB', 1024);

define('APP_DEV', 'Aishwary Ujjwal');
