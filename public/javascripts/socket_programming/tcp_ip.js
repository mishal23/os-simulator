$(document).ready(function() {
	$('.test').show();
	var topic = "TCP/IP Simulation";
    $('#side_top_navbar').load('../base.html', function(){
    	$('.left').html(topic);
    });
	particlesJS.load('particles-js', '../particles.json', function() {
		console.log('callback - particles.json config loaded');
	});
	
    $(".macbook-content").css("background-color","#000");
    $("#server").hide();
    $(".macbook1-content").css("background-color","#000");

    $("#client").hide();
    $(".wifi1").hide();
    $(".wifi2").hide();
    $(".fa-telegram").hide();

    // hide all buttons except for socket intially
    $("#bind").hide();
    $("#listen").hide();
    $("#connect").hide();
    $("#accept").hide();
    $("#send").hide();
    $("#receive").hide();
    $("#close").hide();

    var string = "";
    string+="10.10.100.80<br>";

    $("#socket").click(function(){
    	$("#server").show();
    	$(".macbook-content").css("background-color","#fff");

    	$("#client").show();
    	$(".macbook1-content").css("background-color","#fff");

    	$("#bind").show();
    });
    $("#bind").click(function () {
    	$("#ip").typed({
		    strings: [
		      string
		    ],
		    typeSpeed: 0,
		 });
    	$("#listen").show();
    });
    $("#listen").click(function () {
    	$(".wifi1").show();
    	$(".wifi1").addClass("blink");

    	$("#connect").show();
    });
    $("#connect").click(function () {
    	$(".wifi2").show();
    	$(".wifi2").addClass("blink");

    	$("#accept").show();
    });
    $("#accept").click(function () {
    	
    	$(".wifi1").removeClass("blink");
    	$(".wifi2").removeClass("blink");

    	$("#send").show();
    });
    
    $("#send").click(function () {
    	$(".wifi1").hide();
    	$(".wifi2").hide();
    	$(".fa-telegram").show();
    	$(".fa-telegram").addClass("send-sim");
    	var client_message = "Message received from server"
    	setTimeout(function(){
    		$("#client-message").typed({
		    strings: [
		      client_message
		    ],
		    typeSpeed: 0,
		 });
    	}, 2300);	
    	

    	$("#receive").show();
    });
    $("#receive").click(function () {
    	$(".fa-telegram").show();
    	$(".fa-telegram").removeClass("send-sim");
    	$(".fa-telegram").addClass("receive-sim");
    	$("#close").show();

    	var server_message = "Message received from client"
    	setTimeout(function(){
    		$("#server-message").typed({
		    strings: [
		      server_message
		    ],
		    typeSpeed: 0,
		 });
    	}, 2500);	
    	
    });
    $("#close").click(function () {
	    $(".macbook-content").css("background-color","#000");
	    $("#server").hide();
	    $("#client").hide();
	    $("#ip").hide();
	    $(".macbook1-content").css("background-color","#000");

	    $("#server-message").hide();
	    $("#client-message").hide();
        window.location.reload();
    });
});