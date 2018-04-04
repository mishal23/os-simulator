#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>


int main() {
    int fd;
    int result;
    int len = 1024 * 1024;

    fd = open("hello",O_RDWR | O_CREAT | O_TRUNC, (mode_t) 0600);
    // stretch the file to the wanted length, writting something at the end is mandatory
    result = lseek(fd, len - 1, SEEK_SET);
    if(result == -1) { perror("lseek"); exit(1); }
    result = write(fd, "", 1);
    if(result == -1) { perror("write"); exit(1); }

    char*addr = mmap(0, len, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (addr==MAP_FAILED) { perror("mmap"); exit(1); }

    printf("mmap returned %p, which seems readable and writable\n",addr);
    result = munmap(addr, len);
    if (result == -1) { perror("munmap"); exit(1); }

    close(fd);
    return 0;
}
