<?php
if(!defined('SIGN_IN_ELEMENT_MAPPING_FIELD_NAME')){define('SIGN_IN_ELEMENT_MAPPING_FIELD_NAME','employee');}

if(!defined('APP_NAME')){define('APP_NAME','Install Module');}
if(!defined('FB_URL')){define('FB_URL','https://www.facebook.com/im');}
if(!defined('TWITTER_URL')){define('TWITTER_URL','https://www.twitter.com/im');}

if(!defined('HOME_LINK_ADMIN')){
    define('HOME_LINK_ADMIN', CLIENT_BASE_URL . "?g=admin&n=dashboard&m=admin_Admin");
}
if(!defined('HOME_LINK_OTHERS')){
    define('HOME_LINK_OTHERS', CLIENT_BASE_URL . "?g=modules&n=dashboard&m=module_Personal_Information");
}

//Version
define('VERSION', '24.0.0.OS');
define('CACHE_VALUE', '24.0.0.OS');
define('VERSION_NUMBER', '2400');
define('VERSION_DATE', '26/06/2018');

if(!defined('CONTACT_EMAIL')){define('CONTACT_EMAIL','admin@gmail.com');}
if(!defined('KEY_PREFIX')){define('KEY_PREFIX','InstallModule');}
if(!defined('APP_SEC')){define('APP_SEC','dbcs234d2saaqw');}

define('UI_SHOW_SWITCH_PROFILE', true);
define('CRON_LOG', ini_get('error_log'));

define('MEMCACHE_HOST', '127.0.0.1');
define('MEMCACHE_PORT', '11211');

if(!defined('WK_HTML_PATH')){
    define('WK_HTML_PATH', '/usr/bin/xvfb-run -- /usr/local/bin/wkhtmltopdf');
}
define('ALL_CLIENT_BASE_PATH', 'http://localhost:7777/install_module_dev/');

define('LDAP_ENABLED', true);
define('RECRUITMENT_ENABLED', true);
define('APP_WEB_URL', 'http://localhost:7777/install_module_dev/');