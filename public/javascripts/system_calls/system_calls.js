/*function getPWD(output){
	var pwd = output.match(/<!.*?>/);
	if(!pwd)
		return ['', output];
	pwd = pwd[0];
	output = output.replace(pwd, '');
	pwd = pwd.replace('<!', '');
	pwd = pwd.replace('?>', '');
	return [pwd, output];
}

function getOutputFormated(output){
	if(output[0].includes('hrish:')){
		return output[0];
	}
	for(var i=0;i<output.length;i++){
		if(output[i].length>0){
			if(output[i].includes('<DIR>'))
				output[i] = '<div class="dir">' + output[i].replace('<DIR>', '') + '</div>';
			else
				output[i] = '<div class="file">' + output[i] + '</div>'
		}
	}
	return output.join('');	}
*/	
var wd = [''];

function shellexec(){
	var out = document.getElementById('out');
	var wdt = document.getElementById('wd');
	var command = document.getElementById('command').value;
	var temp = command;
	var argc=1;
	for(var i=0;i<command.length;i++){
	if(command[i]==' ')
		argc+=1;
	}
	//console.log(command + ' ' + argc);
	if(command.length<=0)
		return;
	input = './' + command;
	console.log(input);
	temp = temp.split(' ');
	temp = temp[0];
	/*var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState == XMLHttpRequest.DONE) {
	    	output = xhr.responseText;
	    	console.log(output);
	    	var pwd;
		   	[pwd, output] = getPWD(output);
		   	output = output.split('\n');
		   	output = getOutputFormated(output);
			out.innerHTML += '<div class="wd">' + wdt.innerHTML + "</div>" + " $ "+command.value+"<br>";
			  	out.innerHTML += output;
			 
			   	if(output.length>0) out.innerHTML += '<br>';
					if(command.value.includes('cd') && output.includes('No') == -1){
						if(command.value.includes('..'))
							wd.pop();
						else
							wd.push(pwd)
					}
					command.value = "";
					if(pwd.length) wdt.innerHTML = wd.join('/');
					if(wd.length==1) wdt.innerHTML = '/'
					window.scrollTo(0,document.body.scrollHeight);
			    }
			}
			xhr.open('GET', '/terminal/shellcommand?command='+command.value, true);
			xhr.send();
		}*/
	}
	function keypress(event) {
		if (event.keyCode == 13) {
			shellexec();
		}
	}
