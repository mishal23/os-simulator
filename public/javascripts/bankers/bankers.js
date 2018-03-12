$(document).ready(function() {
	var topic = "Bankers";
    $('#side_top_navbar').load('../base.html' , function(){
    	$('.left').html(topic);
    });
    $('#b1').click(function(){
    	var np=$('#np').val();
    	var nr=$('#nr').val();
    	var i=0;
    	var j=0;
    	$('#c2').append('<span class="text-center">Enter current allocation matrix</span><br><br>');
    	for(i=0;i<np;i+=1)
    	{
    		$('#c2').append('<span id="ap'+i+'">P'+i+'</span>');
    		for(j=0;j<nr;j+=1)
    		{
    			$('#ap'+i).append('<input style="margin-right:5px;" placeholder="R'+j+'"class="col-md-3" id="ap'+i+'ar'+j+'"></input>');
    		}
    		$('#c2').append('<br><br>');
    	}
    	$('#2').fadeIn();
  	});
    $('#b2').click(function(){
    	var np=$('#np').val();
    	var nr=$('#nr').val();
    	var i=0;
    	var j=0;
    	$('#c3').append('<span class="text-center">Enter maximum allocation matrix</span><br><br>');
    	for(i=0;i<np;i+=1)
    	{
    		$('#c3').append('<span id="mp'+i+'">P'+i+'</span>');
    		for(j=0;j<nr;j+=1)
    		{
    			$('#mp'+i).append('<input style="margin-right:5px;" placeholder="R'+j+'"class="col-md-3" id="mp'+i+'mr'+j+'"></input>');
    		}
    		$('#c3').append('<br><br>');
    	}
    	$('#3').fadeIn();
  	});
    $('#b3').click(function(){
    	var nr=$('#nr').val();
    	var i=0;
    	$('#c4').append('<span class="text-center">Enter available resources of each type <span><br><br>');
    	for(i=0;i<nr;i+=1)
    	{
    		$('#c4').append('<input style="margin-right:5px;" placeholder="R'+i+'"class="col-md-3" id="avail_r'+i+'"></input>');
    	}
    	$('#4').fadeIn();
    	$('#action').fadeIn();
  	});


    $('#action').click(function(){
    	var np=$('#np').val();
    	var nr=$('#nr').val();
    	var i=0;
    	var j=0;
    	arguments=np+' '+nr+' ';
    	for(j=0;j<nr;j+=1)
		{
			arguments+=$('#avail_r'+j).val()+' ';
		}
    	for(i=0;i<np;i+=1)
    	{
    		for(j=0;j<nr;j+=1)
    		{
    			arguments+=document.getElementById('ap'+i.toString()+'ar'+j.toString()).value+' ';
    		}
    	}
    	for(i=0;i<np;i+=1)
    	{
    		for(j=0;j<nr;j+=1)
    		{
    			arguments+=document.getElementById('mp'+i.toString()+'mr'+j.toString()).value+' ';
    		}
    	}

		var req=[];
		//arguments=arguments.split(' ');
		for(var i=0;i<arguments.length-1;i+=1)
			req[i]=parseInt(arguments[i]);

		$.ajax({
			type: 'POST',
			data: {arguments},
            url: 'http://localhost:3000/bankers/safe_sequence',						
            success: function(data) {
                console.log('success');
                $("#result").append(data);
            }
        });
		for(j=0;j<np;j+=1)
		{
			$('#is').append('<span class="anip" style="margin-right:10px;padding: 3px;border: solid 1px black;">P'+j+'</span>');
		}
   
      	$('.fa-spin').show().delay(4000).fadeOut();
      	$('#cog1').hide().delay(5000).fadeIn();
      	$('#cog2').hide().delay(5000).fadeIn();
      	$('.anip').show().delay(4000).fadeOut();
    });
});