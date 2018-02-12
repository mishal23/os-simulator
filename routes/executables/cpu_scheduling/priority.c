#include "stdio.h"
#include "string.h"
#include "stdlib.h"



/*void findWaitingTime(struct Process proc[],int n,int wt[])
{
	int i;
	wt[0]=0;
	for(i=1;i<n;i++)
	{
		wt[i]=proc[i-1].bt+wt[i-1];
	}
}

void findTurnAroundTime(struct Process proc[],int n,int wt[],int tat[])
{
	int i;
	for(i=0;i<n;i++)
		tat[i]=proc[i].bt+wt[i];
}

void findAvgTime(struct Process proc[],int n)
{
	int i;
	int wt[n],tat[n],total_wt=0,total_tat=0;

	findWaitingTime(proc,n,wt);
	findTurnAroundTime(proc,n,wt,tat);

	printf("ProcessID\tBurst Time\tWaiting Time\tTurn Around Time\n");
	for(i=0;i<n;i++)
	{
		total_wt+=wt[i];
		total_tat+=tat[i];

		printf("%d\t%d\t%d\t%d\t\n",proc[i].pid,proc[i].bt,wt[i],tat[i]);
	}
	printf("Average Waiting Time: %f\n",(float)total_wt/(float)n);
	printf("Average Turn Around Time: %f\n",(float)total_tat/(float)n );
}*/
int main()
{
	int i,j;
	int n;
	scanf("%d",&n);
	struct process
	{
		int pid;
		int bt;
		int priority;
	}proc[n],temp;
	//Process proc[n];
	//int a[n],b[n];
	//int wt[n],tat[n],total_wt=0,total_tat=0;
	for(i=0;i<n;i++)
	{
		scanf("%d %d %d",&proc[i].pid,&proc[i].bt,&proc[i].priority);
	}

	for(i=0;i<n;i++)
	{
		for(j=0;j<n-1;j++)
		{
			if(proc[j].priority < proc[j+1].priority )
			{
				temp=proc[j+1];
				proc[j+1]=proc[j];
				proc[j]=temp;
			}
		}
	}

	int wt[n],tat[n],total_wt=0,total_tat=0;

	wt[0]=0;
	for(i=1;i<n;i++)
	{
		wt[i]=proc[i-1].bt+wt[i-1];
	}
	for(i=0;i<n;i++)
		tat[i]=proc[i].bt+wt[i];

	printf("ProcessID\tBurst Time\tWaiting Time\tTurn Around Time\n");
	for(i=0;i<n;i++)
	{
		total_wt+=wt[i];
		total_tat+=tat[i];

		printf("%d\t%d\t%d\t%d\t\n",proc[i].pid,proc[i].bt,wt[i],tat[i]);
	}
	printf("Average Waiting Time: %f\n",(float)total_wt/(float)n);
	printf("Average Turn Around Time: %f\n",(float)total_tat/(float)n );
	//findAvgTime(proc,n);
	/*wt[0]=0;
	for(i=1;i<n;i++)
	{
		wt[i]=b[i-1]+wt[i-1];
	}
	for(i=0;i<n;i++)
		tat[i]=b[i]+wt[i];

	printf("ProcessID\tBurst Time\tWaiting Time\tTurn Around Time\n");
	for(i=0;i<n;i++)
	{
		total_wt+=wt[i];
		total_tat+=tat[i];

		printf("%d\t%d\t%d\t%d\t\n",a[i],b[i],wt[i],tat[i]);
	}
	printf("Average Waiting Time: %f\n",(float)total_wt/(float)n);
	printf("Average Turn Around Time: %f\n",(float)total_tat/(float)n );*/
}