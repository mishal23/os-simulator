$(document).ready(function() {

	var topic = "Memory Management";
    $('#side_top_navbar').load('../base.html', function(){
    	$('.left').html(topic);
    });

});

//todo disable second submit button

var type = 0;           //0 -> first ; 1 -> best ; 2 -> Worst
var memSize = 0;
var partSizes = [];
var procSizes = [];
var input = "";

var parId = [];
var internalFrag = [];
var externalFrag = [];
var totalInternal;
var remainingMem;

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
    num_proc = S("num_proc").value;
    for(var i=1;i<=num_part;i++){
        var q = S('p' + i).value;
        partSizes.push(q);
    }

    var processSizes = S('mem_req_proc');
    processSizes.innerHTML = "";
    for(var i=1;i<=num_proc;i++){
        var r = '<div class="row text-center"><input class="validate animated fadeIn" type="text" placeholder="Enter size of Process '+i+'" id="pr'+i+'"/></div></br>';
        processSizes.innerHTML += r;
    }
}

function submit3(){

    //get process memory sizes
    //send everything to executable file
    //get the result
    var temp;
    for(var i=1;i<=num_proc;i++){
        var s = S('pr' + i).value;
        procSizes.push(s);
    }

    create_input();
    console.log(input);

    if(type == 0){

        //first Fit
        $.ajax({
            type: "POST",
            url: "/memory_management/mft_first_fit",
            data: {input : input},
            success: function(result){
                console.log(result);
                result = result.split(' ');

                var len = result.length;
                for(var i=0;i<len-2;++i){

                    if(i%3==0)
                        parId.push(result[i]);
                    else if((i-1)%3==0)
                        internalFrag.push(result[i]);
                    else
                        externalFrag.push(result[i]);
                }

                totalInternal = result[len-2];
                remainingMem = result[len-1];
            },
            async: false
        });
    }
    else if(type == 1){

        //bestt Fit
        $.ajax({
            type: "POST",
            url: "/memory_management/mft_best_fit",
            data: {input : input},
            success: function(result){
                console.log(result);
                result = result.split(' ');

                var len = result.length;
                for(var i=0;i<len-2;++i){

                    if(i%3==0)
                        parId.push(result[i]);
                    else if((i-1)%3==0)
                        internalFrag.push(result[i]);
                    else
                        externalFrag.push(result[i]);
                }

                totalInternal = result[len-2];
                remainingMem = result[len-1];

            },
            async: false
        });
    }
    else{

        //worst Fit
        $.ajax({
            type: "POST",
            url: "/memory_management/mft_worst_fit",
            data: {input : input},
            success: function(result){
                console.log(result);
                result = result.split(' ');

                var len = result.length;
                for(var i=0;i<len-2;++i){

                    if(i%3==0)
                        parId.push(result[i]);
                    else if((i-1)%3==0)
                        internalFrag.push(result[i]);
                    else
                        externalFrag.push(result[i]);
                }

                totalInternal = result[len-2];
                remainingMem = result[len-1];

            },
            async: false
        });
    }

    //For the table part
    table = S('table-test');
    var ch2;
    var ch1;
    var ch0;
    for(var i=0;i<num_proc;++i){

        if((externalFrag[i]) == -1)
        {
            ch = "YES";
            ch0 = parId[i];
            ch1 = internalFrag[i];
            ch2 = "-";
        }
        else if((externalFrag[i] == 0) && (parId[i] == -1)){

            ch = "NO";
            ch0 = "-";
            ch1 = "No Mem.";
            ch2 = "No Mem.";
        }
        else{
            ch = "NO";
            ch0 = "-";
            ch2 = externalFrag[i];
            ch1 = "-";
        }

        temp = '<tr><td>'+ (i+1) +'</td><td>'+ procSizes[i] +'</td><td>'+ ch +'</td><td>'+ ch0 +'</td><td>'+ ch1 +'</td><td>'+ ch2 +'</td></tr>';
        table.innerHTML += temp;
    }

    var pos;
    var diff;
    var scaledown = (500/memSize);
    //For the box part
    for(var i=0;i<num_part;++i){

        pos = find_partition(i);
        diff = partSizes[i] - procSizes[pos];
        var box = S('visual');
        //box.innerHTML = "";
        var tempbox1;
        var tempbox2 = '<div class="black-box" id="internalfragbox"></div>';
        var pos2 = pos +1;

        switch(i){

            case 0: tempbox1 = '<div class ="red-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 1: tempbox1 = '<div class ="green-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 2: tempbox1 = '<div class ="yellow-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 3: tempbox1 = '<div class ="blue-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 4: tempbox1 = '<div class ="violet-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 5: tempbox1 = '<div class ="orange-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 6: tempbox1 = '<div class ="grey-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 7: tempbox1 = '<div class ="brown-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
            case 8: tempbox1 = '<div class ="pink-box" id="b'+i+'">Process'+pos2+'</div>';
                    break;
        }

        box.innerHTML += tempbox1;
        console.log(procSizes[pos]*scaledown);
        $('#b' + i).css("width", procSizes[pos]*scaledown);
        box.innerHTML += tempbox2;
        $('#internalfragbox').css("width", diff*scaledown);
    }

    //add totalinternal
}

function find_partition(i){

    for(var j=0;j<num_proc;++j){

        if(parId[j] == (i+1))
            return j;
    }
}

function create_input(){

    //to create input to be sent to the executable file
    //input is of the form memSize numOfPart partSizes numOfProc procSizes
    input += memSize + ' ';

    input += num_part + ' ';
    for(var i=0;i<num_part;++i){

        input += partSizes[i] + ' ';
    }

    input += num_proc + ' ';
    for(var i=0;i<num_proc-1;++i){

        input += procSizes[i] + ' ';
    }
    input += procSizes[i];
}
