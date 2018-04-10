#include <stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>

//#define path1 "/home/mishal23/Desktop/test1.txt"
//#define path2 "/home/mishal23/Desktop/test2.txt"
//Format to execute is creat pathname
int main(int argc, char const *argv[])
{
	int filedescriptor1 = creat(argv[2],S_IRWXU);
	if(filedescriptor1<0)
		perror("Error Creating the file");
	else
		printf("File created\n");
}
