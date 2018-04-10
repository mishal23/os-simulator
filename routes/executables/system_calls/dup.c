#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

// Usage ./dup path

int main(int argc, char const *argv[])
{

	if(strcmp(argv[1],"./dup")==0)
		{
			int filedescriptor = open(argv[2],O_RDWR,S_IRWXU);
			int newfd = dup(filedescriptor);
			if(filedescriptor<0 || newfd < 0)
				perror("Error");
			else
			{
				printf("For the path: %s\n",argv[1]);
				printf("Original file decriptor value: %d\nDuplicate file descriptor value: %d\n",filedescriptor,newfd);
			}
			
		}

}
