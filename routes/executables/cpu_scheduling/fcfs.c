#include "stdio.h"
#include "string.h"
#include "stdlib.h"

void findWaitingTime(int a[],int n,int b[],int wt[])
{
	int i;
	wt[0]=0;
	for(i=1;i<n;i++)
	{
		wt[i]=b[i-1]+wt[i-1];
	}
}

void findTurnAroundTime(int a[],int n,int b[],int wt[],int tat[])
{
	int i;
	for(i=0;i<n;i++)
		tat[i]=b[i]+wt[i];
}

void findAvgTime(int a[],int n,int b[])
{
	int i;
	int wt[n],tat[n],total_wt=0,total_tat=0;

	findWaitingTime(a,n,b,wt);
	findTurnAroundTime(a,n,b,wt,tat);

	printf("ProcessID\tBurst Time\tWaiting Time\tTurn Around Time\n");
	for(i=0;i<n;i++)
	{
		total_wt+=wt[i];
		total_tat+=tat[i];

		printf("%d\t%d\t%d\t%d\t\n",a[i],b[i],wt[i],tat[i]);
	}
	printf("Average Waiting Time: %f\n",(float)total_wt/(float)n);
	printf("Average Turn Around Time: %f\n",(float)total_tat/(float)n );
}
int main(int argc, char const *argv[])
{
	int i;
	int n=atoi(argv[1]);
	int a[n],b[n];
	//int wt[n],tat[n],total_wt=0,total_tat=0;
	int k=0;
	for(i=0;i<argc-2;i+=2)
	{
		//printf("%d %d\n",atoi(argv[i+2]),atoi(argv[i+3]) );
		a[k]=atoi(argv[i+2]);
		b[k]=atoi(argv[i+3]);
		k++;
		//scanf("%d %d",&a[i],&b[i]);
	}
	findAvgTime(a,n,b);
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