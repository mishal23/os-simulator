/*

Done By Mohit Bhasi 16CO126

IO FORMAT

   
For example if the input values are this:

	number_of_processes=5
	number_of_resources=3
	request_process_number=1

    maximum_resources_needed = {{7, 5, 3},
			                     {3, 2, 2},
			                     {9, 0, 2},
			                     {2, 2, 2},
			                     {4, 3, 3}};
 
	avilable_resources = {3,3,2}

    current_resource_allocation = {{0, 1, 0},
			                      {2, 0, 0},
			                      {3, 0, 2},
			                      {2, 1, 1},
			                      {0, 0, 2}};

	Requesting resource array ={1,0,2}


Command is executed as:
./exe_file Number of processes Number of resources Request Process Number Available resource array Resource allocation matrix Maximum resource allocation matrix Request resource array

which in this case is,
./a.exe 5 3 1 3 3 2 0 1 0 2 0 0 3 0 2 2 1 1 0 0 2 7 5 3 3 2 2 9 0 2 2 2 2 4 3 3 1 0 2  

Output:
Resources were allocated
Safe sequence: 1 3 4 0 2

*/


#include <stdio.h>
#include <stdbool.h>
#include <string.h>

int number_of_resources,number_of_processes,request_process_number;;
void input(char **argv,int request[number_of_resources],int available_resources[number_of_resources],int current_resource_allocation[number_of_processes][number_of_resources],int maximum_resources_needed[number_of_processes][number_of_resources],int needed_resources[number_of_processes][number_of_resources])
{
	int i,j,k=1;
	for(i=0;i<number_of_resources;i+=1)
	{
		available_resources[i]=(int)(*argv[4+i])-48;
	}

	for(i=0;i<number_of_processes;i+=1)
	{
		for(j=0;j<number_of_resources;j+=1)
		{
			current_resource_allocation[i][j]=(int)(*argv[4+number_of_resources+number_of_resources*i+j])-48;
		}

	}
	for(i=0;i<number_of_processes;i+=1)
	{
		for(j=0;j<number_of_resources;j+=1)
		{
			maximum_resources_needed[i][j]=(int)(*argv[4+number_of_resources*number_of_processes+number_of_resources*(i+1)+j])-48;
		}
	}
	for(i=0;i<number_of_processes;i+=1)
	{
		for(j=0;j<number_of_resources;j+=1)
		{
			needed_resources[i][j]=maximum_resources_needed[i][j]-current_resource_allocation[i][j];
		}
	}
	for(i=0;i<number_of_resources;i+=1)
	{
		request[i]=(int)(*argv[4+number_of_resources+number_of_resources*number_of_processes*2+i])-48;
	}

}

void calculate_safety(int available_resources[],int current_resource_allocation[number_of_processes][number_of_resources],int maximum_resources_needed[number_of_processes][number_of_resources],int needed_resources[number_of_processes][number_of_resources])
{
	bool finished[number_of_processes],found=false;
	int safe_sequence[number_of_processes],work[number_of_processes],k,i,j,count=0;

	for(i=0;i<number_of_processes;i+=1)
	{
		finished[i]=false;
	}

	for(i=0;i<number_of_resources;i+=1)
	{
		work[i]=available_resources[i];
	}
	while(count<number_of_processes)
	{
		found=false;
		for(i=0;i<number_of_processes;i+=1)
		{
			if(finished[i]==false)
			{
				for(j=0;j<number_of_resources;j+=1)
				{
					if(needed_resources[i][j]>work[j])
					{
						break;
					}
				}
				if(j==number_of_resources)
				{
					for(k=0;k<number_of_resources;k+=1)
					{
						work[k]+=current_resource_allocation[i][k];
					}				
					safe_sequence[count++]=i;
					finished[i]=true;
					found=true;
				}

			}
		}

		if(found==false)
		{
			printf(":Unsafe sequence");
			return;
		}	
	}
	if(found==true)
	{
		printf(":S");
		for(i=0;i<number_of_processes;i+=1)
		{
			printf("%d ",safe_sequence[i]);
		}
	}
}
int allocate_resource(int available_resources[number_of_resources],int current_resource_allocation[number_of_processes][number_of_resources],int maximum_resources_needed[number_of_processes][number_of_resources],int needed_resources[number_of_processes][number_of_resources],int request_process_number,int request[])
{
	int i;
	for(i=0;i<number_of_resources;i++)
	{
		if(request[i]>needed_resources[request_process_number][i] || request[i]>available_resources[i])
		{
			printf("Enough resources not available");
			return 0;
		}
	}
	for(i=0;i<number_of_resources;i++)
	{
		available_resources[i]-=request[i];
		current_resource_allocation[request_process_number][i]+=request[i];
		needed_resources[request_process_number][i]-=request[i];
	}
	printf("Resources were allocated");
}


int main(int argc, char **argv)
{
	number_of_processes=(int)(*argv[1])-48;
	number_of_resources=(int)(*argv[2])-48;
	request_process_number=(int)(*argv[3])-48;
	int available_resources[number_of_resources];
	int maximum_resources_needed[number_of_processes][number_of_resources];
	int current_resource_allocation[number_of_processes][number_of_resources];
	int needed_resources[number_of_processes][number_of_resources];
	int request[number_of_resources];
	input(argv,request,available_resources,current_resource_allocation,maximum_resources_needed,needed_resources);
	allocate_resource(available_resources,current_resource_allocation,maximum_resources_needed,needed_resources,request_process_number,request);
	calculate_safety(available_resources,current_resource_allocation,maximum_resources_needed,needed_resources);
}
