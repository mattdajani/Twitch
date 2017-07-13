// Show Twitch streamer user info and online status
// Making multiple calls with the Twitch API using callbacks
// Aysnc calls must be in order to properly show online status of users

var streamerNames = ["freecodecamp", "medrybw", "noobs2ninjas", "ESL_SC2", "OgamingSC2", "cretetion", "habathcx", "RobotCaleb"];
var resultsBox = document.getElementById('resultsBox');

for (var i in streamerNames){
	getUserInfo(i, userCallback);
};

function getUserInfo(index, firstCallback) { // fires first
    var xhr = new XMLHttpRequest();
    var userUrl = "https://wind-bow.glitch.me/twitch-api/users/" + streamerNames[index];
    xhr.onload = function () {
        if(xhr.status !== 200) {
            throw new Error('request failed');
        }
        firstCallback(xhr.responseText, index);
    }
    xhr.onerror = xhrErrorHandler;
    xhr.open('GET', userUrl, true);
    xhr.send();
};

function userCallback(data, index){ // first callback
        var data1 = JSON.parse(data);
        getStatus(data1, index, statusCallback);
    };

function getStatus(userInfoData, index, secondCallback) { // fires second to check online status
    var xhr = new XMLHttpRequest();
    var statusUrl = "https://wind-bow.glitch.me/twitch-api/streams/" + streamerNames[index];
    xhr.onload = function () {
        if(xhr.status !== 200) {
            throw new Error('request failed');
        }
        secondCallback(xhr.responseText, userInfoData);
    }
    xhr.onerror = xhrErrorHandler;
    xhr.open('GET', statusUrl, true);
    xhr.send();
};

function statusCallback(userStatusData, userInfoData){ // second callback
        var userStatusData = JSON.parse(userStatusData);
        appendUser(userInfoData, userStatusData);
    };

function appendUser(userInfo, statusInfo){ // final function
	resultsBox.innerHTML += "<div class=row>" + 
	"<div class=col-xs-4><img class='img-responsive img-circle' src=" + userInfo.logo + "></div>"+
	"<div class=col-xs-4><p>" + userInfo.name + "</p></div>"
	+ "<div class=col-xs-4><p id=" + userInfo.name + ">" + isOnline(statusInfo) + "</p></div></div>";
};

function isOnline(statusInfo){
	if(statusInfo.stream !== null) return 'Online';
	return 'Offline';
};

function xhrErrorHandler(){
	console.log('XHR error');
};
