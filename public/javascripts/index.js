$(document).ready(function() {

	$('#side_top_navbar').load('base.html');

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


	/*$('#shutdown-button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("HI");
		$(this).removeClass("animated slideInUp");
	});*/

	$(".row").hide();
});
function openFile(){
	$('.row').toggle(100);
}
