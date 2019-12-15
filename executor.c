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
#include <time.h>

// TODO: Limit the CPU usage of the submit program.

// TODO: Modify the method to prevent the monitor program getting too high CPU
// usage. The method using currently is too rigid. It should adjust itself 
// according to the CPU usage at that moment, rather than set a fixed sleep().

// TIMELIMIT for sec
#define TIMELIMIT 10
// MEMORYLIMIT for kB
#define MEMORYLIMIT 1024 * 10

#define FINE 0
#define TLE 124
#define MLE 125
#define CE 126
#define RE 127
#define UNKNOWN 255

int status = FINE;

// set signal handler for alram()
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

// get memory usage VmData + VmStk from /proc/[pid]/status 
int getMemoryUsage(pid_t pid) {
	int fd, data = 0, stack = 0;
	char buf[4096], file[1024], *temp;
	sprintf(file, "/proc/%d/status", pid);
	if((fd = open(file, O_RDONLY)) == -1) {
		perror("status open");
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
	// ./executor [id for distinct submit] [language for submit code]
	if(argc != 3) {
		printf("wrong usage\n");
		exit(EXIT_FAILURE);
	}
	char id[1024], language[1024];
	strcpy(id, argv[1]);
	strcpy(language, argv[2]);
	
	// set signal action
	struct sigaction sigact;
	sigact.sa_flags = SA_NOCLDSTOP | SA_NOCLDWAIT;
	sigact.sa_handler = sigHandler;
	if(sigaction(SIGALRM, &sigact, NULL) == -1) {
		perror("sigact");
		exit(EXIT_FAILURE);
	}
	
	// fork process
	// parent for monitor, child for executing the submit program
	pid_t pid = fork();
	switch(pid) {
		case -1:
			perror("fork");
			exit(EXIT_FAILURE);
			
		case 0:
			//printf("child: %d\n", getpid());
			
			// redirect stdout, stderr, stdin
			;int fdOutput, fdInput;
			char outputFilePath[1024], inputFilePath[1024];
			sprintf(outputFilePath, "./%s/tempOutput.txt", id);
			sprintf(inputFilePath, "./%s/input.txt", id);
			if((fdOutput = open(outputFilePath, O_WRONLY | O_CREAT | O_TRUNC, 0644)) == -1) {
				perror("fdOutput open");
				exit(EXIT_FAILURE);
			}
			dup2(fdOutput, 1);
			dup2(fdOutput, 2);
			close(fdOutput);
			if((fdInput = open(inputFilePath, O_RDONLY)) == -1) {
				perror("fdInput open");
				exit(EXIT_FAILURE);
			}
			dup2(fdInput, 0);
			close(fdInput);
			
			// execute the submit program
			char programPath[1024];
			if(strcmp(language, "c") == 0) {
				sprintf(programPath, "./%s/a.out", id);
				execl(programPath, "a.out", NULL);
			}
			else if(strcmp(language, "c++") == 0) {
				sprintf(programPath, "./%s/a.out", id);
				execl(programPath, "a.out", NULL);
			}
			else if(strcmp(language, "python") == 0) {
				sprintf(programPath, "./%s/code.py", id);
				execlp("python3", "python3", programPath, NULL);
			}
			else {
				printf("language wrong\n");
				exit(EXIT_FAILURE);
			}
			perror("execl");
			break;
			
		default:
			//printf("parent: %d\n", getpid());
			
			;struct rusage resourceUsage;
			int wstatus;
			pid_t pid2;
			int usedMemory = 0;
			
			// set timespec for nanosleep in the while loop
			struct timespec req;
			req.tv_sec = 0;
			req.tv_nsec = 1000000;
			
			// set alarm for time limit
			alarm(TIMELIMIT);
			
			// keep tracking the memory usage of child process
			do {
				usedMemory = max(usedMemory, getMemoryUsage(pid));
				if(usedMemory > MEMORYLIMIT)
					status = MLE;
				if(status == TLE || status == MLE)
					kill(pid, SIGKILL);
				
				// sleep for a while to prevent CPU usage getting too high
				nanosleep(&req, NULL);
				
				pid2 = wait4(pid, &wstatus, WUNTRACED | WCONTINUED | WNOHANG, &resourceUsage);
			} while(pid2 == 0);
			
			// clean alarm
			alarm(0);
			
			switch(status) {
				case FINE:
					//printf("FINE\n");
					/*printf("sec: %ld\n", resourceUsage.ru_utime.tv_sec + resourceUsage.ru_stime.tv_sec);
					printf("usec: %ld\n", resourceUsage.ru_utime.tv_usec + resourceUsage.ru_stime.tv_usec);
					printf("memory: %d\n", usedMemory);*/
					
					// when the program is NOT terminated normally
					if(!WIFEXITED(wstatus)) {
						if(WIFSIGNALED(wstatus)) {
							printf("RE\n");
							if(WTERMSIG(wstatus) == SIGFPE)
								printf("Floating point exception\n");
							else if(WTERMSIG(wstatus) == SIGSEGV)
								printf("Segmentation fault\n");
							return RE;
						}
						else {
							printf("UNKNOWN\n");
							return UNKNOWN;
						}
					}
					
					// CE for python
					if(!strcmp(language, "python") && WEXITSTATUS(wstatus)) {
						printf("CE\n");
						return CE;
					}
					
					long int duration = 0;
					duration += (resourceUsage.ru_utime.tv_sec + resourceUsage.ru_stime.tv_sec) * 1000;
					duration += (resourceUsage.ru_utime.tv_usec + resourceUsage.ru_stime.tv_usec) / 1000;
					printf("\n");
					// if the dutation of program is too short (<1ms), set it 1 ms
					if(duration == 0)
						duration = 1;
					printf("duration: %ld ms\n", duration);
					printf("memory usage: %d kB\n", usedMemory);
					return FINE;
				
				case TLE:
					printf("TLE\n");
					printf("Timeout\n");
					return TLE;
				
				case MLE:
					printf("MLE\n");
					printf("Exceed memory limit\n");
					return MLE;
					
				default:
					printf("status wrong\n");
					exit(EXIT_FAILURE);
			}
	}
	
	return 0;
}