#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
// Usage ./open path
int main(int argc, char const *argv[])
{
	if(strcmp(argv[1],"./open")==0)
		{
			int filedescriptor = open(argv[2],O_CREAT | O_RDWR,S_IRWXU);
			if(filedescriptor<0)
				perror("Error");
			else
				printf("File opened\n");
		}

}
