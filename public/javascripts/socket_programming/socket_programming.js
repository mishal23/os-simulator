$(document).ready(function() {
	var topic = "Socket Programming";
    $('#side_top_navbar').load('../base.html', function(){
    	$('.left').html(topic);
    });
});