# Club Stride

A step counter application built with React Native that rewards users with perks for completing step goals.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

* To get the project files open terminal/command prompt and do the following commands in the directory you wish to clone the repo :
```
$ git clone https://github.com/sangbpark94/clubstridenative.git
$ cd clubstridenative/mobileapp
$ npm install
```
* Next, we will need to install the config.js file which is stored in our google drive. This file is located in the main directory. Once downloaded, the config.js will need to be included in the

.
  ├── mobileapp
    ├── components                  
    ├── images                    
    ├── navigation                     
    ├── pages                    
    ├── config.js
    └── README.md

## Deployment

Guide to how to deploy this on a live system which uses Expo XDE.
We recommend following the Expo XDE [Up and Running Guide](https://docs.expo.io/versions/v27.0.0/guides/up-and-running.html).



## Prerequisites

The things you need to install the software and how to install them:

### npm

If you do not have npm installed on your system you will first need to install Node.js. When you install node.js, npm is automatically installed.
* [ Node.js ](https://nodejs.org/en/download/)

After installing run node -v to verify it was successfully installed:
```
$ node -v
```

### Expo XDE

To deploy the application, we will be use Expo XDE. If you do not have it currently installed:
* [ Expo XDE ](https://github.com/expo/xde/releases)

### iOS simulator

Install Xcode through the Apple App Store. Next, open up Xcode, go to preferences and click the Components tab, install a simulator from the list.
Once the simulator is open and you have a project open in XDE, you can press Open on iOS simulator in XDE and it will install the Expo Client to the simulator and open up your app inside of it.

### Android emulator

Download [ Genymotion ](https://www.genymotion.com/fun-zone/) and follow the [ Genymotion installation guide ](https://docs.genymotion.com/latest/Content/01_Get_Started/Installation.htm). Once you've installed Genymotion, create a virtual device - we recommend a Nexus 5, the Android version is up to you. Start up the virtual device when it's ready.
Once the emulator is open and you have a project open in XDE, you can press Open project in Expo on Android in XDE and it will install the Expo client to the emulator and open up your app inside of it. If you run into any issues follow our [ Genymotion guide ](https://docs.expo.io/versions/latest/guides/genymotion.html#genymotion).
