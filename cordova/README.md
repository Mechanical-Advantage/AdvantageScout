# Advantage Scout App
This is an alternate version of the scouting interface, built as an Android app using Cordova. This allows devices to communicate over Bluetooth Serial rather than relying on PAN. The server can be configured to use Bluetooth Serial (in addition to standard functions) in the configuration at the start of the file.

## Installation
The app is not available on the Google Play Store, so it must be installed one of two ways:
1. Go to the /download page on the web server
2. Use the short link http://bit.ly/6328scout

## Changelog
### 1.17.0
* Added match type dropdown

### 1.16.0
* Added support for mode aliases

### 1.15.1
* Added beep sound when message received

### 1.15.0
* Added support for messaging system

### 1.14.0
* Added stopwatch input to classic layout

### 1.13.0
* Added indication of which scouts are ready on schedule

### 1.12.0
* Added tracking of current scout name

### 1.11.0
* Added auto fill of team and match from schedule

### 1.10.3
* Fixed hiding of schedule after submitting

### 1.10.2
* Added removal of non utf-8 characters in text boxes

### 1.10.1
* Fixed instruction text in place in help box

### 1.10.0
* Added notes area for pit scouting
* Cleaned up startup process when unconfigured

### 1.9.0
* Added support for help text when pit scouting
* Increased size of help text box
* Added reset of scroll position in help text box

### 1.8.0
* Changed button text for switching between match and pit scouting
* Added help text

### 1.7.1
* Bug fixes and cleanup when writing to serial
* Fixed loading of scout list from cache

### 1.7.0
* Added section of scout list for upcoming match
* Added indicator of the last time game data was cached from the server

### 1.6.0
* Added hiding of schedule after upload

### 1.5.4
* Added indicator of whether a debug or release build

### 1.5.3
* Added tracking of "plugged in" status

### 1.5.2
* Added default value to scout selection
* Made AppManager accessible to the CanvasManager

### 1.5.1
* Added battery level tracking

### 1.5.0
* Added support for new on-the-fly scheduling system

### 1.4.5
* Added support for hiding classic start button

### 1.4.4
* Added support for number fields

### 1.4.3
* Added alert when forwarding server cannot reach main server

### 1.4.2
* Add option to change image quality
* New mode selector to increase clarity

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
