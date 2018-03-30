/*
	Mehnaz Yunus, 22/02/18
*/	
#include <stdio.h>
#include <limits.h>
#include <stdlib.h>

struct process  {
	int id;
	int arrival;
	int burst;
	int comp;
	int turn;
	int rem;
	int wait;
	int priority;
};

int main(int argc, char const *argv[]) {

	int i;
	int n = atoi(argv[1]);
	
	struct process p[n];
	
	int  k = 0;
	for(i = 2; i <= argc-2; i += 4) {
		p[k].id = atoi(argv[i]);
		p[k].arrival = atoi(argv[i+1]);
		p[k].burst = atoi(argv[i+2]);
		p[k].priority = atoi(argv[i+3]);
		k++;
	}
	

	for(i = 0; i < n; ++i) 		
		p[i].rem = p[i].burst;
	

	int done = 0;
	int time = 0;
	int minp = INT_MAX;
	int cur = -1;
	int found = 0;
	while(done < n) {
		for(i = 0; i < n; ++i)
			if(p[i].rem && p[i].arrival <= time && i != cur)
				p[i].priority--;

		for(i = 0; i < n; ++i) {
			if(p[i].arrival <= time && p[i].rem && p[i].priority < minp) {
				minp = p[i].priority;
				cur = i;
				found = 1;
			}
		}
		//if(cur != -1)
		//	printf("\nTime : %d Current : %d", time, p[cur].id);
		if(!found) {
			time++;
			continue;
		}
		p[cur].rem--;
		if(p[cur].rem == 0) {
			p[cur].comp = time+1;
			p[cur].turn = p[cur].comp - p[cur].arrival;
			p[cur].wait = p[cur].turn - p[cur].burst;
			done++;
			minp = INT_MAX;
			found = 0;
		}
		time++;
	}
	int tturn = 0, twait = 0;
	
	for(i = 0; i < n; ++i) {
		tturn += p[i].turn;
		twait += p[i].wait;
		printf("%d\t%d\t%d\t%d\t%d\t%d\n", p[i].id, p[i].burst, p[i].arrival, p[i].wait, p[i].turn, p[i].comp);
	}
	printf("%.2f\n%.2f", (float)twait/n, (float)tturn/n);
	return 0;

}
