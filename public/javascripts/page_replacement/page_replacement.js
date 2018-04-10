$(document).ready(function() {
	var topic = "Page Replacement";
		particlesJS.load('particles-js', '../particles.json', function() {
  		console.log('callback - particles.js config loaded');
	});
    $('#side_top_navbar').load('../base.html', function () {
    	$('.left').html(topic);
    })
    $('#continue_button').click(function()
    {
    	$('#input').fadeIn();
    	document.getElementById("input_boxes").innerHTML="";
    	var n=$('#number_of_requests').val();
    	var i=0;
	    for(i=0;i<n;i+=1)
	    {
    		$('#input_boxes').append("<input style='width:5%;margin-right:10px' class='ref col s1'>");
	    }
    });

	$('#action').click(function()
	{
		inp="";
		inp+=$('#number_of_frames').val()+' '+$('#number_of_requests').val()+' ';
		inputs=document.getElementsByClassName("ref");
		for(var i in inputs)
		{
			if(inputs[i].value>='0' && inputs[i].value<='9')
				inp+=inputs[i].value+' '; 
		}
		 $.ajax({
	            type: 'POST',
	            data: {inp},
	            url: 'http://uos-simulator.herokuapp.com/page_replacement',                     
	            success: function(data) {
	            	document.getElementById("lru_table").innerHTML="<tr></tr>";
	            	document.getElementById("fifo_table").innerHTML="<tr></tr>";
	            	document.getElementById("optimal_table").innerHTML="<tr></tr>";
	            	document.getElementById("second_chance_table").innerHTML="<tr></tr>";
	            	document.getElementById("lru_hit").innerHTML="Hit Percentage : ";
	            	document.getElementById("fifo_hit").innerHTML="Hit Percentage : ";
	            	document.getElementById("optimal_hit").innerHTML="Hit Percentage : ";
	            	document.getElementById("second_chance_hit").innerHTML="Hit Percentage : ";
	            	lru=data.split("LRU")[1];
	            	lru=lru.split("FIFO")[0];
	            	fifo=data.split("SECOND CHANCE")[0];
	            	fifo=fifo.split("FIFO")[1];
	            	optimal=data.split("OPTIMAL")[1];
	            	optimal=optimal.split("SECOND CHANCE")[0];
	            	second_chance=data.split("SECOND CHANCE")[1];
	            	var regex = /\|(.*?)\|/g;
	            	var lru_vals=[];
					var lru_results=[];
	            	var fifo_vals=[];
					var fifo_results=[];
	            	var optimal_vals=[];
					var optimal_results=[];
	            	var sc_vals=[];
					var sc_results=[];

	            	do {
					    m = regex.exec(lru);
					    if (m) {
					        lru_vals.push(m[1]);
					    }
					} while (m);

	            	regex = /\*(.*?)\|/g;
	            	do {
					    m = regex.exec(lru);
					    if (m) {
					        lru_results.push(m[1]);
					    }
					} while (m);
	            	regex = /\|(.*?)\|/g;

	            	do {
					    m = regex.exec(second_chance);
					    if (m) {
					        sc_vals.push(m[1]);
					    }
					} while (m);

	            	regex = /\*(.*?)\|/g;
	            	do {
					    m = regex.exec(second_chance);
					    if (m) {
					        sc_results.push(m[1]);
					    }
					} while (m);

					regex = /\|(.*?)\|/g;
	            	do {
					    m = regex.exec(fifo);
					    if (m) {
					        fifo_vals.push(m[1]);
					    }
					} while (m);

	            	regex = /\*(.*?)\|/g;
	            	do {
					    m = regex.exec(fifo);
					    if (m) {
					        fifo_results.push(m[1]);
					    }
					} while (m);

					regex = /\|(.*?)\|/g;
	            	do {
					    m = regex.exec(optimal);
					    if (m) {
					        optimal_vals.push(m[1]);
					    }
					} while (m);

	            	regex = /\*(.*?)\|/g;
	            	do {
					    m = regex.exec(optimal);
					    if (m) {
					        optimal_results.push(m[1]);
					    }
					} while (m);


	            	var nr=$('#number_of_requests').val();
	            	var nf=$('#number_of_frames').val();

	            	optimal_hits = optimal.split("hits:")[1];
	            	optimal_hits=optimal_hits.match(/\d+/)[0]           	
	            	optimal_hits=parseInt(optimal_hits);
	            	lru_hits = lru.split("hits:")[1];
	            	lru_hits=lru_hits.split("\n")[0];
	            	lru_hits=parseInt(lru_hits);

	            	fifo_hits = fifo.split("hits:")[1];
	            	fifo_hits=fifo_hits.split("\n")[0];
	            	fifo_hits=parseInt(fifo_hits);

	            	sc_hits = second_chance.split("hits:")[1];
	            	sc_hits=sc_hits.split("\n")[0];
	            	sc_hits=parseInt(sc_hits);
	            	$('#lru_hit').append((lru_hits/nr)*100);
	            	$('#optimal_hit').append((optimal_hits/nr)*100);
	            	$('#fifo_hit').append((fifo_hits/nr)*100);
	            	$('#second_chance_hit').append((sc_hits/nr)*100);

	            	$('#lru_hit').append("%");
	            	$('#optimal_hit').append("%");
	            	$('#fifo_hit').append("%");
	            	$('#second_chance_hit').append("%");

	            	var i=0,j=0;
	            	$('#lru_table').append('<tr  style="font-size:25px;"  id="lruh"><td>Request Number</td></tr>');
	            	for(j=0;j<nf;j+=1)
	            		$('#lruh').append('<td>Frame'+j+'</td>');
	            	$('#lruh').append('<td>Hit/Miss</td>');
            		for(j=0;j<nr;j+=1)
            		{
	            		$('#lru_table').append('<tr id="lru'+j+'"><td>Request'+j+'</td></tr>');
	            		for(i in lru_vals[j].split(' '))
	            		{
	            			if(lru_vals[j].split(' ')[i].length>=1)
	            				$('#lru'+j).append('<td>'+lru_vals[j].split(' ')[i]+'</td>')
	            		}
	            		if(lru_results[j][0]=='F')
	            			$('#lru'+j).append('<td style="background-color:red">'+lru_results[j]+'</td>')
	            		if(lru_results[j][0]=='H')
	            			$('#lru'+j).append('<td style="background-color:green">'+lru_results[j]+'</td>')
	            	}

	            	$('#fifo_table').append('<tr  style="font-size:25px;"  id="fifoh"><td>Request Number</td></tr>');
	            	for(j=0;j<nf;j+=1)
	            		$('#fifoh').append('<td>Frame'+j+'</td>');
	            	$('#fifoh').append('<td>Hit/Miss</td>');
            		for(j=0;j<nr;j+=1)
            		{
	            		$('#fifo_table').append('<tr id="fifo'+j+'"><td>Request'+j+'</td></tr>');
	            		for(i in fifo_vals[j].split(' '))
	            		{
	            			if(fifo_vals[j].split(' ')[i].length>=1)
	            				$('#fifo'+j).append('<td>'+fifo_vals[j].split(' ')[i]+'</td>')
	            		}
	            		if(fifo_results[j][0]=='F')
	            			$('#fifo'+j).append('<td style="background-color:red">'+fifo_results[j]+'</td>')
	            		if(fifo_results[j][0]=='H')
	            			$('#fifo'+j).append('<td style="background-color:green">'+fifo_results[j]+'</td>')
	            	}

	            	$('#second_chance_table').append('<tr  style="font-size:25px;"  id="sch"><td>Request Number</td></tr>');
	            	for(j=0;j<nf;j+=1)
	            		$('#sch').append('<td>Frame'+j+'</td>');
	            	$('#sch').append('<td>Hit/Miss</td>');
            		for(j=0;j<nr;j+=1)
            		{
	            		$('#second_chance_table').append('<tr id="sc'+j+'"><td>Request'+j+'</td></tr>');
	            		for(i in sc_vals[j].split(' '))
	            		{
	            			if(sc_vals[j].split(' ')[i].length>=1)
	            				$('#sc'+j).append('<td>'+sc_vals[j].split(' ')[i]+'</td>')
	            		}
	            		if(sc_results[j][0]=='F')
	            			$('#sc'+j).append('<td style="background-color:red">'+sc_results[j]+'</td>')
	            		if(sc_results[j][0]=='H')
	            			$('#sc'+j).append('<td style="background-color:green">'+sc_results[j]+'</td>')
	            	}


	            	$('#optimal_table').append('<tr  style="font-size:25px;"  id="optimalh"><td>Request Number</td></tr>');
	            	for(j=0;j<nf;j+=1)
	            		$('#optimalh').append('<td>Frame'+j+'</td>');
	            	$('#optimalh').append('<td>Hit/Miss</td>');
            		for(j=0;j<nr;j+=1)
            		{
	            		$('#optimal_table').append('<tr id="optimal'+j+'"><td>Request'+j+'</td></tr>');
	            		for(i in optimal_vals[j].split(' '))
	            		{
	            			if(optimal_vals[j].split(' ')[i].length>=1)
	            				$('#optimal'+j).append('<td>'+optimal_vals[j].split(' ')[i]+'</td>')
	            		}
	            		if(optimal_results[j][0]=='F')
	            			$('#optimal'+j).append('<td style="background-color:red">'+optimal_results[j]+'</td>')
	            		if(optimal_results[j][0]=='H')
	            			$('#optimal'+j).append('<td style="background-color:green">'+optimal_results[j]+'</td>')
	            	}
	            	$("#result").fadeIn();

	            }
	        });
	});



});

