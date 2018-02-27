#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

// Usage ./link oldpath newpath
int main(int argc, char const *argv[])
{
	if(strcmp(argv[0],"./link")==0)
		{
			int linked = link(argv[1],argv[2]);
	 		if(linked!=0)
	 			perror("Error");
			else
	 			printf("Link created\n");
		}
	
}
