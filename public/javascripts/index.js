$(document).ready(function() {

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

	var height = $(window).height() - $('.top-navbar').height();

	$('.side-navbar').height(height);
	$('.desktop').height(height);
	/*$('#shutdown-button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("HI");
		$(this).removeClass("animated slideInUp");
	});*/

	$(".row").hide();
	// side navbar
	$('.navbar-toggle').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);

        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').toggleClass('slide-in');
        
    });
   

});
function openFile(){
	$('.row').toggle(100);
}
