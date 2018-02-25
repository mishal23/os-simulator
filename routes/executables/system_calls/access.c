#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
// Usage ./access flag path
int main(int argc, char const *argv[])
{
	if(strcmp(argv[0],"./access")==0 && strcmp(argv[1],"F_OK")==0)
		{
			int existing = access(argv[2],F_OK);
	 		if(existing<0)
	 			perror("Error");
			else
	 			printf("File exists\n");
		}
	if(strcmp(argv[0],"./access")==0 && strcmp(argv[1],"R_OK")==0)
		{
			int existing = access(argv[2],R_OK);
	 		if(existing<0)
	 			perror("Error");
			else
	 			printf("File exists and read permission granted\n");
		}
	if(strcmp(argv[0],"./access")==0 && strcmp(argv[1],"W_OK")==0)
		{
			int existing = access(argv[2],W_OK);
	 		if(existing<0)
	 			perror("Error");
			else
	 			printf("File exists and write permission granted\n");
		}
	if(strcmp(argv[0],"./access")==0 && strcmp(argv[1],"X_OK")==0)
		{
			int existing = access(argv[2],X_OK);
	 		if(existing<0)
	 			perror("Error");
			else
	 			printf("File exists and execute permission granted\n");
		}

}
