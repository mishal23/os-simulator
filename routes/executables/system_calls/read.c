#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
// Usage ./read number_of_bytes path
int main(int argc, char const *argv[])
{
	char buf[100];
	if(strcmp(argv[1],"./read")==0)
		{
			int filedescriptor = open(argv[3],O_RDONLY,S_IRWXU);
			if(filedescriptor<0)
				perror("Error");
			int size_read = read(filedescriptor, buf, atoi(argv[2]));
			buf[size_read]='\0';
			if(size_read<0)
				perror("Error");
			else
				printf("String read:\n%s\n",buf);
		}


}
