#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <string.h>

int main(int argc, char const *argv[])
{
	if(strcmp(argv[1],"./getid")==0)
	{
		uid_t uid = getuid();
		uid_t euid = geteuid();
		if(uid==0 && euid==0)
			printf("You are a root user!\n");
		else
			printf("You aren't a root user!\nuid=%d euid=%d\n",uid,euid);

		gid_t gid = getgid();
		gid_t egid = getegid();
		printf("gid=%d egid=%d\n",gid,egid);

		pid_t pid = getpid();
		pid_t ppid = getppid();
		printf("\npid=%d ppid=%d\n",pid,ppid);
	}
}
