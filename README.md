# Tip-Line
A cross-platform mobile application developed with Adobe Phonegap for [Airline Ambassadors International](http://airlineamb.org)

## Release Notes

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
To test the application in Xcode, navigate to `/platforms/ios/TipLine.xcodeproj`

To test the application in Android Studio, select the `Open an existing Android Studio project` and select the android platform directory `/platforms/android`

To test the application in your Browser run:
```
phonegap serve
```
