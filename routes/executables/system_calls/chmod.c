#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <string.h>


// Usage chmod pathname
int main(int argc, char const *argv[])
{
	if(strcmp(argv[1],"./chmod")==0)
	{
		int chmod_permit = chmod(argv[2],S_IRWXG| S_IRWXU);
	if(chmod_permit<0)
		perror("error");
	else
		printf("RWX permission to group given\n");
	}
}
