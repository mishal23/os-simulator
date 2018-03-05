$(document).ready(function() {
	var topic = "CPU Scheduling";
    $('#side_top_navbar').load('../base.html', function () {
    	$('.left').html(topic);
    })
});
var dummy='<input type="number" placeholder="Arrival Time"/><input type="number" placeholder="Burst Time"/>'
var n=0;
function SelectInput(value)
{
	if(value=="roundrobin")
		document.getElementById("wrapper").innerHTML+='<input type="number" placeholder="Time Quantum"/><br><br>';
	if(value=="priority")
		dummy+='<input type="number" placeholder="Priority"/>';
	if(value=="priorityaging")
		dummy+='<input type="number" placeholder="Priority"/>';
	dummy+="<br>"
	document.getElementById("wrapper").innerHTML+=dummy;
}
function AddInput()
{
	document.getElementById('wrapper').innerHTML += dummy;
	n++;
}
