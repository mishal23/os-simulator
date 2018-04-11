$(document).ready(function() {

    particlesJS.load('particles-js', '../particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

	var topic = "Bankers";
    $('#side_top_navbar').load('../base.html' , function(){
    	$('.left').html(topic);
    });
    $('#b1').click(function(){
    	var np=$('#np').val();
    	var nr=$('#nr').val();
        document.getElementById("c2").innerHTML=""
    	var i=0;
    	var j=0;
    	$('#c2').append('<span style="font-size:18px;" class="text-center">Enter current allocation matrix</span><br><br>');
    	for(i=0;i<np;i+=1)
    	{
    		$('#c2').append('<div class="row">P'+i+'<div id="ap'+i+'"</div></div><br><br>');
    		for(j=0;j<nr;j+=1)
    		{
    			$('#ap'+i).append('<input required style="margin-right:5px;" placeholder="R'+j+'"class="col s2" id="ap'+i+'ar'+j+'"></input>');
    		}

            if(nr>3)
    		  $('#c2').append('<br><br>');
            else
               $('#c2').append(''); 
    	}
    	$('#2').fadeIn();
        $("b1").attr("disabled", "disabled");
        var nr=$('#nr').val();
        var i=0;
        for(i=0;i<nr;i+=1)
        {
            $('#ra_nr').append('<input required style="margin-right:5px;" placeholder="R'+i+'"class="col s2" id="ralloc'+i+'"></input>');
        }
        $('#ra_text').append('Enter resource request')
  	});
    $('#b2').click(function(){
    	var np=$('#np').val();
    	var nr=$('#nr').val();
    	var i=0;
    	var j=0;
        document.getElementById("c3").innerHTML=""
    	$('#c3').append('<span style="font-size:18px;" class="text-center">Enter maximum allocation matrix</span><br><br>');
    	for(i=0;i<np;i+=1)
    	{
    		$('#c3').append('<div class="row">P'+i+'<div id="mp'+i+'"</div></div><br><br>');
    		for(j=0;j<nr;j+=1)
    		{
    			$('#mp'+i).append('<input required style="margin-right:5px;" placeholder="R'+j+'"class="col s2" id="mp'+i+'mr'+j+'"></input>');
    		}
            if(nr>3)
              $('#c3').append('<br><br>');
            else
               $('#c3').append(''); 
    	}
    	$('#3').fadeIn();
        $("b2").attr("disabled", "disabled");
  	});
    $('#b3').click(function(){
    	var nr=$('#nr').val();
    	var i=0;
        document.getElementById("c4").innerHTML=""
    	$('#c4').append('<span style="font-size:18px;" class="text-center">Enter available resources of each type <span><br><br>');
    	for(i=0;i<nr;i+=1)
    	{
    		$('#c4').append('<input required style="margin-right:5px;" placeholder="R'+i+'"class="col s3" id="avail_r'+i+'"></input>');
    	}
    	$('#4').fadeIn();
    	$('#ss_action').fadeIn();
        $("b3").attr("disabled", "disabled");
  	});


    $('#ss_action').click(function(){
        var np=$('#np').val();
        var nr=$('#nr').val();
        document.getElementById("result").innerHTML="";
        document.getElementById("is").innerHTML="";
        document.getElementById("os").innerHTML="";
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
        var result;

        $.ajax({
            type: 'POST',
            data: {arguments},
            url: '/bankers/safe_sequence',                     
            success: function(data) {
                setTimeout(function() {
                  $('.spec').addClass('fa-spin');
               }, 4);         
                var out=[],result;
                $('#is').animate({opacity: 1}, 4);  
                console.log('success');
                $("#result").append(data);
                //$('.fa-cog').addClass('fa-spin');
                result=data
                for(j=0;j<np;j+=1)
                {
                    $('#is').append('<span class="anip" style="margin-right:10px;padding: 3px;border: solid 1px black;">P'+j+'</span>');
                }
           
                $('#is').animate({opacity: 0}, 4000);    
                j=0;
                i=0;
                if(result[0]=='S')
                {
                    for(j in result)
                        if(result[j]>='0' && result[j]<='9')
                        {
                            out[i]=result[j];
                            i+=1;
                        }

                    for(j=0;j<np;j+=1)
                    {
                        $('#os').append('<span class="anip" style="margin:10px;padding: 3px;border: solid 1px black;">P'+out[j]+'</span>');
                    }
                }
                else
                {
                     $('#os').append('<span>No safe sequence possible</span>')
                }
           
                $('#os').hide().delay(6000).fadeIn();    
               setTimeout(function() {
                  $('.spec').removeClass('fa-spin');
               }, 6000);                
            }
        });
    
    });


    $('#ra_action').click(function(){
        var np=$('#np').val();
        var nr=$('#nr').val();
        document.getElementById("result").innerHTML="";
        document.getElementById("is").innerHTML="";
        document.getElementById("os").innerHTML="";
        var i=0;
        var j=0;
        arguments=np+' '+nr+' ';

        arguments+=$('#rpn').val()+' ';

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
        for(j=0;j<nr;j+=1)
        {
            arguments+=$('#ralloc'+j).val()+' ';
        }
        $.ajax({
            type: 'POST',
            data: {arguments},
            url: '/bankers/resource_request',  
            success: function(data) {
                $("#ra_res").append(data.split(":")[0]);
                 setTimeout(function() {
                  $('.spec').addClass('fa-spin');
               }, 4);         
                var out=[],result;
                $('#is').animate({opacity: 1}, 4);  
                console.log('success');
                $("#result").append(data);
                //$('.fa-cog').addClass('fa-spin');
                result=data
                for(j=0;j<np;j+=1)
                {
                    $('#is').append('<span class="anip" style="margin-right:10px;padding: 3px;border: solid 1px black;">P'+j+'</span>');
                }
           
                $('#is').animate({opacity: 0}, 4000);    
                j=0;
                i=0;
                if(result.split(":")[1][0]=='S')
                {
                    for(j in result)
                        if(result[j]>='0' && result[j]<='9')
                        {
                            out[i]=result[j];
                            i+=1;
                        }

                    for(j=0;j<np;j+=1)
                    {
                        $('#os').append('<span class="anip" style="margin:10px;padding: 3px;border: solid 1px black;">P'+out[j]+'</span>');
                    }
                }
                else
                {
                     $('#os').append('<span>No safe sequence possible</span>')
                }
           
                $('#os').hide().delay(6000).fadeIn();    
               setTimeout(function() {
                  $('.spec').removeClass('fa-spin');
               }, 6000);                
            }
                            
        });
    
    });
});
