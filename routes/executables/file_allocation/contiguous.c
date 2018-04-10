#include<stdio.h>
#include<string.h>
#include <stdlib.h>
#define N 10000
typedef struct{
    char *name;
    int size;
    int blockno;
}file;
int n=0;
file p[N];
int main(int argc, char **argv)
{
    int mem,block_size,i,j,k=1;
    //mem = atoi(argv[1]);
    //block_size = atoi(argv[2]);
    mem = 64;
    block_size = 1;
    int nb=mem/block_size;
    int allocated[nb];
    for(i=0;i<nb;i++)
        allocated[i]=0;
    char ch='y';
    int c;
    char *name;
    do{
        //printf("1. Add file\n2. Remove file\n3. Search\n4.Exit");
        c=atoi(argv[k]);
k++;
        if(c==1)
        {
            p[n].name = (argv[k++]);
            p[n].size = atoi(argv[k++]);
            p[n].blockno=-1;
            int nblocks=p[n].size/block_size;
            for(i=0;i<nb-nblocks;i++)
            {
                if(allocated[i]==0)
                {
                    for(j=i;j<i+nblocks;j++)
                        if(allocated[j]!=0)
                            break;
                    if(j==i+nblocks)
                    {
                        p[n].blockno=i;
                        for(j=i;j<i+nblocks;j++)
                            allocated[j]=1;
                        break;
                    }
                 }
             }
             n++;
         }
         if(c==2)
         {
            //printf("Enter filename to be removed:");
            name = (argv[k++]);
            for(i=0;i<n;i++)
                if(strcmp(p[i].name,name)==0)
                {
                    for(j=p[i].blockno;j<p[i].blockno+p[i].size;j++)
                            allocated[j]=0;
                    p[i].blockno=-1;
                }
	        }
         if(c==3)
         {
            //printf("Enter name of file to be searched:");
            name = (argv[k++]);
            for(i=0;i<n;i++)
                if(strcmp(p[i].name,name)==0)
                    break;
            if(p[i].blockno==-1)
                printf("No such process\n");
            else
            {
                printf("The file occupies following blocks\n");
                for(j=p[i].blockno;j<p[i].blockno+p[i].size;j++)
                    printf("%d\t",j);
                printf("\n");
            }
		//k+=2;
         }
         //printf("Process\tSize\tBlockNo\n");

         //printf("Do you want to continue?");
         //ch = atoi(argv[k++]);
	//k++;
     }//while(ch=='y'||ch=='Y');
     while(c != 4);
     for(i=0;i<n;i++)
      {
        if(p[i].blockno==-1);
        else{
         printf("%s\t%d\t",p[i].name,p[i].size);

             //printf("Not Allocated\n");
          printf("%d\n",p[i].blockno);}
      }
 }          
