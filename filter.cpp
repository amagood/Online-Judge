#ifndef _GNU_SOURCE
#define _GNU_SOURCE
#endif

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <linux/seccomp.h>
#include <linux/filter.h>
#include <linux/audit.h>
#include <sys/prctl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <string.h>
#include <dlfcn.h>

#define RULE_LEN 12

// trampoline for the real main()
static int (*main_orig)(int, char **, char **);

// fake main() that gets called by __libc_start_main()
int main_hook(int argc, char **argv, char **envp) {
	
	// the filter for seccomp(whitelist)
	struct sock_filter filter[] = {
		BPF_STMT(BPF_LD | BPF_W | BPF_ABS, 0),
		
		// sys_read
		BPF_JUMP(BPF_JMP | BPF_JEQ, 0, RULE_LEN - 3, 0),
		
		// sys_write
		BPF_JUMP(BPF_JMP | BPF_JEQ, 1, RULE_LEN - 4, 0),
		
		// sys_fstat
		BPF_JUMP(BPF_JMP | BPF_JEQ, 5, RULE_LEN - 5, 0),
		
		// sys_mmap
		BPF_JUMP(BPF_JMP | BPF_JEQ, 9, RULE_LEN - 6, 0),
		
		// sys_mprotect
		BPF_JUMP(BPF_JMP | BPF_JEQ, 10, RULE_LEN - 7, 0),
		
		// sys_munmap
		BPF_JUMP(BPF_JMP | BPF_JEQ, 11, RULE_LEN - 8, 0),
		
		// sys_brk
		BPF_JUMP(BPF_JMP | BPF_JEQ, 12, RULE_LEN - 9, 0),
		
		// sys_access
		BPF_JUMP(BPF_JMP | BPF_JEQ, 21, RULE_LEN - 10, 0),
		
		// sys_exit_group
		BPF_JUMP(BPF_JMP | BPF_JEQ, 231, RULE_LEN - 11, 0),
		
		BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_KILL),
		BPF_STMT(BPF_RET | BPF_K, SECCOMP_RET_ALLOW),
	};
	
	struct sock_fprog prog = {
		.len = (unsigned short) (sizeof(filter) / sizeof(filter[0])),
		.filter = filter,
	};
	
	if(prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0)) {
		perror("prctl");
		exit(EXIT_FAILURE);
	}
	
	if(prctl(PR_SET_SECCOMP, SECCOMP_MODE_FILTER, &prog)) {
		perror("prctl set filter");
		exit(EXIT_FAILURE);
	}
	printf("im here\n");
    int ret = main_orig(argc, argv, envp);
    return ret;
}

// Wrapper for __libc_start_main() that replaces the real main 
// function with our hooked version.

extern "C" int __libc_start_main(
    int (*main)(int, char **, char **),
    int argc,
    char **argv,
    int (*init)(int, char **, char **),
    void (*fini)(void),
    void (*rtld_fini)(void),
    void *stack_end)
{
    // save the real main function address
    main_orig = main;

    // find the real __libc_start_main()
    typeof(&__libc_start_main) orig = (typeof(&__libc_start_main)) dlsym(RTLD_NEXT, "__libc_start_main");

    // call it with our custom main function 
    return orig(main_hook, argc, argv, init, fini, rtld_fini, stack_end);
}