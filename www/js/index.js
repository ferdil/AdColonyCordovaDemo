/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 * @author F. Ladeira (https://github.com/ferdil)
 */

// AdColony Constants
// User Meta-data values
const USER_MALE = "male";
const USER_FEMALE = "female";
const USER_SINGLE = "single";
const USER_MARRIED = "married";
const USER_EDUCATION_GRADE_SCHOOL = "grade_school";
const USER_EDUCATION_SOME_HIGH_SCHOOL = "some_high_school";
const USER_EDUCATION_HIGH_SCHOOL_DIPLOMA = "high_school_diploma";
const USER_EDUCATION_SOME_COLLEGE = "some_college";
const USER_EDUCATION_ASSOCIATES_DEGREE = "associates_degree";
const USER_EDUCATION_BACHELORS_DEGREE = "bachelors_degree";
const USER_EDUCATION_GRADUATE_DEGREE = "graduate_degree";

var app = {
	// Application Constructor
	initialize: function () {
		var retryCount = 0;
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

		// These are examples of the events that occur. Use them to tune your UI (e.g. enable/disable buttons etc.)
		document.addEventListener('ConfigureSuccess', function () {
			console.log('AdColonyPlugin: Configuration successfully completed');
			document.getElementById('info').innerHTML = "Config Done";
			// Register the above method as the reward receiver
			AdColony.registerRewardReceiver('AdColony.onRewardReceived');
			AdColony.requestInterstitialInZone();
		});
		document.addEventListener('AdColonyRequestSubmitted', function () {
			console.log('AdColonyPlugin: Interstitial ad request submitted');
			document.getElementById('info').innerHTML = "Ad Requested";
		});
		document.addEventListener('AdColonyRequestFilled', function () {
			console.log('AdColonyPlugin: Interstitial ad loaded :');
			document.getElementById('info').innerHTML = "Ad Ready";
		});
		document.addEventListener('AdColonyRequestNotFilled', function (error) {
			console.log('AdColonyPlugin: Request Failed :');
			if (retryCount++ < 5) {
				// Failed so retry after 3 seconds
				setTimeout(function () {
					AdColony.requestInterstitialInZone();
				}, 3000);
			} else {
				alert("Unable to get an advert after 5 tries. Please try later");
			}
		});
		document.addEventListener('AdColonyRequestOpened', function () {
			console.log('AdColonyPlugin: Interstitial ad opened :');
		});
		document.addEventListener('AdColonyRequestClosed', function () {
			console.log('AdColonyPlugin: Interstitial ad closed :');
			document.getElementById('info').innerHTML = "Ad Done";
			// Closed, so get another one in the meantime
			AdColony.requestInterstitialInZone();
		});
		document.addEventListener('AdColonyRequestExpiring', function () {
			console.log('AdColonyPlugin: Interstitial ad expired :');
			document.getElementById('info').innerHTML = "Ad Expired";
			AdColony.requestInterstitialInZone();
		});
	},

	// Bind the cordova deviceready event
	onDeviceReady: function () {
		this.receivedEvent('deviceready');
	},

	// Update DOM on a Received Event
	// And setup AdColony when the device is ready
	receivedEvent: function (id) {
		console.log('Browser :' + navigator.userAgent);
		console.log('Received Event: ' + id);

		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		// Example of receiving a reward notification
		AdColony.onRewardReceived = function (reward) {
			console.log('Reward received :' + JSON.stringify(reward));
			// On IOS you need a delay here for the UI to catch up
			// On Android you can go right ahead. Strike another + for Android
			window.setTimeout(function () {
				if (reward.success === true)
					alert("You have received " + reward.rewardamount + " " + reward.rewardname);
			}, 10);
		};
		// Example of setting
		AdColony.setAdOptions({
			"confirmation_enabled": false,
			"results_enabled": true
		});

		AdColony.setUserMetaData({
			"adc_age": 28,
			"adc_gender": USER_MALE,
			"adc_marital_status": USER_MARRIED, // Or "married"
			"adc_education": USER_EDUCATION_BACHELORS_DEGREE,
			"adc_household_income": 0.0,
			"adc_zip": "WD245GJ",
			"adc_interests": "golf"
		});
		// Optionally check which platform you have and pass the APP_ID and ZONE_ID here
		// Example of setting App options
		var appOptions = [{ // See AdColonyAppOptions
			"origin_store": "google",
			"app_orientation": "0",
			"orientation": "1"
		}];

		if (navigator.userAgent.indexOf('Android') > 0) {
			AdColony.configureWithAppID('app185a7e71e1714831a49ec7', 'vz1fd5a8b2bf6841a0a4b826', appOptions);
		} else {
			// Use demo iOS App and Zone IDs
			AdColony.configureWithAppID('appbdee68ae27024084bb334a', 'vzf8e4e97704c4445c87504e', appOptions);
		}
	},

	showAdColonyAd: function () {
		AdColony.showWithPresentingViewController();
	}
};

app.initialize();