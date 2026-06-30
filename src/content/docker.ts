import type { LessonContent } from "@/lib/lessons";

export const dockerLessons: LessonContent[] = [
  {
    slug: "images-containers",
    title: "Images vs Containers",
    level: "Beginner",
    summary: "Understand the core Docker concepts and run your first container.",
    explanation: [
      "An image is a read-only template (your app plus its dependencies). A container is a running instance of an image — you can start many containers from one image.",
      "docker pull downloads an image from a registry like Docker Hub. docker run creates and starts a container from it. docker ps lists running containers.",
      "Containers are ephemeral: when one stops, changes inside it are lost unless you used a volume (covered later).",
    ],
    cheatsheet: [
      { cmd: "docker pull nginx", desc: "Download an image" },
      { cmd: "docker run -d -p 8080:80 nginx", desc: "Run detached, map a port" },
      { cmd: "docker ps", desc: "List running containers" },
      { cmd: "docker ps -a", desc: "List all containers, including stopped" },
      { cmd: "docker images", desc: "List local images" },
      { cmd: "docker stop <id>", desc: "Stop a running container" },
    ],
    terminal: [
      {
        cmd: "docker run -d -p 8080:80 nginx",
        output: "Unable to find image 'nginx:latest' locally\nlatest: Pulling from library/nginx\n9f3589a5f...: Pull complete\nStatus: Downloaded newer image for nginx:latest\n3f1d8a9b2c7e4d",
      },
      {
        cmd: "docker ps",
        output:
          "CONTAINER ID   IMAGE   COMMAND                  STATUS         PORTS                  NAMES\n3f1d8a9b2c7e   nginx   \"/docker-entrypoint.…\"   Up 3 seconds   0.0.0.0:8080->80/tcp   quirky_tesla",
      },
    ],
    quiz: [
      {
        question: "What is the relationship between an image and a container?",
        options: [
          "They are the same thing",
          "A container is a running instance of an image",
          "An image is a running container",
          "Containers contain images",
        ],
        answer: 1,
      },
      {
        question: "Which flag runs a container in the background?",
        options: ["-b", "-d", "-bg", "-x"],
        answer: 1,
        explanation: "-d means 'detached'.",
      },
    ],
  },
  {
    slug: "dockerfile",
    title: "Building Images with a Dockerfile",
    level: "Intermediate",
    summary: "Write a Dockerfile and build a custom image.",
    explanation: [
      "A Dockerfile is a recipe. FROM picks a base image, COPY adds your files, RUN executes build steps, and CMD sets the default command when the container starts.",
      "Each instruction creates a cached layer. Order matters: copy dependency manifests and install before copying the rest of the code so rebuilds stay fast.",
      "docker build -t name:tag . builds the image from the Dockerfile in the current directory.",
    ],
    cheatsheet: [
      { cmd: "FROM node:20-alpine", desc: "Choose a base image" },
      { cmd: "WORKDIR /app", desc: "Set the working directory" },
      { cmd: "COPY package*.json ./", desc: "Copy manifests first (cache)" },
      { cmd: "RUN npm ci", desc: "Install dependencies" },
      { cmd: "CMD [\"node\", \"server.js\"]", desc: "Default start command" },
      { cmd: "docker build -t app:1.0 .", desc: "Build and tag the image" },
    ],
    terminal: [
      {
        cmd: "cat Dockerfile",
        output:
          'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["node", "server.js"]',
      },
      {
        cmd: "docker build -t app:1.0 .",
        output:
          "[+] Building 12.4s (10/10) FINISHED\n => => naming to docker.io/library/app:1.0",
      },
    ],
    quiz: [
      {
        question: "Which instruction sets the command run when the container starts?",
        options: ["RUN", "CMD", "FROM", "COPY"],
        answer: 1,
      },
      {
        question: "Why copy package.json before the rest of the source?",
        options: [
          "It is required syntax",
          "To leverage layer caching for faster rebuilds",
          "It reduces image size to zero",
          "It is just convention with no effect",
        ],
        answer: 1,
      },
    ],
  },
  {
    slug: "volumes",
    title: "Volumes & Persistent Data",
    level: "Intermediate",
    summary: "Keep data alive beyond a container's lifecycle with volumes and mounts.",
    explanation: [
      "Containers are disposable, so anything written inside one disappears when it is removed. Volumes solve this by storing data outside the container's writable layer.",
      "Named volumes are managed by Docker (docker volume create data). Bind mounts map a host directory into the container, which is great for local development.",
      "Mount with -v: a named volume like -v data:/var/lib/postgresql/data, or a bind mount like -v $(pwd)/src:/app/src.",
    ],
    cheatsheet: [
      { cmd: "docker volume create data", desc: "Create a named volume" },
      { cmd: "docker volume ls", desc: "List volumes" },
      { cmd: "-v data:/var/lib/data", desc: "Mount a named volume" },
      { cmd: "-v $(pwd):/app", desc: "Bind mount the current directory" },
      { cmd: "docker volume rm data", desc: "Remove a volume" },
    ],
    terminal: [
      { cmd: "docker volume create pgdata", output: "pgdata" },
      {
        cmd: "docker run -d -v pgdata:/var/lib/postgresql/data postgres:16",
        output: "b7c9e1f2a3d4",
      },
      {
        cmd: "docker volume ls",
        output: "DRIVER    VOLUME NAME\nlocal     pgdata",
      },
    ],
    quiz: [
      {
        question: "Why do you need a volume for a database container?",
        options: [
          "To make it run faster",
          "To persist data after the container is removed",
          "Volumes are required for all containers",
          "To expose ports",
        ],
        answer: 1,
      },
      {
        question: "Which mounts the current host directory into /app?",
        options: ["-p $(pwd):/app", "-v $(pwd):/app", "-e $(pwd):/app", "--mount app"],
        answer: 1,
      },
    ],
  },
  {
    slug: "networking",
    title: "Container Networking",
    level: "Intermediate",
    summary: "Connect containers and expose ports to the host.",
    explanation: [
      "By default Docker creates a bridge network. Containers on the same user-defined network can reach each other by container name as a hostname.",
      "Publishing a port with -p host:container makes a container reachable from outside. Without it, the service is only available inside Docker's network.",
      "Create a network with docker network create and attach containers with --network for clean service-to-service communication.",
    ],
    cheatsheet: [
      { cmd: "docker network create app-net", desc: "Create a network" },
      { cmd: "docker network ls", desc: "List networks" },
      { cmd: "--network app-net", desc: "Attach a container to it" },
      { cmd: "-p 8080:80", desc: "Publish container port 80 as host 8080" },
      { cmd: "docker network inspect app-net", desc: "Inspect a network" },
    ],
    terminal: [
      { cmd: "docker network create app-net", output: "a1b2c3d4e5f6" },
      {
        cmd: "docker run -d --name db --network app-net postgres:16",
        output: "c4d5e6f7a8b9",
      },
      {
        cmd: "docker run -d --name api --network app-net app:1.0",
        output: "d5e6f7a8b9c0",
        note: "The api container can now reach the database at host 'db'.",
      },
    ],
    quiz: [
      {
        question: "How do containers on the same user-defined network reach each other?",
        options: ["By IP only", "By container name as hostname", "They cannot", "Via the host's DNS"],
        answer: 1,
      },
      {
        question: "What does -p 8080:80 do?",
        options: [
          "Maps host port 80 to container 8080",
          "Maps host port 8080 to container port 80",
          "Opens 8080 inside the container only",
          "Nothing useful",
        ],
        answer: 1,
      },
    ],
  },
  {
    slug: "compose",
    title: "Docker Compose",
    level: "Advanced",
    summary: "Define and run multi-container apps with a single YAML file.",
    explanation: [
      "Compose describes a whole stack in docker-compose.yml: each service is a container with its image, ports, environment, volumes, and dependencies.",
      "docker compose up starts everything; add -d to detach. docker compose down stops and removes the stack. Services automatically share a network and can talk by service name.",
      "Use the 'docker run to Compose' utility on this site to convert an existing docker run command into a Compose service quickly.",
    ],
    cheatsheet: [
      { cmd: "docker compose up -d", desc: "Start the stack in the background" },
      { cmd: "docker compose down", desc: "Stop and remove the stack" },
      { cmd: "docker compose ps", desc: "List the stack's containers" },
      { cmd: "docker compose logs -f", desc: "Follow logs from all services" },
      { cmd: "docker compose build", desc: "Build images defined in the file" },
    ],
    terminal: [
      {
        cmd: "cat docker-compose.yml",
        output:
          'services:\n  api:\n    build: .\n    ports:\n      - "8080:80"\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:',
      },
      {
        cmd: "docker compose up -d",
        output:
          "[+] Running 3/3\n ✔ Network app_default  Created\n ✔ Container app-db-1   Started\n ✔ Container app-api-1  Started",
      },
    ],
    quiz: [
      {
        question: "What command starts a Compose stack in the background?",
        options: ["docker compose start", "docker compose up -d", "docker run -d", "docker stack up"],
        answer: 1,
      },
      {
        question: "How do services in a Compose file address each other?",
        options: ["By random IPs", "By service name", "Only via localhost", "They cannot communicate"],
        answer: 1,
      },
    ],
  },
];
