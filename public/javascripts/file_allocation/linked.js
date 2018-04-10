$(document).ready(function() {
    // var topic = "File allocation - Indexed";
    // $('#side_top_navbar').load('../base.html', function () {
    //     $('.left').html(topic);
    // })

    particlesJS.load('particles-js', '../particles.json', function() {
        console.log('particles.json config loaded');
    });


});

var SIZE        = 64;
var BLOCK_WIDTH = 100.0/64.0;
var n_blocks    = 0;
var color       = ['red', 'deep-purple', 'light-blue', 'teal', 'yellow', 'deep-orange', 'blue-grey', 'pink', 'indigo', 'cyan', 'light-green', 'amber', 'brown', 'purple', 'blue', 'lime', 'orange', 'grey'];
//var file_n      = 0;
var file_names  = [];
var file_name = [];
var sizes = [];
var input = '';
var sum   = 0;
var k=0;
var block=0;

function put_file(name, fbs, n){
    var file_chip = '<div class="row" id="file-' + name + '"><div class="col chip ' + color[n] + '">' + name + '<i class="close material-icons" onclick="delete_file(\'' + name + '\')">close</i></div><div>';
    $('.file-chips').append(file_chip);
    for(var i=0; i<fbs.length; i++){
        $('#block-'+fbs[i]).attr('class', 'block '+color[n]);
        if(i==0) $('#file-'+name).append('<div class="col chip block-number ' + color[n] + '">' + fbs[i] + '</div>');
        else     $('#file-'+name).append('<div class="col chip block-number">' + fbs[i] + '</div>');
    }
}

// function to_int(output){
//     for(var i=0;i<output.length;i++)
//         output[i] = parseInt(output[i]);
//     return output.slice(0, output.length-1);
// }

function handle_output(output){
    put_blocks();
    //file_names = [];
    $('.file-chips').html('');
    for(var i=0; i<output.length; i++){
        o = output[i].split(' ');
        fname = o[0];
        size = parseInt(o[1]);
        fbs  = [];
        for(var j=0; j<size; j++)
            fbs.push(parseInt(o[j+2]));
        put_file(fname, fbs, i);
        //file_names.push(fname);
    }
}

function delete_file(name){
    input += ' 2 '+ name;
    send_request(input);
}

function add_file(){
    size  = $("#file-size").val();
    fname  = $("#file-name").val();
    sum= +sum + +size;
    k++;
    t=sum/16;
    if(sum%16!=0)
        t++;
    console.log(sum);

    // for(var i = 0; i < file_name.length; ++i)
    //     input += ' 1 ' + file_name[i] + ' ' + sizes[i];
    if(t>63){
        Materialize.toast("Memory not available", 2000);
        sum= +sum - +size;
    }
    else if(file_name.indexOf(fname) === -1) {
        input += ' 1 ' + fname + ' ' + parseInt(size);// + ' ' + '0';
        // file_n++;
        sizes.push(parseInt(size));
        file_name.push(fname);
        console.log(file_name);
        console.log(input);
        send_request(input);
    }
    else if(size<=0){
         Materialize.toast("Invalid input", 2000);
         sum= +sum - +size;
     }
    else{
        Materialize.toast("File name already exists", 2000);
         sum= +sum - +size;
    }
}

function send_request(input){

    input += ' 4';
    console.log(input);
    $.ajax({
        type: "POST",
        url: "/file_allocation/linked",
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

function put_blocks(){
    $('.blocks').html('');
    for(var i=0; i<64; i++){
        var block = '<div class="block" id="block-' + i + '"></div>';
        $('.blocks').append(block);
        $('#block-'+i).css('width', BLOCK_WIDTH+'%');
    }
}
