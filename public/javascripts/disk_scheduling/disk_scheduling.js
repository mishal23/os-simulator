$(document).ready(function() {
	var topic="Disk Scheduling";

    $('#side_top_navbar').load('../base.html', function(){
    	$('.left').html(topic);
    });
    
     particlesJS.load('particles-js', '../particles.json', function() {
        console.log('particles.json config loaded');
    });


});


//Number of requests made
var n_req = 0;


function S(id){
    return document.getElementById(id)
}

function put_requests(){
    requests = S('requests');
    requests.innerHTML = "";
    for(var i=0;i<n_req;i++){
        var p = '<div class="row"><div class="input-field col s2"><input class="validate" type="text"id="r'+i+'"/><label for="head_pos">Enter request value</label></div></div>';
        requests.innerHTML += p;
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
    var csize = S('csize').value;
    let regex = new RegExp(/[^0-9]/, 'g');
    var cur = S('cur').value;
    var prev = S('prev').value;
    if(parseInt(cur) > parseInt(csize) || parseInt(prev) > parseInt(csize))
    {
        alert("Head position cannot be greater than size of cylinder.");
        return false;
    }
    if(cur.match(regex))
    {
        alert("Enter integer values only!");
        return false;
    }
    if(prev.match(regex))
    {
        alert("Enter integer values only!");
        return false;
    }
    if(csize.match(regex))
    {
        alert("Enter integer values only!");
        return false;
    }
    console.log("no of requests : "+n_req);
    var input = csize + ' ' + cur + ' ' + prev;
    var totseek = [];
    var dfcfs_seq;
    var sstf_seq;
    var look_seq;
    var scan_seq;
    var clook_seq;
    var cscan_seq;
    for(var j = 0; j < n_req; j++) {
        var r = S('r'+j).value;
        input += ' ' + r;
    }

    console.log(input);
    for(var i=0;i<n_req;i++)
    {
        if(S('r'+i).value.match(regex))
        {
            alert("Enter Integer Values only!");
            return false;
        }
    }
    $.ajax({
        type: "POST",
        url: "/disk_scheduling/dfcfs",
        data: {input : input},
        success: function(result){
        	result = result.split('\n');
        	dfcfs_seq = result[0];
        	totseek[0] = result[1];
            console.log(dfcfs_seq);
            console.log(totseek[0]);
            //console.log(typeof result);
        },
        async: false
    });
    $.ajax({
        type: "POST",
        url: "/disk_scheduling/sstf",
        data: {input : input},
        success: function(result){
            result = result.split('\n');
        	sstf_seq = result[0];
        	totseek[1] = result[1];
            console.log(sstf_seq);
            console.log(totseek[1]);
        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "/disk_scheduling/look",
        data: {input : input},
        success: function(result){
        	result = result.split('\n');
        	look_seq = result[0];
        	totseek[2] = result[1];
            console.log(look_seq);
            console.log(totseek[2]);
        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "/disk_scheduling/scan",
        data: {input : input},
        success: function(result){
            result = result.split('\n');
        	scan_seq = result[0];
        	totseek[3] = result[1];
            console.log(scan_seq);
            console.log(totseek[3]);

        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "/disk_scheduling/clook",
        data: {input : input},
        success: function(result){
            result = result.split('\n');
        	clook_seq = result[0];
        	totseek[4] = result[1];
            console.log(clook_seq);
            console.log(totseek[4]);
        },
        async: false
    });

    $.ajax({
        type: "POST",
        url: "/disk_scheduling/cscan",
        data: {input : input},
        success: function(result){
            result = result.split('\n');
        	cscan_seq = result[0];
        	totseek[5] = result[1];
            console.log(cscan_seq);
            console.log(totseek[5]);
        },
        async: false
    });



    draw_graph(totseek);
    summarise(dfcfs_seq,'FCFS','fcfs');
    summarise(sstf_seq,'SSTF','sstf');
    summarise(look_seq,'Look','look');
    summarise(scan_seq,'Scan','scan');
    summarise(clook_seq,'C-Look','clook');
    summarise(cscan_seq,'C-Scan','cscan');

}

function to_float(output){
    for(var i=0;i<output.length;i++)
        output[i] = parseFloat(output[i]);
    return output;
}

function to_int(output){
	output = output.split(' ');
	for(var i = 0;i<output.length-1;i++)
	{
		output[i] = parseInt(output[i]);
	}
	return output;
}

function draw_graph(totseek) {
    algo = ['FCFS','SSTF', 'Look', 'Scan', 'C-Look', 'C-Scan'];
    totseek = to_float(totseek);
    console.log(totseek);
    var z = '<div class="container"><div class="row"><div class="col s12" id="chart-container"></div></div></div>';
    S('charts').innerHTML="";
    S('charts').innerHTML += z;
    var chart = {
        type: 'bar'
    };
    var title = {
        text: 'Comparision of Disk Scheduling Algorithms'
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
        name: 'Total Seek Time',
        data: totseek
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



function summarise(seq,algo_name,id) {
    	S(id).innerHTML="";
    	seq = to_int(seq);
    	console.log(seq);
    	var algorithm_name = algo_name;
    	var order = seq;
    	var z = '<div class="container"><div class="row"><div class="col s12" id="' + algo_name + '"></div></div></div>';
    	S(id).innerHTML += z;
    	var chart = {
        	type: 'line'
    	};
    	var title = {
        	text: algorithm_name
    	};
    	var yAxis = {
    		title: {
    		text: 'Disk Requested'
    		}
    	};
    	/*var xAxis = {
        	min: 0,
        	title: {
            	text: 'Time',
            	align: 'right'
        	},
        	labels: {
            	overflow: 'justify'
        	}
    	};*/
		var tooltip = {
			 valuePrefix: 'Cylinder/'
		};
		var legend = {
			 layout: 'vertical',
			 align: 'right',
			 verticalAlign: 'middle',
			 borderWidth: 1,
			// x: -40,
			//  y: 100,
			 floating: true,

	    	 backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			// shadow: true
		};
    	var series= [{
        	name: algorithm_name,
        	data: order
    	}];

    	var json = {};
    	json.chart = chart;
    	json.title = title;
    	json.tooltip = tooltip;
    	//json.xAxis = xAxis;
    	json.yAxis = yAxis;
    	json.series = series;
    	//json.plotOptions = plotOptions;
    	json.legend = legend;
    	//json.credits = credits;
    	$('#'+id).highcharts(json);
}
