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
})

// to set height - jugaad
var height = $(window).height() - $('.top-navbar').height();
$('.side-navbar').height(2*height);

// set initially the file onclick as hidden
$(".row").hide();

// toogle file click function
function openFile(){
	$('.row').toggle(100);
}