// $(document).ready(function() {
//     var topic = "CPU Scheduling";
//     $('#side_top_navbar').load('../base.html', function () {
//         $('.left').html(topic);
//     })
//
    // /*particlesJS.load('particles-js', '../particles.json', function() {
    //     console.log('particles.json config loaded');
    // });*/
//
//
// });
//
// var file_n     = 0;
//
// function add_file()
// {
// 	size  = $("#file-size").val();
// 	name  = $("#file-name").val();
// 			input = '1 file' + file_n + ' ' + parseInt(size) + ' ' + name;
// 			file_n++;
// 			console.log(input);
// }
//
// function delete_file()
// {
// 	name  = $("#file-name").val();
// 			input = '1 file' + file_n + ' ' + name;
// 			file_n++;
// 			console.log(input);
// }
$(document).ready(function(){
    particlesJS.load('particles-js', '../particles.json', function() {
        console.log('particles.json config loaded');
    });
});

var SIZE       = 64;
var n_blocks   = 0;
var color      = ['red', 'deep-purple', 'light-blue', 'green', 'yellow', 'deep-orange', 'blue-grey', 'pink', 'indigo', 'cyan', 'light-green', 'amber', 'brown', 'purple', 'blue', 'lime', 'orange', 'grey'];
var file_n     = 0;
var file_names = [];
var input = '';
var allocated = 0;
var sum =0;

function S(id){
    return document.getElementById(id)
}

function add_file_block(start, size){
    left  = start / 64 * 100;
    width = size / SIZE * 100;
    $('#storage').append('<div class="card '+color[n_blocks]+' file-block" onclick="delete_block(' + n_blocks + ')"><div class="card-content"></div></div>');
    $('.'+color[n_blocks]).css({'left': left+'%', 'width': width+'%'});
    $('.'+color[n_blocks]).append('<div class="start">'+start+'</div><div class="size">'+size+'</div>');
    n_blocks++;
}

function to_int(output){
    for(var i=0;i<output.length;i++)
        output[i] = parseInt(output[i]);
    return output.slice(0, output.length-1);
}

function handle_output(out){
    console.log(out);
    //var output =
    starts     = [];
    sizes      = [];
    file_names = [];
    for(var j = 0; j < out.length; ++j) {
        var output = out[j].split('\t');
        console.log(output);
        for (var i = 0; i < output.length; i++) {
            if (i % 3 == 0) file_names.push(output[i]);
            else if (i % 3 == 1) sizes.push(parseInt(output[i]));
            else starts.push(parseInt(output[i]));
        }
    }
    S('storage').innerHTML = "";
    n_blocks = 0;
    console.log(starts);
    console.log(sizes);
    for(var i=0;i<starts.length;i++)
        add_file_block(starts[i], sizes[i]);
}

function delete_block(i){
    input += ' 2 '+ file_names[i];
    allocated -= sizes[i];
    sum=+sum- +sizes[i];
    send_request(input);
}

function add_file(){
    size  = S('file-size').value;
    sum = +sum + +size;
    console.log(sum);
    if(sum>64)
    {
        Materialize.toast("Memory not available", 2000);
        sum = sum - size;
    }
    else if(size <= 0)
    {
        Materialize.toast("Invalid input", 2000);
        sum= +sum - +size;
    }
    else {
        allocated += size;
        input += ' 1 file' + file_n + ' ' + parseInt(size);
        file_n++;
        send_request(input);
    }
}

function send_request(input){
    // console.log(input);
    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState == XMLHttpRequest.DONE) {
    //         output = xhr.responseText;
    //         if(output[0]!='f'){
    //             Materialize.toast(output, 1500);
    //             return;
    //         }
    //         output = output.split('\n').join(' ');
    //         console.log(output)
    //         handle_output(output.split(' '));
    //         window.scrollTo(0,document.body.scrollHeight);
    //     }
    // }
    // xhr.open('GET', '/contigous_file_allocation/execute?input='+input, true);
    // xhr.send();
    input += ' 4';
    console.log(input);
    $.ajax({
        type: "POST",
        url: "/file_allocation/contiguous",
        data: {input : input},
        success: function(result){
            console.log(result);
            console.log(result[0]);
            // if((result.includes('File ') || result.includes('All') || result.includes('Not')) && result.length == 1){
            //     console.log("Inside");
            //     Materialize.toast(output, 1500);
            //     return;
            // }
            result = result.split('\n');
            result = result.slice(0, result.length-1);
            console.log(result);
            handle_output(result);
            window.scrollTo(0,document.body.scrollHeight);
        },
        async: false
    });
}
