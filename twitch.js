// https://wind-bow.glitch.me/ for more info
// example query https://wind-bow.glitch.me/twitch-api/users/freecodecamp

var streamerNames = ["freecodecamp", "medrybw", "noobs2ninjas"];
var namesLength = streamerNames.length;
var resultsBox = document.getElementById('resultsBox');

getUserInfo(namesLength);


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
};

function appendUser(userInfo, statusInfo){
	resultsBox.innerHTML += "<div class=row><div class=col-xs-6><p>" + userInfo.name + "</p></div>" + "<div class=col-xs-6><img class='img-responsive img-circle' src=" + userInfo.logo + "></div>"
	+ "<div class=col-xs-6><p>" + userInfo.bio + "</p></div>" + "<div class=col-xs-6><p id=" + userInfo.name + ">" + "online status placeholder" + "</p></div></div>";
};

function getUserInfo(length){
	for(var i = 0; i < length; i++){
		var infoUrl = "https://wind-bow.glitch.me/twitch-api/users/" + streamerNames[i];
		httpGetAsync(infoUrl, function(data){
			var userInfo = JSON.parse(data);
			console.log(userInfo);
});	
}
};

function getOnlineStatus(length){
	for(var i = 0; i < length; i++){
		var statusUrl = "https://wind-bow.glitch.me/twitch-api/streams/" + streamerNames[i];
	httpGetAsync(statusUrl, function(data){
		var userStatus = JSON.parse(data);
		console.log(userStatus);
	});
}
};
