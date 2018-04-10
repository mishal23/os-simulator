#include<stdio.h>
#include<stdlib.h>
struct process
{
        int at,bt,pri,id;
}X[1005];

int done[1005],id[1005],front[4],rear[4],Q[4][1000],Bt[1005],queued[1005],ct[1005],wt[1005],tat[1005];

int t;
int cnt;

void push(int ind,int p)
{
        queued[p]=1;
        Q[ind][rear[ind]]=p;
        rear[ind]++;
}

int pop(int ind)
{
        int x=Q[ind][front[ind]];
        front[ind]++;
        queued[x]=0;
        return x;
}

int get(int priority)
{
        if(priority==1)
        return 1;

        if(priority==2)
        return 2;

        return 3;
}

int ok(int ind)
{
        if(front[ind]<rear[ind])
        return 1;

        return 0;
}

int doround(int ind,int time)
{
        int p=pop(ind);
        if(Bt[p]<=t)
        {
                done[p]=1;
                ct[p]=time+Bt[p];
                cnt++;
                return Bt[p];
        }

        else
        {
                Bt[p]-=t;
                push(ind,p);
                return t;
        }
}


int main(int argc, char const *argv[])
{
        int N=atoi(argv[1]);

        int i,k=1;

        for (i=2;i<= argc-2; i += 4,k++)
        {
                X[k].id=atoi(argv[i]);
 		X[k].at=atoi(argv[i+1]);
		X[k].bt=atoi(argv[i+2]);
		X[k].pri=atoi(argv[i+3]);
                Bt[k]=X[k].bt;
        }

        for (i=1;i<=N;i++)
        id[i]=get(X[i].pri);
        t=atoi(argv[4*N+1]);
        int time=0;
        for (i=1;i<=N;i++)
        {
                if(X[i].at<=time)
                {
                        push(id[i],i);
                }
    }


        while(cnt<N)
        {
                int st=time;
                if(ok(1))
                {
                        int x=doround(1,time);
                        time+=x;

                        for (i=1;i<=N;i++)
                        {
                                if(!done[i] && queued[i]==0 && X[i].at<=time)
                                push(id[i],i);
                        }

                        continue;
                }

                if(ok(2))
                {
                        int x=doround(2,time);
                        time+=x;

                        for (i=1;i<=N;i++)
                        {
                                if(!done[i] && queued[i]==0 && X[i].at<=time)
                                push(id[i],i);
                        }

                        continue;
                }

                if(ok(3))
                {
                        int p=pop(3);
                        time+=Bt[p];
                        done[p]=1;
                        cnt++;
                        ct[p]=time;
                        for (i=1;i<=N;i++)
                        {
                                if(!done[i] && queued[i]==0 && X[i].at<=time)
                                push(id[i],i);
                        }

                        continue;
                }

                 time++;
                        for (i=1;i<=N;i++)
                        {
                                if(!done[i] && queued[i]==0 && X[i].at<=time)
 				      push(id[i],i);
                        }

                        continue;
        }
	
	float tats=0,wts=0;

        for (i=1;i<=N;i++)
        {
                tat[i]=ct[i]-X[i].at;
                wt[i]=tat[i]-X[i].bt;
        	tats+=tat[i];
		wts+=wt[i];
	}
        for (i=1;i<=N;i++)
        {
                printf("%d\t%d\t%d\t%d\t%d\t%d\n",X[i].id,X[i].bt,X[i].at,wt[i],tat[i],ct[i]);
        }
	tats=tats/N;
	wts=wts/N;
	
	printf("%f\n",wts);
	printf("%f",tats);
}
