$(document).ready(function() {
	var topic = "CPU Scheduling";
    $('#side_top_navbar').load('../base.html', function () {
    	$('.left').html(topic);
    })
});