#include "stdio.h"
#include "stdlib.h"
#include "string.h"
#include "stdbool.h"
int main()
{
	int n,i;
	scanf("%d",&n);
	int a[n],b[n],qu;
	for(i=0;i<n;i++)
	{
		scanf("%d %d",&a[i],&b[i]);
	}
	scanf("%d",&qu);
	int wt[n],tat[n],total_wt=0,total_tat=0;

	int rem_b[n];
	for(i=0;i<n;i++)
	{
		rem_b[i]=b[i];
	}
	int t=0;
	while(1)
	{
		bool done=true;

		for(i=0;i<n;i++)
		{
			if(rem_b[i]>0)
			{
				done=false;
				if(rem_b[i]>qu)
				{
					t+=qu;
					rem_b[i]-=qu;
				}
				else
				{
					t+=rem_b[i];
					wt[i]=t-b[i];
					rem_b[i]=0;
				}
			}
		}
		if(done==true)
			break;
	}

	for(i=0;i<n;i++)
		tat[i]=b[i]+wt[i];

	printf("Process\tBurst Time\tWaiting Time\tTurn Around Time\n");
	for(i=0;i<n;i++)
	{
		total_wt+=wt[i];
		total_tat+=tat[i];
		printf("%d \t%d \t%d \t%d\n", a[i],b[i],wt[i],tat[i]);
	}

	printf("Average waiting time=%f\nAverage turn around time=%f\n",(float)total_wt/n, (float)total_tat/n);
}