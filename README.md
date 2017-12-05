# Tip-Line
A cross-platform mobile application developed with Adobe Phonegap for [Airline Ambassadors International](http://airlineamb.org)

## Release Notes (v1.0.3 // 12-1-2017)

**Features:** Intial application rollout to the Google play store and the Apple App store. Supports registration key authentication, user registration, geolocation service, hotline calling capabilities, report submission, and user report list. 

**Fixed:** Configuration settings to meet the requirements for Apple app store approval.

**Bugs/Defects:** Add Video tag on report submission page doesn't render properly and doesn't show all the time. Adding an image causes a visual bug for the image thumbnail. In the Report List tab, if a report contains multiple media links, all the links direct to the most recent media link instead of their respective media link. 

## Prerequisites
### [Install NodeJS](http://nodejs.org/)

### Install Device SDKs
Install the SDKs for iOS and Android to build and run the project for each device.

#### Install iOS SDKs
[Install XCode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
Once Xcode is installed, several command-line tools need to be enabled for Cordova to run. From the Xcode menu, select Preferences, then the Downloads tab. From the Components panel, press the Install button next to the Command Line Tools listing.

#### Install Android SDKs
[Instructions for Android SDK](http://docs.phonegap.com/en/edge/guide_platforms_android_index.md.html#Android%20Platform%20Guide)

### Install Cordova
```
npm install -g cordova
```

### Install Phonegap CLI
```
npm install -g phonegap
```

### Plugins
  * [Camera](https://www.npmjs.com/package/cordova-plugin-camera) plugin
  * [File](https://www.npmjs.com/package/cordova-plugin-file) plugin
  * [File Transfer](https://www.npmjs.com/package/cordova-plugin-file-transfer) plugin
  * [Geolocation](https://www.npmjs.com/package/cordova-plugin-geolocation) plugin
  * [Capture](https://www.npmjs.com/package/cordova-plugin-media-capture) plugin
  * [NativeGeocoder](https://www.npmjs.com/package/cordova-plugin-nativegeocoder) plugin

## Setup
Clone the repo and change into the directory:
```
git clone https://github.com/Tribe-Tip-Line/Tip-Line.git
cd Tip-Line/
```

### Build the application
To build the application for iOS run:
```
phonegap build ios
```

To build the application for android run:
```
phonegap build android
```

To build the application for browser run:
```
phonegap build browser
```
### Test the application
To test the application in Xcode, navigate to `/platforms/ios/TipLine.xcodeproj` and open it

To test the application in Android Studio, select the `Open an existing Android Studio project` and select the android platform directory `/platforms/android`

To test the application in your local browser run:
```
phonegap serve
```
and navigate to `http://localhost:3000` in your browser

## Troubleshooting
If you are having trouble building the application, try removing the platform:
```
cordova platform remove <platform>
```
and adding the platform back:
```
cordova platform add <platform>
```

If you are having trouble with plugins, try removing the plugin:
```
cordova plugin remove <plugin>
```

and adding the plugin back:
```
cordova plugin add <plugin>
```

For more information on Cordova visit: https://cordova.apache.org/docs/en/latest/

For more information on PhoneGap visit: http://docs.phonegap.com

For more information on Xcode: https://developer.apple.com/xcode/

For more information on Android Studio: https://developer.android.com/studio/index.html

