/*
	FIFO Page Replacement Algorithm
*/
#include "stdio.h"
#include "stdlib.h"
#include "stdbool.h"

int pointer;
int faults ,hits;
void print(int frame_size,int frame[])
{
	int i;
	//printf("Printing the Frames: ");
	for(i=0;i<frame_size;i++)
	{
		if(frame[i]==-1)
			printf("- ");
		else
			printf("%d ",frame[i]);
	}

	printf("|\n");
}

int lru_predict(int reference_length, int references[], int page_no ,int frame_size,int frame[], int start)
{
	int pos = -1, farthest = start, i;
	for(i=0;i<frame_size;i++)
	{
		int j;
		for(j=start-1;j>=0;j--)
		{
			if(frame[i]==references[j])
			{
				if(j<farthest)
				{
					farthest=j;
					pos=i;
				}
				break;
			}
		}
		if(j==page_no)
			return i;
	}
	if(pos == -1)
		return 0;
	else
		return pos;
}

int optimal_predict(int reference_length, int references[], int page_no ,int frame_size,int frame[], int start)
{
	int pos = -1, farthest = start, i;
	for(i=0;i<frame_size;i++)
	{
		int j;
		for(j=start;j<reference_length;j++)
		{
			if(frame[i]==references[j])
			{
				if(j>farthest)
				{
					farthest=j;
					pos=i;
				}
				break;
			}
		}
		if(j==page_no)
			return i;
	}
	if(pos == -1)
		return 0;
	else
		return pos;
}

void optimal(int frame_size,int frame[], int reference, int current_position,int reference_length, int references[])
{
	int i;
	bool allocated=false;
	for(i=0;i<frame_size;i++)
	{
		
		if(frame[i]==reference)
		{
			printf("*Hit for %d | ", reference);
			hits++;
			allocated = true;
			break;
		}
		else if(frame[i]==-1)
		{
			frame[i] = reference;
			printf("*Fault for %d | ", reference);
			faults++;
			allocated = true;
			break;
		}
	}
	if(allocated==false)
	{
		int j = optimal_predict(reference_length,references,current_position,frame_size,frame,current_position+1);

		frame[j] = reference;
		printf("*Fault for %d | ", reference);
		faults++;	
	}
	print(frame_size, frame);
}

void lru(int frame_size,int frame[], int reference, int current_position,int reference_length, int references[])
{
	int i;
	bool allocated=false;
	for(i=0;i<frame_size;i++)
	{
		
		if(frame[i]==reference)
		{
			printf("*Hit for %d | ", reference);
			hits++;
			allocated = true;
			break;
		}
		else if(frame[i]==-1)
		{
			frame[i] = reference;
			printf("*Fault for %d | ", reference);
			faults++;
			allocated = true;
			break;
		}
	}
	if(allocated==false)
	{
		int j = lru_predict(reference_length,references,current_position,frame_size,frame,current_position+1);

		frame[j] = reference;
		printf("*Fault for %d | ", reference);
		faults++;	
	}
	print(frame_size, frame);
}

void fifo(int frame_size,int frame[], int reference)
{
	int i;
	bool alloted = false;
	for(i=0;i<frame_size;i++)
	{
		if(frame[i]==reference)
		{
			alloted = true;
			printf("*Hit for %d | ", reference);
			hits++;
			break;
		}
		else if(frame[i]==-1)
		{
			alloted = true;
			frame[i] = reference;
			printf("*Fault for %d | ", reference);
			faults++;
			break;
		}
	}
	if(alloted == false)
	{
		faults++;
		printf("*Fault for %d | ", reference);
		frame[pointer] = reference;
		pointer = (pointer+1)%frame_size;
	}
	print(frame_size, frame);
}

int main(int argc, char **argv)
{
	int frame_size,i,number_of_references;
	sscanf(argv[1], "%d", &frame_size);
	int frame[frame_size];
	for(i=0;i<frame_size;i++)
	{
		frame[i] = -1;
	}
	sscanf(argv[2], "%d", &number_of_references);
	//number_of_references=(int)(*argv[2])-48;	
	printf("%d\n",number_of_references );
	int reference[number_of_references];

	for(i=0;i<number_of_references;i++)
	{
		sscanf(argv[3+i], "%d", &reference[i]);
	}

	printf("\n\nLRU\n\n");
	for(i=0;i<number_of_references;i++)
	{
		lru(frame_size,frame,reference[i],i,number_of_references,reference);
	}
	printf("\n(Number of faults:%d(\n)Number of hits:%d\n)",faults,hits );

	for(i=0;i<frame_size;i++)
	{
		frame[i] = -1;
	}
	hits=0;
	faults=0;

	printf("\n\nFIFO\n\n");
	for(i=0;i<number_of_references;i++)
	{
		fifo(frame_size,frame,reference[i]);
	}
	printf("\n(Number of faults:%d(\n)Number of hits:%d\n)",faults,hits );
	hits=0;
	faults=0;


	for(i=0;i<frame_size;i++)
	{
		frame[i] = -1;
	}

	printf("\n\nOPTIMAL\n\n");
	for(i=0;i<number_of_references;i++)
	{
		optimal(frame_size,frame,reference[i],i,number_of_references,reference);
	}
	printf("\nNumber of faults: %d \nNumber of hits: %d\n",faults,hits );
}
