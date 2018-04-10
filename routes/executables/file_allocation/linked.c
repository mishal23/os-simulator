#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include<time.h>

struct file {
	int id;
	int size;
	int start;
	int length;
	char name[20];
	int present;
};

struct discblock {
	int fid;
	int next;
};

int main(int argc, char* argv[]) {
	//srand(time(0));

	int i, memory, block, n = 0, j;
	//printf("\nEnter total memory : ");
	//scanf("%d", &memory);
    memory = 1024;
	//printf("\nEnter block size : ");
	//scanf("%d", &block);
    block = 16;
	int nb = memory/block; // no of blocks
	//printf("\n%d", nb);

	struct discblock d[nb];
    struct file f[100];
    for(i = 0; i < nb; ++i){
        d[i].fid = -1;
        d[i].next = -1;
        //printf("%d|%d ", d[i].fid, d[i].next);
    }
    int k = 1;
    int c;
    do{
        //printf("\n1.Add 2.Remove 3.Search 4.Exit\nEnter your choice");
        //scanf("%d", &c);
        c = atoi(argv[k++]);
        //printf("\nChoice: %d", c);
        if(c == 1){
            //printf("\nEnter the file name, id and size : ");
            //scanf("%s", f[n].name);
            //scanf("%d", &f[n].id);
            //scanf("%d", &f[n].size);
            strcpy(f[n].name, argv[k++]);
            f[n].id = 1;
            f[n].size = atoi(argv[k++]);
            f[n].present = 1;
            f[n].length = f[n].size/block + (f[n].size%block != 0);

            //printf("\n%d %d %d %s", f[n].id, f[n].size, f[n].length, f[n].name);

            int free = 0;
            for(i = 0; i < nb; ++i)
            	if(d[i].fid == -1)
            		free++;
            //printf("\nfree: %d", free);
            if(free < f[n].length){
            	//printf("\nNot enough memory available");
            	continue;
            }
            //printf("\n %d", rand() % nb);
            int k = 0, prev;
            f[n].present = 1;
            for(i = 1; i <= f[n].length; ){
        	 	k = rand() % nb;
        	 	//printf("%d ", k);
        	 	
            	if(d[k].fid == -1){
            		d[k].fid = f[n].id;
            		           		
            		if(i != 1)
            			d[prev].next = k;
            		if(i == 1)
            			f[n].start = k;            		
            		// if(i == f[n].length)
            		// 	d[k].next = -1;
            		prev = k;
            		++i;

            	}
        	}
        	i = 1;
//	        printf("\nAllocated to : ");
//	        int cur = f[n].start;
//	        printf("%d ", cur);
//	        while(i < f[n].length){
//	        	cur = d[cur].next;
//	        	printf("%d ", cur);
//	        	i++;
//	        }
	        n++;
        }
        if(c == 2){
        	char del[20];
        	//printf("\nEnter name of file to be deleted : ");
        	//scanf("%s", del);
        	strcpy(del, argv[k++]);
        	for(i = 0; i < n; ++i)
        		if(strcmp(f[i].name, del) == 0)
        			break;
        	if(i == n) {
        		//printf("\nFile not found");
        		continue;
        	}
        	int cur = f[i].start;
        	f[i].present = 0;
        	//printf("\nCurrent : %d Length : %d\n", cur, f[i].length);
        	int p, j;
        	for(j = 1; j <= f[i].length; ++j){
        		p = cur;
        		d[p].fid = -1;
        		cur = d[p].next;
        		d[p].next = -1;
        	}
        			
        }
        //for(i = 0; i < nb; ++i)
    	  //  printf("%d|%d ", d[i].fid, d[i].next);
    

    }while(c != 4);    
    for(i = 0; i < n; ++i) {
        int cur = f[i].start;
        if(f[i].present){
            printf("%s %d", f[i].name, f[i].length);
            for(j = 1; j <= f[i].length; ++j){
                printf(" %d", cur);
                cur = d[cur].next;
            }
            printf("\n");
        }
    }
}