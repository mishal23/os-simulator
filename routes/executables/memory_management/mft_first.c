/*

Done By Nihal Haneef 16CO128

IO FORMAT


For example if the input values are this:

	memSize = 1000
	numPartitions = 5
	partitionSizes = {90,110,300,400,100}
	numProcesses = 6
    processSizes = {20,300,50,2,400,63}


Command is executed as:
./exe_file memSize numPartitions partitionSizes numProcesses processSizes

which in this case is,
./mftfirst 1000 5 90 110 300 400 100 6 20 300 50 2 400 63

Output:

    partitionID_internalFrag_externalFrag|.......|partitionID_internalFrag_externalFrag&totalInternalFrag|&remainingMem

*/

#include<stdio.h>
#include<stdlib.h>
#include<ctype.h>
#include<string.h>

struct partition{

	int size;
	int id;
	int allocated;
}temp;

void main(int argc , char **argv)
{
	struct partition par[100];
	int memSize,parNumber,i, flag = 0 ,proAllocated[100] , proParID[100];
	int minusOne, proNumber, memReq[100] , j , totalInternalFrag = 0 , internalFrag , externalFrag, totalAllocatedSize = 0, dealocID,tempSum = 0;

    minusOne = -1;

	memSize    = atoi(argv[1]);
	parNumber  = atoi(argv[2]);

    for(i=0;i<parNumber;++i)
	{
		par[i].size = atoi(argv[i+3]);
		par[i].allocated = 0;
		par[i].id = i+1;
		tempSum += par[i].size;
	}

	proNumber = atoi(argv[2+parNumber+1]);

	for(i=0;i<proNumber;i++)
	{

		flag = 0;
		proAllocated[i] = 0;
		proParID[i] = 0;
		memReq[i] = atoi(argv[3+parNumber+i+1]);

		for(j=0;j<parNumber;++j)
		{
			if((par[j].allocated == 0) && (memReq[i] <= par[j].size))
			{
                //allocated
				printf("%d",par[j].id);
				internalFrag = par[j].size - memReq[i];
				printf(" %d %d ",internalFrag,minusOne);
				totalInternalFrag += internalFrag;
				totalAllocatedSize += memReq[i];
				par[j].allocated = 1;
				proAllocated[i] = 1;
				proParID[i] = par[j].id;
				flag = 1;
				break;
			}
		}

		if(flag == 0)
		{
            //not alocated
			printf("%d %d %d " ,minusOne,minusOne,(memSize - totalInternalFrag - totalAllocatedSize));    //external fragmentation
		}
	}

	externalFrag = memSize - totalInternalFrag - totalAllocatedSize;

	printf("%d %d" , totalInternalFrag , externalFrag);
}
