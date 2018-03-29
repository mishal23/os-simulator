/*

Done By Mahir Jain 16CO123

IO FORMAT

   
For example if the input values are this:

	cylinder_size = 200
	current_head_position=50
	previous_head_position=90

	request_array = {95,180,34,11,119,123,64,62}



Command is executed as:
./exe_file cylinder_size current_head_position previous_head_position request_array

which in this case is,
./cscan 200 50 90 95 180 34 11 119 123 64 62
Output:
Sequence of movement is: 50 --> 95 --> 180 --> 34 --> 11 --> 119 --> 123 --> 64 --> 62 --> 
Total seek time = 472
Average Seek time = 59.000000

*/

#include<stdio.h>
#include<math.h>
#include<stdlib.h>
#include<string.h>

main(int argc, char **argv)
{
	int n,r,totseek=0,prev,cur,size,ct=0;
	int seq[10];
	n = argc-4;
	size = atoi(argv[1]);
	int i;
	for(i=4;i<argc;i++)
	seq[ct++] = atoi(argv[i]);
	
	cur = atoi(argv[2]);
	prev = atoi(argv[3]);
	
	//printf("Sequence of movement is: ");
	printf("%d ",cur);
	for(i=0;i<n;i++)
	printf("%d ",seq[i]);
	totseek = (cur>seq[0])?cur-seq[0]:seq[0]-cur;
	for(i=1;i<n;i++)
	{
		if(seq[i] >= seq[i-1])
		totseek += seq[i] - seq[i-1];
		else
		totseek += seq[i-1] - seq[i];
	}
	printf("\n%d\n%f\n",totseek,(float)totseek/n);
	
	
	
}

