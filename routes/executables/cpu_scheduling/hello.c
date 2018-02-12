#include<stdio.h>
#include "stdlib.h"
int main(int argc, char const *argv[])
{
	printf("%d\n",argc );
	printf("%d %d\n",atoi(argv[1]),atoi(argv[2]) );
	return 0;
}

