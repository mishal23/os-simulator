$(document).ready(function() {
	var topic = "Bankers";
    $('#side_top_navbar').load('../base.html' , function(){
    	$('.left').html(topic);
    });


});