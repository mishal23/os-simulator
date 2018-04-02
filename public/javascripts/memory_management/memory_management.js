$(document).ready(function() {

	var topic = "Memory Management";
    $('#side_top_navbar').load('../base.html', function(){
    	$('.left').html(topic);
    });

});

//todo disable second submit button

var type = 0;           //0 -> first ; 1 -> best ; 2 -> Worst
var memSize = 0;
var numOfPart = 1;      //by default one
var numOfProc = 0;
var partSizes = []
var procSizes = [];

function S(id){

    //to get element by id
    return document.getElementById(id)
}

function get_type(){

    //to get type of Fit
    if(S("first").checked){

        type = 0;
        S("worst").disabled = true;
        S("best").disabled = true;
    }

    else if(S("best").checked){

        type = 1;
        S("worst").disabled = true;
        S("first").disabled = true;
    }

    else if(S("worst").checked){

        type = 2;
        S("first").disabled = true;
        S("best").disabled = true;
    }
}

function submit1(){

    //On click of the first submit Button
    //get information from the get_type function
    //get values from the two text fields -> Memory size and number of Partitions
    //using the number of partitions we have to create appropriate number of text fields to enter partitons block_sizes
    memSize = S("mem_size").value;
    num_part = S("num_part").value;
    get_type();

    var partitionSizes = S('partition_sizes');
    partitionSizes.innerHTML = "";
    for(var i=1;i<=num_part;i++){
        var p = '<div class="row text-center"><input class="validate animated fadeIn" type="text" placeholder="Enter size of Partition '+i+'" id="p'+i+'"/></div></br>';
        partitionSizes.innerHTML += p;
    }
}

function submit2(){

    //on click of the second submit Button
    //get information from number of process and the partitions sizes
    //from the number of processes value create the appropriate number of text fields for entering memory required for each process
    num_proc = S('num_proc').value;
    for(var i=1;i<=num_part;i++){
        var p = S('p' + i).value;
        partSizes.append(p);
    }

    var procSizes = S('mem_req_proc');
    procSizes.innerHTML = "";
    for(var i=1;i<=num_proc;i++){
        var p = '<div class="row text-center"><input class="validate animated fadeIn" type="text" placeholder="Enter size of Process '+i+'" id="pr'+i+'"/></div></br>';
        partitionSizes.innerHTML += p;
    }
}

function submit3(){

    //get process memory sizes
    //send everything to executable file
    //get the result
    for(var i=1;i<=num_proc;i++){
        var p = S('pr' + i).value;
        procSizes.append(p);
    }


}
