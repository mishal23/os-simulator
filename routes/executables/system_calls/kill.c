#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <stdlib.h>

// Usage ./kill pid
int main(int argc, char const *argv[])
{
    int i;
    if(strcmp(argv[1],"./kill")==0)
    {
            kill(atoi(argv[2]),SIGKILL);   // close some tab        
    }
}
