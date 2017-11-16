# AdColony Cordova Demo App
## Demo App that shows AdColony ads within an Apache Cordova App.

Displays AdColony Ads within a Cordova App, controlled by JavaScript on both iOS and Android platforms. Requires the AdColony SDK.

iOS SDK version is 3.2.1.0

Android SDK version is 3.2.1

Please make sure that you read the AdColony Project setup guides for both Android and iOS if you're building on both platforms.

All the documentation is available from here:

[AdColony Android SDK 3](https://github.com/AdColony/AdColony-Android-SDK-3)

[AdColony iOS SDK 3](https://github.com/AdColony/AdColony-iOS-SDK-3)

I recommend that you use cocoapods to install the AdColony Framework dependency

# Using this Code

First create a Cordova App
```
$ cordova create AdColonyDemoApp com.example.acdemo AdColonyDemoApp
$ cd AdColonyDemoApp
```

Next add the Cordova iOS and Android platforms
```
$ cordova platform add android
$ cordova platform add ios
```

Finally add the AdColony Plugin

```
$ cordova plugin add https://github.com/ferdil/AdColonyCordovaDemo.git
```

Replace the generated www folder with the one from this 
```
$ cp -R <src folder>/www/ AdColony
```

 
The demo uses the following AdColony demo APP\_ID and ZONE_ID:

```
Android APP_ID=app185a7e71e1714831a49ec7
Android ZONE_ID=vz1fd5a8b2bf6841a0a4b826


iOS APP_ID=appbdee68ae27024084bb334a
iOS ZONE_ID=vzf8e4e97704c4445c87504e
```

See the  [cordova-plugin-adcolony](https://github.com/ferdil/AdColonyCordovaDemo) repository on GitHub


##If you have saved some time using my work, do consider donating me something :-)

[Donations through PayPal gratefully accepted![paypal.me](https://www.paypalobjects.com/webstatic/paypalme/images/social/pplogo120_4_3.png)](https://www.paypal.me/LADEIRA137)

Original iOS only version Author:
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QVU9KQVD2VZML)
