#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <stdlib.h>
int main()
{
    int i;
    pid_t child = fork();
    printf("child=%d\n",child );

    int flag=0;
    for(i=0;i<1000;i++)
    {
        if(i==100)
            kill(6758,SIGKILL);   // close some tab
        printf("%d\n",i);
    }
}
