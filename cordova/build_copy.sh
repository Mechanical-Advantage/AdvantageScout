#!/bin/bash
# Copies shared codebase from web source to cordova source before build

rm -r www/js/shared
cp -r ../static/js/shared www/js/shared
echo 'Copied shared js folder'
