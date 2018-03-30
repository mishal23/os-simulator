#include <stdio.h>
#include <stdlib.h>
struct process
{
	int process_id;
	int arrival_time;
	int burst_time;
	int waiting_time;
	int turn_around_time;
};
int main(int argc, char const *argv[])
{
	int i;
	int n = atoi(argv[1]);
	
	struct process p[n];
	
	int  k = 0;
	for(i = 2; i <= argc-2; i += 3) {
		p[k].process_id = atoi(argv[i]);
		p[k].arrival_time = atoi(argv[i+1]);
		p[k].burst_time = atoi(argv[i+2]);
		k++;
	}
	int service_time[n];
	service_time[0]=0;
	p[0].waiting_time=0;	

	for(i=1;i<n;i++)
	{
		service_time[i]=service_time[i-1]+p[i-1].burst_time;
		p[i].waiting_time = service_time[i]-p[i].arrival_time;

		if(p[i].waiting_time<0)
			p[i].waiting_time=0;
	}

	for(i=0;i<n;i++)
	{
		p[i].turn_around_time = p[i].burst_time + p[i].waiting_time;
	}
	int total_waiting_time=0,total_turn_around_time=0;
	for(i=0;i<n;i++)
	{
		total_waiting_time+=p[i].waiting_time;
		total_turn_around_time+=p[i].turn_around_time;
		int completion_time=p[i].turn_around_time + p[i].arrival_time;
		printf("%d\t%d\t%d\t%d\t%d\t%d\n",p[i].process_id,p[i].burst_time, p[i].arrival_time, p[i].waiting_time,p[i].turn_around_time,completion_time);
	}
	printf("%f\n", (float)total_waiting_time/n);
	printf("%f",(float)total_turn_around_time/n);
}
