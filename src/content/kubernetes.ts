import type { LessonContent } from "@/lib/lessons";

export const kubernetesLessons: LessonContent[] = [
  {
    slug: "pods",
    title: "Pods: The Smallest Unit",
    level: "Beginner",
    summary: "Understand Pods and inspect them with kubectl.",
    explanation: [
      "A Pod is the smallest deployable unit in Kubernetes. It wraps one (or a few tightly-coupled) containers that share storage and a network address.",
      "You rarely create bare Pods directly in production — controllers like Deployments manage them for you — but understanding Pods is the foundation for everything else.",
      "kubectl get pods lists them; kubectl describe pod gives detailed events; kubectl logs streams a container's output.",
    ],
    cheatsheet: [
      { cmd: "kubectl get pods", desc: "List pods in the current namespace" },
      { cmd: "kubectl get pods -A", desc: "List pods in all namespaces" },
      { cmd: "kubectl describe pod <name>", desc: "Detailed status and events" },
      { cmd: "kubectl logs <pod>", desc: "View a pod's logs" },
      { cmd: "kubectl exec -it <pod> -- sh", desc: "Open a shell inside a pod" },
    ],
    terminal: [
      {
        cmd: "kubectl get pods",
        output:
          "NAME                     READY   STATUS    RESTARTS   AGE\napi-7d9f8c6b5-2xklm      1/1     Running   0          5m\napi-7d9f8c6b5-9qwzr      1/1     Running   0          5m",
      },
      {
        cmd: "kubectl logs api-7d9f8c6b5-2xklm",
        output: "listening on :80\nconnected to database\nready",
      },
    ],
    quiz: [
      {
        question: "What is the smallest deployable unit in Kubernetes?",
        options: ["Container", "Pod", "Node", "Service"],
        answer: 1,
      },
      {
        question: "Which command shows a pod's logs?",
        options: ["kubectl describe", "kubectl logs", "kubectl get", "kubectl top"],
        answer: 1,
      },
    ],
  },
  {
    slug: "deployments",
    title: "Deployments & Scaling",
    level: "Intermediate",
    summary: "Manage replica sets, rollouts, and scaling with Deployments.",
    explanation: [
      "A Deployment declares the desired state for a set of identical Pods: which image to run and how many replicas. Kubernetes continuously works to match reality to that desired state.",
      "Scaling is a one-liner: kubectl scale. Updating the image triggers a rolling update, replacing Pods gradually so there is no downtime. If something breaks, you can roll back.",
      "kubectl rollout status and kubectl rollout undo are your friends during and after a release.",
    ],
    cheatsheet: [
      { cmd: "kubectl get deployments", desc: "List deployments" },
      { cmd: "kubectl scale deploy/api --replicas=5", desc: "Scale to 5 pods" },
      { cmd: "kubectl set image deploy/api api=app:2.0", desc: "Trigger a rolling update" },
      { cmd: "kubectl rollout status deploy/api", desc: "Watch a rollout" },
      { cmd: "kubectl rollout undo deploy/api", desc: "Roll back to the previous version" },
    ],
    terminal: [
      {
        cmd: "kubectl scale deploy/api --replicas=4",
        output: "deployment.apps/api scaled",
      },
      {
        cmd: "kubectl rollout status deploy/api",
        output:
          'Waiting for deployment "api" rollout to finish: 2 of 4 updated...\ndeployment "api" successfully rolled out',
      },
    ],
    quiz: [
      {
        question: "What does a Deployment primarily manage?",
        options: ["Networking rules", "A desired number of identical Pods", "Persistent disks", "DNS records"],
        answer: 1,
      },
      {
        question: "Which command rolls back a bad release?",
        options: [
          "kubectl rollout undo",
          "kubectl delete deploy",
          "kubectl scale --replicas=0",
          "kubectl revert",
        ],
        answer: 0,
      },
    ],
  },
  {
    slug: "services",
    title: "Services & Networking",
    level: "Intermediate",
    summary: "Expose Pods with stable endpoints using Services.",
    explanation: [
      "Pods come and go, each with a new IP. A Service gives a stable name and IP that load-balances traffic across the Pods matching its label selector.",
      "ClusterIP (the default) is reachable only inside the cluster. NodePort opens a port on every node, and LoadBalancer provisions an external load balancer from your cloud provider.",
      "Within the cluster, you reach a Service by its DNS name: <service>.<namespace>.svc.cluster.local (often just <service> from the same namespace).",
    ],
    cheatsheet: [
      { cmd: "kubectl get svc", desc: "List services" },
      { cmd: "kubectl expose deploy/api --port=80", desc: "Create a Service for a Deployment" },
      { cmd: "kubectl port-forward svc/api 8080:80", desc: "Forward a service to localhost" },
      { cmd: "kubectl describe svc api", desc: "Inspect a service and its endpoints" },
    ],
    terminal: [
      {
        cmd: "kubectl get svc",
        output:
          "NAME   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE\napi    ClusterIP   10.96.142.31    <none>        80/TCP    2m",
      },
      {
        cmd: "kubectl port-forward svc/api 8080:80",
        output: "Forwarding from 127.0.0.1:8080 -> 80",
      },
    ],
    quiz: [
      {
        question: "Why do you need a Service in front of Pods?",
        options: [
          "Pods cannot run without one",
          "It provides a stable endpoint and load-balances across changing Pod IPs",
          "It stores data",
          "It builds images",
        ],
        answer: 1,
      },
      {
        question: "Which Service type is reachable only inside the cluster?",
        options: ["NodePort", "LoadBalancer", "ClusterIP", "ExternalName"],
        answer: 2,
      },
    ],
  },
  {
    slug: "config-secrets",
    title: "ConfigMaps & Secrets",
    level: "Intermediate",
    summary: "Externalize configuration and sensitive data from your images.",
    explanation: [
      "ConfigMaps hold non-sensitive configuration as key-value pairs. Secrets hold sensitive data; their values are Base64-encoded (not encrypted by default).",
      "Both can be injected into Pods as environment variables or mounted as files, which keeps configuration out of your container images.",
      "Use the Kubernetes Secret Encoder tool on this site to Base64-encode values for a Secret's data field.",
    ],
    cheatsheet: [
      { cmd: "kubectl create configmap app --from-literal=ENV=prod", desc: "Create a ConfigMap" },
      { cmd: "kubectl create secret generic db --from-literal=pass=s3cr3t", desc: "Create a Secret" },
      { cmd: "kubectl get configmaps", desc: "List ConfigMaps" },
      { cmd: "kubectl get secret db -o yaml", desc: "View a Secret (Base64-encoded)" },
    ],
    terminal: [
      {
        cmd: "kubectl create secret generic db --from-literal=password=s3cr3t",
        output: "secret/db created",
      },
      {
        cmd: "kubectl get secret db -o jsonpath='{.data.password}'",
        output: "czNjcjN0",
        note: "The value is Base64-encoded; decode it to read 's3cr3t'.",
      },
    ],
    quiz: [
      {
        question: "How are Secret values stored by default?",
        options: ["Encrypted with AES", "Base64-encoded (not encrypted)", "Plain text", "Hashed with SHA-256"],
        answer: 1,
        explanation: "Base64 is encoding, not encryption — enable encryption at rest for real protection.",
      },
      {
        question: "What should hold non-sensitive configuration?",
        options: ["Secret", "ConfigMap", "Pod spec only", "Service"],
        answer: 1,
      },
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting Workloads",
    level: "Advanced",
    summary: "Diagnose crashing pods and pending workloads systematically.",
    explanation: [
      "Start with kubectl get pods to see status. CrashLoopBackOff means the container keeps exiting; Pending usually means it cannot be scheduled (resources or node selectors).",
      "kubectl describe pod shows the Events section — the single most useful place to learn why something failed. kubectl logs (add --previous for a crashed container) shows application errors.",
      "For deeper inspection, exec into a running pod, or use kubectl get events --sort-by=.lastTimestamp to see what is happening cluster-wide.",
    ],
    cheatsheet: [
      { cmd: "kubectl get pods", desc: "Check status (CrashLoopBackOff, Pending)" },
      { cmd: "kubectl describe pod <name>", desc: "Read the Events section" },
      { cmd: "kubectl logs <pod> --previous", desc: "Logs from the last crashed container" },
      { cmd: "kubectl get events --sort-by=.lastTimestamp", desc: "Recent cluster events" },
      { cmd: "kubectl top pod", desc: "Live CPU/memory per pod" },
    ],
    terminal: [
      {
        cmd: "kubectl get pods",
        output:
          "NAME                  READY   STATUS             RESTARTS   AGE\napi-6c8d9-abcde       0/1     CrashLoopBackOff   4          2m",
      },
      {
        cmd: "kubectl logs api-6c8d9-abcde --previous",
        output: "Error: missing required env var DATABASE_URL\nexiting with code 1",
        note: "The fix: provide DATABASE_URL via a ConfigMap or Secret.",
      },
    ],
    quiz: [
      {
        question: "What does CrashLoopBackOff indicate?",
        options: [
          "The pod is healthy",
          "The container keeps starting and exiting",
          "The node is offline",
          "The image is downloading",
        ],
        answer: 1,
      },
      {
        question: "Which section of `kubectl describe pod` is most useful for diagnosing failures?",
        options: ["Labels", "Events", "Annotations", "Tolerations"],
        answer: 1,
      },
    ],
  },
  {
    slug: "namespaces",
    title: "Namespaces & Contexts",
    level: "Beginner",
    summary: "Organize resources with namespaces and switch between clusters.",
    explanation: [
      "Namespaces partition a cluster into virtual sub-clusters, so teams or environments can share one physical cluster without colliding. Most commands default to the 'default' namespace.",
      "Use -n <namespace> to target one, or -A / --all-namespaces to see everything. A context bundles a cluster, user, and namespace; kubectl config use-context switches between them.",
      "Setting a default namespace for your current context saves typing -n on every command.",
    ],
    cheatsheet: [
      { cmd: "kubectl get ns", desc: "List namespaces" },
      { cmd: "kubectl get pods -n kube-system", desc: "Target a namespace" },
      { cmd: "kubectl create namespace dev", desc: "Create a namespace" },
      { cmd: "kubectl config get-contexts", desc: "List available contexts" },
      { cmd: "kubectl config use-context prod", desc: "Switch clusters" },
      { cmd: "kubectl config set-context --current --namespace=dev", desc: "Set a default namespace" },
    ],
    terminal: [
      {
        cmd: "kubectl get ns",
        output:
          "NAME              STATUS   AGE\ndefault           Active   30d\nkube-system       Active   30d\ndev               Active   2d",
      },
      {
        cmd: "kubectl config use-context prod",
        output: 'Switched to context "prod".',
      },
    ],
    quiz: [
      {
        question: "What problem do namespaces solve?",
        options: [
          "They speed up pods",
          "They isolate and organize resources within one cluster",
          "They encrypt traffic",
          "They store secrets",
        ],
        answer: 1,
      },
      {
        question: "Which flag shows resources across every namespace?",
        options: ["-n all", "-A", "--global", "-x"],
        answer: 1,
      },
    ],
  },
  {
    slug: "probes",
    title: "Health Probes",
    level: "Advanced",
    summary: "Keep workloads healthy with liveness, readiness, and startup probes.",
    explanation: [
      "Kubernetes uses probes to know a container's health. A liveness probe restarts a container that has hung. A readiness probe controls whether a Pod receives traffic — failing it removes the Pod from Service endpoints without restarting it.",
      "A startup probe protects slow-starting apps by holding off the other probes until the app has booted.",
      "Probes can use HTTP GETs, TCP checks, or commands, with tunable timing like initialDelaySeconds and periodSeconds.",
    ],
    cheatsheet: [
      { cmd: "livenessProbe.httpGet", desc: "Restart if this endpoint fails" },
      { cmd: "readinessProbe.httpGet", desc: "Gate traffic on this endpoint" },
      { cmd: "startupProbe", desc: "Delay other probes until startup done" },
      { cmd: "initialDelaySeconds", desc: "Wait before the first check" },
      { cmd: "kubectl describe pod <name>", desc: "See probe failures in Events" },
    ],
    terminal: [
      {
        cmd: "kubectl get pod api-1",
        output:
          "NAME    READY   STATUS    RESTARTS   AGE\napi-1   0/1     Running   0          20s",
        note: "READY 0/1 means the readiness probe has not passed yet.",
      },
      {
        cmd: "kubectl describe pod api-1",
        output:
          "Events:\n  Warning  Unhealthy  5s  kubelet  Readiness probe failed: HTTP probe failed with statuscode: 503",
      },
    ],
    quiz: [
      {
        question: "What does a failing readiness probe do?",
        options: [
          "Restarts the container",
          "Removes the Pod from Service endpoints (stops traffic)",
          "Deletes the Pod",
          "Scales the Deployment",
        ],
        answer: 1,
      },
      {
        question: "Which probe is designed for slow-starting applications?",
        options: ["livenessProbe", "readinessProbe", "startupProbe", "healthProbe"],
        answer: 2,
      },
    ],
  },
];
