#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

//Usage ./write pathname text

int main(int argc, char const *argv[])
{
	int i;
	char string[35]="";
	if(strcmp(argv[1],"./write")==0)
	{   int filedescriptor = open(argv[2],O_WRONLY | O_APPEND,S_IRWXU);
		for(i=3;i<argc;i++)
		{ strcat(string,argv[i]);
		  strcat(string," ");
		}
		int size_wrote = write(filedescriptor,string,strlen(string));
		write(filedescriptor,'\n',1);
		if(size_wrote<0)
			perror("error");
		else
			printf("\nContent :%s \nWritten to file %s\n",string,argv[2]);
	}
}
