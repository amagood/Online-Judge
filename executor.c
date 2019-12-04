#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/time.h>
#include <sys/resource.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <string.h>

// TIMELIMIT for sec
#define TIMELIMIT 100
// MEMORYLIMIT for kB
#define MEMORYLIMIT 10000

#define FINE 0
#define TLE 1
#define MLE 2

int status = FINE;

void sigHandler(int signum) {
	switch(signum) {
		case SIGALRM:
			status = TLE;
			break;
			
		default:
			perror("signal");
			exit(EXIT_FAILURE);
	}
	
	return;
}

int max(int a, int b) {
	if(a > b)
		return a;
	else
		return b;
}

int getMemoryUsage(pid_t pid) {
	int fd, data = 0, stack = 0;
	char buf[4096], file[1024], *temp;
	sprintf(file, "/proc/%d/status", pid);
	if((fd = open(file, O_RDONLY)) == -1) {
		perror("open");
		return 0;
	}
	read(fd, buf, 4096);
	close(fd);
	temp = strstr(buf, "VmData:");
	if(!temp)
		return 0;
	sscanf(temp, "%*s %d", &data);
	temp = strstr(buf, "VmStk:");
	sscanf(temp, "%*s %d", &stack);
	return data + stack;
}

int main(int argc, char *argv[]) {
	struct sigaction sigact;
	sigact.sa_flags = SA_NOCLDSTOP | SA_NOCLDWAIT;
	sigact.sa_handler = sigHandler;
	if(sigaction(SIGALRM, &sigact, NULL) == -1) {
		perror("sigact");
		exit(EXIT_FAILURE);
	}
	
	pid_t pid = fork();
	switch(pid) {
		case -1:
			perror("fork");
			exit(EXIT_FAILURE);
			
		case 0:
			//printf("child: %d\n", getpid());
			
			// redirect stdout
			;int fdStdout;
			if((fdStdout = open("tempStdout.txt", O_RDWR | O_CREAT)) == -1) {
				perror("open");
				exit(EXIT_FAILURE);
			}
			dup2(fdStdout, 1);
			close(fdStdout);
			
			execl("./test", "test",  NULL);
			perror("execl");
			break;
			
		default:
			//printf("parent: %d\n", getpid());
			
			;struct rusage resourceUsage;
			int wstatus;
			pid_t pid2;
			int usedMemory = 0;

			alarm(TIMELIMIT);
			
			do {
				usedMemory = max(usedMemory, getMemoryUsage(pid));
				if(usedMemory > MEMORYLIMIT)
					status = MLE;
				if(status == TLE || status == MLE)
					kill(pid, SIGKILL);
				pid2 = wait4(pid, &wstatus, WUNTRACED | WCONTINUED | WNOHANG, &resourceUsage);
			} while(pid2 == 0);
			
			alarm(0);
			
			switch(status) {
				case FINE:
					/*printf("fine\n");
					printf("sec: %ld\n", resourceUsage.ru_utime.tv_sec + resourceUsage.ru_stime.tv_sec);
					printf("usec: %ld\n", resourceUsage.ru_utime.tv_usec + resourceUsage.ru_stime.tv_usec);
					printf("memory: %d\n", usedMemory);*/
					break;
				
				case TLE:
					//printf("TLE\n");
					break;
				
				case MLE:
					//printf("MLE\n");
					break;
					
				default:
					printf("status wrong");
					exit(EXIT_FAILURE);
			}
	}
	
	return 0;
}