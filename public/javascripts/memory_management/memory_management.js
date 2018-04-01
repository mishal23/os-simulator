$(document).ready(function() {

	var topic = "Memory Management";
    $('#side_top_navbar').load('../base.html', function(){
    	$('.left').html(topic);
    });

});

var type = 0;      //0 -> first ; 1 -> best ; 2 -> Worst

function S(id){

    //to get element by id
    return document.getElementById(id)
}

function get_type(){

    //to get type of Fit
    if(document.getElementById("first").checked){

        type = 0;
        document.getElementById("worst").disabled = true;
        document.getElementById("best").disabled = true;
    }

    else if(document.getElementById("best").checked){

        type = 1;
        document.getElementById("worst").disabled = true;
        document.getElementById("first").disabled = true;
    }

    else if(document.getElementById("worst").checked){

        type = 2;
        document.getElementById("first").disabled = true;
        document.getElementById("best").disabled = true;
    }
}
