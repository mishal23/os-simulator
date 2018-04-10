#include  <stdio.h>
#include  <sys/types.h>
#include<string.h>
#include<ctype.h>

//Usage ./fork numer_of_calls_to_fork
int main(int argc, char const *argv[])
{
	if(strcmp(argv[1],"./fork")==0)
	{
    int i,ct=1;
    int n = atoi(argv[2]);
    for(i=0;i<n;i++)
    {
    	ct *= 2;
    }
    printf("%d Created processes\n",ct);
    }
}
