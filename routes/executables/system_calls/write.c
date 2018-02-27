#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

//Usage ./write pathname

int main(int argc, char const *argv[])
{
	char string[35];
	if(strcmp(argv[0],"./write")==0)
	{   int filedescriptor = open(argv[1],O_WRONLY | O_APPEND,S_IRWXU);
		printf("Enter the Data to write to the file: ");
		scanf("%[^\n]",string);
		int size_wrote = write(filedescriptor,string,strlen(string));
		write(filedescriptor,'\n',1);
		if(size_wrote<0)
			perror("error");
		else
			printf("\nContent :%s \nWritten to file %s\n",string,argv[1]);
	}
}
