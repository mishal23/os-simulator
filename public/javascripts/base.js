$(document).ready(function () {

	// to load the time
	setInterval(function() {
		var time = new Date();
		var	hours = time.getHours();
		var	minutes = time.getMinutes();

		if(minutes<10) 
		{
			minutes = "0" + minutes;
		}

		if(hours>=12) 
		{
			hours = hours-12;
			$('.top-navbar .right .am-pm').text('PM');
		}

		else 
		{
			$('.top-navbar .right .am-pm').text('AM');
		}

		$('.top-navbar .right .time').text(hours + ':' + minutes);

	},1000);

	$("#shutdown-button").click(function(){
		$("body").fadeOut();
		$("body").css("background-image","none");
		$("body").css("background-color","#000");
	});
});

// to set height - jugaad
var height = $(window).height() - $('.top-navbar').height();
$('.side-navbar').height(2*height);

// set initially the file onclick as hidden
$("#side_bar").hide();

$(".desktop-overlay").hide();

$(".side-navbar button").click(function(){
	$(".desktop-overlay").fadeToggle('200');

	$(".side-navbar").toogleClass('opacity');
});
// toogle file click function
function openFile(){
	$('#side_bar').toggle(100);
}