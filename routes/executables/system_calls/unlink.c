#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

// Usage ./unlink path
int main(int argc, char const *argv[])
{
	if(strcmp(argv[1],"./unlink")==0)
		{
			int unlinked = unlink(argv[2]);
	 		if(unlinked!=0)
	 			perror("Error");
			else
	 			printf("Unlink successful\n");
		}
	
}
