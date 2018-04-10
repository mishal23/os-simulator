$(document).ready(function() {
    var topic = "CPU Scheduling";
    $('#side_top_navbar').load('../base.html', function () {
        $('.left').html(topic);
    })

    particlesJS.load('particles-js', '../particles.json', function() {
        console.log('particles.json config loaded');
    });


});

var n_processes = 1;
//Function to select HTML Object by ID
function S(id){
    return document.getElementById(id)
}
function put_processes(){
    processes = S('processes');
    processes.innerHTML = "";
    for(var i=0;i<n_processes;i++){
        var p = '<div class="row"> <div class="input-field col s4"> <input class="validate" type="text" id="p_at'+i+'"/> <label for="head_pos">Arrival Time</label> </div> <div class="input-field col s4"> <input class="validate" type="text" id="p_bt'+i+'"/> <label for="head_pos">Burst Time</label> </div> <div class="input-field col s4"> <input class="validate" type="text" id="p_pt'+i+'"/> <label for="head_pos">Priority</label> </div> </div>';
        processes.innerHTML += p;
    }
}
//To add Process
function add_process(){
    n_processes = S('n_processes').innerHTML;
    S('n_processes').innerHTML = ++n_processes;
    put_processes();
}
function remove_process(){
    if(n_processes === 1)
        return;
    n_processes = S('n_processes').innerHTML;
    S('n_processes').innerHTML = --n_processes;
    put_processes();
}

function submit() {
//    var tq = $("#time_quantum").val();

    var tq = S('time_quantum').value;
    if(!tq || tq.length == 0){
        Materialize.toast("Please fill the input fields!!", 1500);
        return;
    }
    var t = parseInt(tq);
    console.log(t);
    if(t<=0)
    {
        Materialize.toast("Invalid input!!", 1500);
        return;
    }
    console.log("no of process : "+n_processes);
    var input = n_processes + ' ';
    var input_p = n_processes + ' ';
    var input_rr;
    var output =  [];
    var tt = [], wt = [];
    for(var i = 0, j = 0; i < 3*n_processes; i+=3, j++) {
        var at = S('p_at'+j).value,
            bt = S('p_bt'+j).value,
            pt = S('p_pt'+j).value;
        if((!at || !bt || !pt) || at.length==0 || bt.length==0 || pt.length==0){
            Materialize.toast("Please fill the input fields!!", 1500);
            return;
        }
        if(parseInt(at)<0 || parseInt(bt)<0 || parseInt(pt)<0)
        {
            Materialize.toast("Invalid input!!", 1500);
            return;
        }
        input += (j+1) + ' ' + at + ' ' + bt + ' ';
        input_p += (j+1) + ' ' + at + ' ' + bt + ' ' + pt + ' ';
    }
    input_rr = input + tq;
    input_q  = input_p +tq;
    console.log("mq"+input_q);
    console.log(input);

    $.ajax({
        type: "POST",
        url: "/cpu_scheduling/fcfs",
        data: {input : input},
        success: function(result){
            console.log(result);
            output[0] = result;
            result = result.split('\n');
            var len = result.length;
            tt[0] = result[len-1];
            wt[0] = result[len-2];
        },
        async: false
    });
    $.ajax({
        type: "POST",
        url: "/cpu_scheduling/sjf-nonpreemptive",
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
        url: "/cpu_scheduling/sjf-preemptive",
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
        url: "/cpu_scheduling/priority-nonpreemptive",
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
        url: "/cpu_scheduling/priority-preemptive",
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
        url: "/cpu_scheduling/priority-aging",
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

    $.ajax({
        type: "POST",
        url: "/cpu_scheduling/round_robin",
        data: {input : input_rr},
        success: function(result){
            console.log(result);

            output[6] = result;
            result = result.split('\n');
            var len = result.length;
            tt[6] = result[len-1];
            wt[6] = result[len-2];

        },
        async: false
    });

     $.ajax({
        type: "POST",
        url: "/cpu_scheduling/multilevel_queue",
        data: {input : input_q},
        success: function(result){
            console.log(result);

            output[7] = result;
            result = result.split('\n');
            var len = result.length;
            tt[7] = result[len-1];
            wt[7] = result[len-2];

        },
        async: false
    });
    print_table(output);
    draw_graph(tt, wt);

}

function to_float(output){
    for(var i=0;i<output.length;i++)
        output[i] = parseFloat(output[i]);
    return output;
}

function draw_graph(tt, wt) {
    var algo = ['FCFS','SJF Non-preemptive', 'SJF Preemptive', 'Priority Non-preemptive', 'Priority Preemptive', 'Priority Aging', 'Round Robin', 'Multilevel Queue'];
    tt = to_float(tt);
    wt = to_float(wt);
    console.log(tt);
    console.log(wt);
    $("body").append('<div class="container-fluid"><div class="row"><div class="col s12" id="chart-container"></div></div></div>');
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

function print_table(output) {
    console.log(output);
    var algo = ['FCFS','SJF Non-preemptive', 'SJF Preemptive', 'Priority Non-preemptive', 'Priority Preemptive', 'Priority Aging', 'Round Robin', 'Multilevel Queue'];
    $("body").append("<div class='container-fluid' id='output'></div>");
    var op = $('#output');

    for(var i = 0; i < output.length; ++i) {
        op.append("<div class='row'><div class='col s8'><div class='panel'><div class='panel-body'><h3>"+algo[i]+"</h3><table class='striped'><thead><tr><th>Process ID</th><th>Burst time</th><th>Arrival time</th><th>Waiting Time</th><th>Turn Around Time</th><th>Completion time</th></tr></thead><tbody class='table-body"+i+"'></tbody></table></div></div></div></div>");
        var cur = output[i].split('\n');
        console.log(cur);
        for(var j = 0; j < cur.length-2; ++j) {
            var row = cur[j].split('\t');
            console.log(row);
            $(".table-body"+i).append("<tr>" +
                "<td>" + row[0]+ "</td>" +
                "<td>" + row[1]+ "</td>" +
                "<td>" + row[2]+ "</td>" +
                "<td>" + row[3]+ "</td>" +
                "<td>" + row[4]+ "</td>" +
                "<td>" + row[5]+ "</td>" +
                "</tr>");
        }
    }
}

