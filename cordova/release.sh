#!/bin/bash

#Get app version
raw=`cat config.xml`
raw=`echo "$raw" | tr '\n' '_'`
IFS='"' read -a split <<< "${raw}"
version="${split[3]}"

#Build android app
cordova build android --release

#Copy apk to releases folder
cp "platforms/android/app/build/outputs/apk/release/app-release.apk" "releases/AdvantageScout ${version}.apk"
cp "platforms/android/app/build/outputs/apk/release/app-release.apk" "releases/AdvantageScout.apk"
echo "AdvantageScout ${version} copied to \"releases\" folder"
