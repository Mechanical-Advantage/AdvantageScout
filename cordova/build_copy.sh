#!/bin/bash
# Copies shared codebase from web source to cordova source before build

rm -r www/src
cp -r ../src www/src
