#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define N 100

struct process
{
	int process_id;
	int arrival_time;
	int burst_time;
	int waiting_time;
	int turn_around_time;
	int remaining_time;
	int comp;
};

int queue[N];
int front = 0, rear = 0;
struct process proc[N];

void push(int process_id)
{
	queue[rear] = process_id;
	rear = (rear+1)%N;
}

int pop()
{
	if(front == rear)
		return -1;

	int return_position = queue[front];
	front = (front +1)%N;
	return return_position;
}

int main(int argc,char const*argv[])
{
	float wait_time_total = 0.0, tat = 0.0;
	int n=atoi(argv[1]);
	int k=0;
	for(int i=2; i<=argc-2; i+=3)
	{
		proc[k].process_id =atoi(argv[i]);
		proc[k].arrival_time=atoi(argv[i+1]);
		proc[k].burst_time=atoi(argv[i+2]);
		proc[k].remaining_time = proc[k].burst_time;
		k++;
	}
	int time_quantum=atoi(argv[3*n+1]);

	int time=0; 
	int processes_left=n;   
	int position=-1; 		
	int local_time=0; 

	for(int j=0; j<n; j++)
		if(proc[j].arrival_time == time)
			push(j);

	while(processes_left)
	{
		if(local_time == 0) 
		{
			if(position != -1)
				push(position);

			position = pop();
		}

		for(int i=0; i<n; i++)
		{
			if(proc[i].arrival_time > time)
				continue;
			if(i==position)
				continue;
			if(proc[i].remaining_time == 0)
				continue;

			proc[i].waiting_time++;
			proc[i].turn_around_time++;
		}

		if(position != -1)
		{
			proc[position].remaining_time--;
			proc[position].turn_around_time++;
			
			if(proc[position].remaining_time == 0)
			{
				processes_left--;
				local_time = -1;
				position = -1;
			}
		}
		else
			local_time = -1; 

		time++;
		local_time = (local_time +1)%time_quantum;
		for(int j=0; j<n; j++)
			if(proc[j].arrival_time == time)	
				push(j);
	}

	//printf("\n");
	for(int i=0; i<n; i++)
	{
		int completion_time = proc[i].turn_around_time + proc[i].arrival_time;
		printf("%d\t%d\t", proc[i].process_id, proc[i].burst_time);
		printf("%d\t%d\t%d\t%d\n", proc[i].arrival_time, proc[i].waiting_time, proc[i].turn_around_time,completion_time);

		tat += proc[i].turn_around_time;
		wait_time_total += proc[i].waiting_time;
	}

	tat = tat/(1.0*n);
	wait_time_total = wait_time_total/(1.0*n);

	printf("%f",wait_time_total);
	printf("\n%f", tat);
}
