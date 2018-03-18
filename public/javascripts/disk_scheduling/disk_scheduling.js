$(document).ready(function() {
	var topic="Disk Scheduling";

    $('#side_top_navbar').load('../base.html', function(){
    	$('.left').html(topic);
    });
    
});


//Number of requests made
var n_req = 1;


function S(id){
    return document.getElementById(id)
}

function put_requests(){
    requests = S('requests');
    requests.innerHTML = "";
    for(var i=0;i<n_req;i++){
        var p = '<div class="text-center"> <div class="input-field col-sm-4"> <input class="validate" type="text" id="r'+i+'"/> <label for="head_pos">Track Request</label> </div><div>';
        processes.innerHTML += p;
    }
}
//To add request
function add_request(){
    n_req = S('n_req').innerHTML;
    S('n_req').innerHTML = ++n_req;
    put_requests();
}
function remove_request(){
    if(n_req === 1)
        return;
    n_req = S('n_req').innerHTML;
    S('n_req').innerHTML = --n_req;
    put_requests();
}

function submit() {
    var csize = $("#csize").value;
    var cur = $("#cur").value;
    var prev = $("#prev").value;
    console.log("no of process : "+n_processes);
    var input = csize + ' ' + cur + ' ' + prev;
    var input_p = n_processes + ' ';
    var input_rr;
    var output =  [];
    var totseek = [];
    for(var j = 0; j < n_req; j++) {
        var r = S('r'+j).value;
        input += ' ' + r;
    }

    console.log(input);

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/disk_scheduling/dfcfs",
        data: {input : input},
        success: function(result){
            console.log(result);
            console.log(typeof result);
            output[0] = result;
            result = result.split('\n');
            var len = result.length;
            tt[0] = result[len-1];
            wt[0] = result[len-2];
            console.log(result+" "+tt[0]);
        },
        async: false
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/disk_scheduling/sstf",
        data: {input : input},
        success: function(result){
            console.log(result);

            output[1] = result;
            result = result.split('\n');
            var len = result.length;
            tt[1] = result[len-1];
            wt[1] = result[len-2];

        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/disk_scheduling/look",
        data: {input : input},
        success: function(result){
            console.log(result);

            output[2] = result;
            result = result.split('\n');
            var len = result.length;
            tt[2] = result[len-1];
            wt[2] = result[len-2];

        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/disk_scheduling/scan",
        data: {input : input_p},
        success: function(result){
            console.log(result);

            output[3] = result;
            result = result.split('\n');
            var len = result.length;
            tt[3] = result[len-1];
            wt[3] = result[len-2];

        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/disk_scheduling/clook",
        data: {input : input_p},
        success: function(result){
            console.log(result);

            output[4] = result;
            result = result.split('\n');
            var len = result.length;
            tt[4] = result[len-1];
            wt[4] = result[len-2];

        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/disk_scheduling/cscan",
        data: {input : input_p},
        success: function(result){
            console.log(result);

            output[5] = result;
            result = result.split('\n');
            var len = result.length;
            tt[5] = result[len-1];
            wt[5] = result[len-2];

        },
        async: false
    });



    draw_graph(tt, wt);

}

function to_float(output){
    for(var i=0;i<output.length;i++)
        output[i] = parseFloat(output[i]);
    return output;
}

function draw_graph(tt, wt) {
    algo = ['FCFS','SJF Non-preemptive', 'SJF Preemptive', 'Priority Non-preemptive', 'Priority Preemptive', 'Priority Aging', 'Round Robin'];
    tt = to_float(tt);
    wt = to_float(wt);
    console.log(tt);
    console.log(wt);
    $("body").append('<div class="container-fluid"><div class="row"><div class="col-sm-12" id="chart-container"></div></div></div>');
    var chart = {
        type: 'bar'
    };
    var title = {
        text: 'Comparision of Process Scheduling Algorithms'
    };
    var xAxis = {
        categories: algo
    };
    var yAxis = {
        min: 0,
        title: {
            text: 'Time',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    };
    var series= [{
        name: 'Turn Around Time',
        data: tt
    }, {
        name: 'Waiting Time',
        data: wt
    }
    ];
    var plotOptions =  {
        series: {
            pointWidth: 10
        }
    };

    var json = {};
    json.chart = chart;
    json.title = title;
    //json.tooltip = tooltip;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.series = series;
    json.plotOptions = plotOptions;
    //json.legend = legend;
    //json.credits = credits;
    $('#chart-container').highcharts(json);
}
