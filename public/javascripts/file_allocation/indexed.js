$(document).ready(function() {
    var topic = "CPU Scheduling";
    $('#side_top_navbar').load('../base.html', function () {
        $('.left').html(topic);
    })

    /*particlesJS.load('particles-js', '../particles.json', function() {
        console.log('particles.json config loaded');
    });*/


});

var SIZE        = 64;
var BLOCK_WIDTH = 100.0/64.0;
var n_blocks    = 0;
var color       = ['red', 'deep-purple', 'light-blue', 'teal', 'yellow', 'deep-orange', 'blue-grey', 'pink', 'indigo', 'cyan', 'light-green', 'amber', 'brown', 'purple', 'blue', 'lime', 'orange', 'grey'];
var file_n      = 0;
var file_names  = [];


function add_file()
{
	size  = $("#file-size").val();
	fname  = $("#file-name").val();
	var input = ' 1 ' + fname + ' ' + parseInt(size) + ' ' + '0';
			// file_n++;
			console.log(input);
			send_request(input);
}

function send_request(input_f) {
    $.ajax({
        type: "POST",
        url: "/file_allocation/indexed",
        data: {input : input_f},
        success: function(result){
            console.log(result);
            result = result.split('\n');
            result = result.slice(0, result.length-1);
            console.log(result);
            handle_output(result);
            window.scrollTo(0,document.body.scrollHeight);
        },
        async: false
    });
}

function handle_output(output) {
    console.log(output);
    put_blocks();
    file_names= [];
    $('.file-chips').html('');
    for(var i=0; i<output.length; i++){
        o = output[i].split(' ');
        fname = o[0];
        size = parseInt(o[1]) + 1;
        fbs  = []; // file blocks
        for(var j=0; j<size; j++)
            fbs.push(parseInt(o[j+2]));
        put_file(name, fbs, i);
        file_names.push(name);
    }
}

function put_blocks() {
    console.log("Putting blocks");
    $('.blocks').html('');
    for(var i=0; i<64; i++){
        var block = '<div class="block" id="block-' + i + '"></div>';
        $('.blocks').append(block);
        $('#block-'+i).css('width', BLOCK_WIDTH+'%');
    }
}

function put_file(name, fbs, n){
    console.log("Putting file name");
    var file_chip = '<div class="row" id="file-' + name + '"><div class="col chip ' + color[n] + '">' + name + '<i class="close material-icons" onclick="delete_file(\'' + name + '\')">close</i></div><div>';
    $('.file-chips').append(file_chip);
    for(var i=0; i<fbs.length; i++){
        $('#block-'+fbs[i]).attr('class', 'block '+color[n]);
        if(i==0)
            $('#file-'+name).append('<div class="col chip block-number ' + color[n] + '">' + fbs[i] + '</div>');
        else
            $('#file-'+name).append('<div class="col chip block-number">' + fbs[i] + '</div>');
    }
}

// function delete_file()
// {
// 	name  = $("#file-name").val();
// 			input = '1 file' + file_n + ' ' + name;
// 			file_n--;
// 			console.log(input);
// }
