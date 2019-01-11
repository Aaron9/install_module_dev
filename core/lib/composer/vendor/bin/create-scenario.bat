@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../g1a/composer-test-scenarios/scripts/create-scenario
bash "%BIN_TARGET%" %*
