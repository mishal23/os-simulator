#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

// Usage ./lseek offset flag path


int main(int argc, char const *argv[])
{	int filedescriptor = open(argv[4],O_RDWR,S_IRWXU);
	int a;
	if(filedescriptor <0)
	perror("Error ");
	
	if(strcmp(argv[1],"./lseek")==0 && strcmp(argv[3],"SEEK_END")==0)
	{	a = lseek(filedescriptor,atoi(argv[2]),SEEK_END);
		if(a<0)
		perror("Error ");
		else
		printf("Position of file pointer set to: %d\n",a);
	}
	else if(strcmp(argv[1],"./lseek")==0 && strcmp(argv[3],"SEEK_CUR")==0)
	{
		a = lseek(filedescriptor,atoi(argv[2]),SEEK_CUR);
		if(a<0)
		perror("Error ");
		else
		printf("Position of file pointer set to: %d\n",a);
	}
	else if(strcmp(argv[1],"./lseek")==0 && strcmp(argv[3],"SEEK_SET")==0)
	{
		a = lseek(filedescriptor,atoi(argv[2]),SEEK_SET);
		if(a<0)
		perror("Error ");
		else
		printf("Position of file pointer set to: %d\n",a);
	}
}
