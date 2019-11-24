# Advantage Scout App
This is an alternate version of the scouting interface, built as an Android app using Cordova. This allows devices to communicate over Bluetooth Serial rather than relying on PAN. The server can be configured to use Bluetooth Serial (in addition to standard functions) in the configuration at the start of the file.

## Installation
The app is not available on the Google Play Store, so it must be installed one of two ways:
1. Go to the /download page on the web server
2. Use the short link http://bit.ly/6328scout

## Changelog
### 1.4.1
* Changes to improve reliability when initiating connection

### 1.4.0
* New protocol for Bluetooth communication on multiple devices

### 1.3.1
* Fix for upload button on old Android versions

### 1.3.0
* Added support for scout schedules
* Fixed bug when upload checks not provided
* Add alert when app version too new

### 1.2.1
* Added support for upload checks
* Internal cleanup

### 1.2.0
* Added pit scouting and image support

### 1.1.4
* Fixed a bug where the refresh button was not functional

### 1.1.3
* Switched to unified code base for web and app versions

### 1.1.2
* Fixed a bug causing button triggers to carry over when switching games

### 1.1.1
* Added timeout for bluetooth serial requests
* Added back button functionality on config screen
* Changed text when missing team or match number

### 1.1.0
* Added heartbeats
* Fixed a bug when pressing back after uploading a match

### 1.0.1
* Switched button text when leaving the scout screen using the back button
* Added compatibility down to Android 4.0
* Added version and interface type to matches

### 1.0.0
* First fully functioning version
