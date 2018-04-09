$(document).ready(function() {
    var topic = "CPU Scheduling";
    $('#side_top_navbar').load('../base.html', function () {
        $('.left').html(topic);
    })

    /*particlesJS.load('particles-js', '../particles.json', function() {
        console.log('particles.json config loaded');
    });*/


});

var file_n     = 0;

function add_file()
{
	size  = $("#file-size").val();
	name  = $("#file-name").val();
			input = '1 file' + file_n + ' ' + parseInt(size) + ' ' + name;
			file_n++;
			console.log(input);
}

function delete_file()
{
	name  = $("#file-name").val();
			input = '1 file' + file_n + ' ' + name;
			file_n++;
			console.log(input);
}
