import type { LessonContent } from "@/lib/lessons";

export const linuxLessons: LessonContent[] = [
  {
    slug: "navigation",
    title: "Navigating the Filesystem",
    level: "Beginner",
    summary: "Move around directories and list files with pwd, ls, and cd.",
    explanation: [
      "Everything in Linux lives under a single tree that starts at the root, written as /. Your shell always has a 'current working directory' — the folder you are in right now.",
      "pwd prints that directory. ls lists what is inside it, and cd changes into another directory. Paths can be absolute (starting with /) or relative to where you currently are.",
      "Two special names are handy: . means 'the current directory' and .. means 'the parent directory'. ~ is shorthand for your home directory.",
    ],
    cheatsheet: [
      { cmd: "pwd", desc: "Print the current working directory" },
      { cmd: "ls -lah", desc: "List all files with sizes in human-readable form" },
      { cmd: "cd /var/log", desc: "Change to an absolute path" },
      { cmd: "cd ..", desc: "Go up one directory" },
      { cmd: "cd ~", desc: "Go to your home directory" },
      { cmd: "cd -", desc: "Jump back to the previous directory" },
    ],
    terminal: [
      { cmd: "pwd", output: "/home/dev" },
      {
        cmd: "ls -lah",
        output:
          "total 16K\ndrwxr-xr-x 4 dev dev 4.0K Jun 30 12:01 .\ndrwxr-xr-x 3 root root 4.0K Jun 01 09:10 ..\n-rw-r--r-- 1 dev dev  220 Jun 01 09:10 .bashrc\ndrwxr-xr-x 2 dev dev 4.0K Jun 30 12:01 projects",
      },
      { cmd: "cd projects", output: "", note: "No output means success." },
      { cmd: "pwd", output: "/home/dev/projects" },
    ],
    quiz: [
      {
        question: "Which command shows the directory you are currently in?",
        options: ["ls", "pwd", "cd", "whoami"],
        answer: 1,
        explanation: "pwd stands for 'print working directory'.",
      },
      {
        question: "What does `cd ..` do?",
        options: ["Goes home", "Lists files", "Moves up one directory", "Does nothing"],
        answer: 2,
      },
    ],
  },
  {
    slug: "files",
    title: "Working with Files",
    level: "Beginner",
    summary: "Create, copy, move, and delete files and directories safely.",
    explanation: [
      "touch creates an empty file (or updates a timestamp). mkdir makes directories — add -p to create nested paths in one go.",
      "cp copies, mv moves or renames, and rm deletes. Directories need the recursive flag -r for cp and rm.",
      "rm is permanent — there is no recycle bin. Be especially careful with rm -rf, and never run it on / or with unverified variables.",
    ],
    cheatsheet: [
      { cmd: "touch file.txt", desc: "Create an empty file" },
      { cmd: "mkdir -p a/b/c", desc: "Create nested directories" },
      { cmd: "cp -r src dst", desc: "Copy a directory recursively" },
      { cmd: "mv old.txt new.txt", desc: "Rename or move a file" },
      { cmd: "rm -r build", desc: "Delete a directory and its contents" },
      { cmd: "cat file.txt", desc: "Print a file's contents" },
    ],
    terminal: [
      { cmd: "mkdir -p demo/logs", output: "" },
      { cmd: "touch demo/app.txt", output: "" },
      { cmd: "ls -R demo", output: "demo:\napp.txt  logs\n\ndemo/logs:" },
      { cmd: "mv demo/app.txt demo/logs/app.log", output: "" },
      { cmd: "ls demo/logs", output: "app.log" },
    ],
    quiz: [
      {
        question: "Which flag lets mkdir create parent directories as needed?",
        options: ["-r", "-p", "-a", "-f"],
        answer: 1,
      },
      {
        question: "How do you delete a directory and everything inside it?",
        options: ["rm dir", "rm -r dir", "del dir", "drop dir"],
        answer: 1,
        explanation: "rm needs -r (recursive) to remove directories.",
      },
    ],
  },
  {
    slug: "permissions",
    title: "Permissions & Ownership",
    level: "Intermediate",
    summary: "Read rwx permissions and change them with chmod and chown.",
    explanation: [
      "Every file has permissions for three classes: the owner (user), the group, and others. Each class can read (r), write (w), and execute (x).",
      "In ls -l output, the first column looks like -rwxr-xr--: a type character followed by the three permission triples. They map to octal numbers where r=4, w=2, x=1.",
      "chmod changes permissions (e.g. 755 or u+x), while chown changes the owning user and group. Use the chmod Calculator tool to convert between octal and symbolic.",
    ],
    cheatsheet: [
      { cmd: "ls -l file", desc: "View permissions and ownership" },
      { cmd: "chmod 644 file", desc: "rw for owner, r for group/others" },
      { cmd: "chmod +x script.sh", desc: "Make a script executable" },
      { cmd: "chown user:group file", desc: "Change owner and group" },
      { cmd: "umask", desc: "Show default permission mask" },
    ],
    terminal: [
      { cmd: "ls -l deploy.sh", output: "-rw-r--r-- 1 dev dev 482 Jun 30 12:10 deploy.sh" },
      { cmd: "chmod +x deploy.sh", output: "" },
      { cmd: "ls -l deploy.sh", output: "-rwxr-xr-x 1 dev dev 482 Jun 30 12:10 deploy.sh" },
    ],
    quiz: [
      {
        question: "What octal value means read+write+execute for the owner only, nothing for others?",
        options: ["777", "700", "755", "644"],
        answer: 1,
        explanation: "7 = rwx for owner, 0 = nothing for group and others.",
      },
      {
        question: "Which permission character allows running a file as a program?",
        options: ["r", "w", "x", "s"],
        answer: 2,
      },
    ],
  },
  {
    slug: "processes",
    title: "Processes & Resources",
    level: "Intermediate",
    summary: "Inspect running processes and manage them with ps, top, and kill.",
    explanation: [
      "A process is a running program identified by a PID. ps lists processes, and top (or htop) shows them live with CPU and memory usage.",
      "Send signals to processes with kill. The default signal asks politely to stop (SIGTERM, 15); kill -9 forces termination (SIGKILL) and should be a last resort.",
      "Append & to run a command in the background, and use jobs, fg, and bg to manage backgrounded work in your current shell.",
    ],
    cheatsheet: [
      { cmd: "ps aux", desc: "List all processes with resource usage" },
      { cmd: "ps aux | grep nginx", desc: "Find a specific process" },
      { cmd: "top", desc: "Live view of processes (q to quit)" },
      { cmd: "kill 1234", desc: "Gracefully stop PID 1234" },
      { cmd: "kill -9 1234", desc: "Force kill PID 1234" },
      { cmd: "command &", desc: "Run a command in the background" },
    ],
    terminal: [
      {
        cmd: "ps aux | grep nginx",
        output:
          "root      812  0.0  0.1  55180  1820 ?  Ss  09:10  0:00 nginx: master process\nwww-data  813  0.0  0.2  55600  2940 ?  S   09:10  0:00 nginx: worker process",
      },
      { cmd: "kill 813", output: "", note: "Sends SIGTERM to the worker." },
    ],
    quiz: [
      {
        question: "Which signal does `kill -9` send?",
        options: ["SIGTERM", "SIGHUP", "SIGKILL", "SIGINT"],
        answer: 2,
        explanation: "-9 is SIGKILL, which cannot be caught or ignored.",
      },
      {
        question: "How do you run a command in the background?",
        options: ["Append &", "Prefix bg", "Append #", "Prefix run"],
        answer: 0,
      },
    ],
  },
  {
    slug: "text-processing",
    title: "Text Processing: grep, sed, awk",
    level: "Advanced",
    summary: "Search and transform text streams with the classic Unix trio.",
    explanation: [
      "grep filters lines that match a pattern. Combine it with pipes to drill into logs quickly, and use -i for case-insensitive and -r to search recursively.",
      "sed edits streams: the s/old/new/g form does find-and-replace. awk treats each line as fields split by whitespace, perfect for columnar data like ps or CSV output.",
      "These tools shine when chained together with | so the output of one becomes the input of the next.",
    ],
    cheatsheet: [
      { cmd: "grep -i error app.log", desc: "Case-insensitive search" },
      { cmd: "grep -rn TODO src/", desc: "Recursive search with line numbers" },
      { cmd: "sed 's/foo/bar/g' f", desc: "Replace all foo with bar" },
      { cmd: "awk '{print $1}' f", desc: "Print the first column" },
      { cmd: "awk -F, '{print $2}' f", desc: "Use comma as the field separator" },
      { cmd: "sort | uniq -c", desc: "Count unique lines" },
    ],
    terminal: [
      {
        cmd: "grep -i error app.log",
        output: "2026-06-30 12:01:09 ERROR connection refused\n2026-06-30 12:03:44 ERROR timeout after 30s",
      },
      {
        cmd: "awk '{print $4}' app.log | sort | uniq -c",
        output: "      2 ERROR\n     18 INFO\n      3 WARN",
      },
    ],
    quiz: [
      {
        question: "Which command replaces every 'foo' with 'bar' in a stream?",
        options: ["grep s/foo/bar/", "sed 's/foo/bar/g'", "awk foo bar", "cut foo bar"],
        answer: 1,
      },
      {
        question: "By default, awk splits each line into fields based on what?",
        options: ["Commas", "Tabs only", "Whitespace", "Semicolons"],
        answer: 2,
      },
    ],
  },
  {
    slug: "shell-scripting",
    title: "Shell Scripting Basics",
    level: "Advanced",
    summary: "Write reusable bash scripts with variables, conditionals, and loops.",
    explanation: [
      "A script starts with a shebang like #!/usr/bin/env bash and is run after chmod +x. Variables are assigned without spaces (NAME=value) and referenced with $NAME.",
      "Conditionals use if [ ... ]; then ... fi, and loops use for x in ...; do ... done. Always quote your variables (\"$VAR\") to avoid word-splitting surprises.",
      "Add set -euo pipefail near the top to make scripts fail fast on errors and undefined variables — a best practice for reliable automation.",
    ],
    cheatsheet: [
      { cmd: "#!/usr/bin/env bash", desc: "Shebang line" },
      { cmd: "set -euo pipefail", desc: "Safer script defaults" },
      { cmd: 'NAME="world"', desc: "Assign a variable (no spaces)" },
      { cmd: 'echo "Hello $NAME"', desc: "Use a variable" },
      { cmd: "for f in *.log; do …; done", desc: "Loop over files" },
      { cmd: 'if [ -f f ]; then …; fi', desc: "Run only if the file exists" },
    ],
    terminal: [
      {
        cmd: "cat greet.sh",
        output: '#!/usr/bin/env bash\nset -euo pipefail\nNAME="${1:-world}"\necho "Hello, $NAME!"',
      },
      { cmd: "chmod +x greet.sh", output: "" },
      { cmd: "./greet.sh DevOps", output: "Hello, DevOps!" },
    ],
    quiz: [
      {
        question: "What does `set -e` do in a bash script?",
        options: [
          "Enables echo",
          "Exits immediately if a command fails",
          "Encrypts the script",
          "Enables editing",
        ],
        answer: 1,
      },
      {
        question: "How do you reference a variable named NAME?",
        options: ["NAME", "$NAME", "&NAME", "@NAME"],
        answer: 1,
      },
    ],
  },
];
