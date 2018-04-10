#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

// Usage man systemcall

int main(int argc, char const *argv[])
{

	if(strcmp(argv[1],"./man")==0)
		{
			if(strcmp(argv[2],"access")==0)
			printf("Usage: access flag pathname\nFlags are: F_OK,R_OK,W_OK,X_OK\nUsed to check access permissions of the file.\n");
			if(strcmp(argv[2],"creat")==0)
			printf("Usage: creat pathname\nUsed to create files.\n");
			if(strcmp(argv[2],"dup")==0)
			printf("Usage: dup pathname\nUsed to create a duplicate file descriptor");
			if(strcmp(argv[2],"link")==0)
			printf("Usage: link old_pathname new_pathname\nUsed to create a link to an existing file.\n");
			if(strcmp(argv[2],"unlink")==0)
			printf("Usage: unlink pathname\nUsed to remove a file.\n");
			if(strcmp(argv[2],"lseek")==0)
			printf("Usage: lseek offset flag pathname\nFlags are: SEEK_END, SEEK_CUR, SEEK_SET.\nUsed to manipulate file pointer position.\n");
			if(strcmp(argv[2],"man")==0)
			printf("Usage: man systemcall\nUsed to read manual for systemcall.\n");
			if(strcmp(argv[2],"open")==0)
			printf("Usage:open pathname\nUsed to open a file.\n");
			if(strcmp(argv[2],"read")==0)
			printf("Usage: read no_of_bytes pathname\nUsed to read from a file.\n");
			if(strcmp(argv[2],"write")==0)
			printf("Usage: write pathname text_to_write\nUsed to write text to a file\n");
			if(strcmp(argv[2],"getid")==0)
			printf("Usage: getid\nUsed to obtain personal, group, process and parent process id.\n");
			if(strcmp(argv[2],"kill")==0)
			printf("Usage: kill pid\nUsed to send signal to a process.\n");
			if(strcmp(argv[2],"fork")==0)
			printf("Usage: fork no_of_calls\nUsed to create a child process.\n");
			
						
			
		}

}
