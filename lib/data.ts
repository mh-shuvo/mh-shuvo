export const skills = {
  Backend: [
    { name: "PHP", level: 95 },
    { name: "Laravel", level: 95 },
    { name: "Python", level: 88 },
    { name: "Django", level: 82 },
    { name: "Flask", level: 75 },
    { name: "Node.js", level: 70 },
  ],
  Frontend: [
    { name: "ReactJS", level: 80 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 72 },
    { name: "HTML / CSS", level: 90 },
  ],
  Database: [
    { name: "PostgreSQL", level: 88 },
    { name: "MySQL", level: 85 },
    { name: "PostGIS", level: 75 },
    { name: "Redis", level: 70 },
  ],
  "Cloud & DevOps": [
    { name: "Docker", level: 82 },
    { name: "GCP", level: 75 },
    { name: "AWS", level: 70 },
    { name: "CI/CD", level: 78 },
    { name: "Linux", level: 85 },
  ],
  Architecture: [
    { name: "REST API Design", level: 92 },
    { name: "System Design", level: 85 },
    { name: "SaaS Architecture", level: 80 },
    { name: "Real-Time Processing", level: 82 },
    { name: "Software Architecture", level: 85 },
  ],
};

export const experiences = [
  {
    company: "ASL Systems Ltd",
    role: "Senior Software Engineer",
    period: "2021 – Present",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Architected and led development of enterprise aviation systems for Air Navigation Service Providers",
      "Designed scalable microservices architecture for real-time aircraft signal processing using ADS-B and MLAT technologies",
      "Engineered a high-throughput aeronautical billing platform handling complex rate calculations across multiple jurisdictions",
      "Led a cross-functional engineering team of 6, establishing code review standards and CI/CD pipelines",
      "Drove technical architecture planning, sprint reviews, and stakeholder presentations",
    ],
    tech: ["Python", "Django", "ReactJS", "PostgreSQL", "PostGIS", "Docker", "GCP"],
  },
  {
    company: "Dream71 Bangladesh Ltd",
    role: "Software Engineer",
    period: "2019 – 2021",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Built the Ministry of Health's nationwide healthcare infrastructure project monitoring system",
      "Developed government digital service platforms adopted by thousands of users across Bangladesh",
      "Collaborated with international NGOs and development partners on digital transformation initiatives",
      "Implemented secure REST APIs and third-party integrations for government workflows",
    ],
    tech: ["Laravel", "PHP", "MySQL", "ReactJS", "REST API"],
  },
  {
    company: "Software Galaxy Ltd",
    role: "Junior Software Engineer",
    period: "2017 – 2018",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Built POS and inventory management systems for retail businesses",
      "Developed web applications for SMB clients across e-commerce and services",
      "Maintained legacy PHP codebases and introduced modern MVC patterns",
    ],
    tech: ["PHP", "Laravel", "MySQL", "JavaScript", "Bootstrap"],
  },
];

export const projects = [
  {
    title: "Aircraft Signal Processing System",
    description:
      "Real-time aircraft tracking platform utilizing ADS-B and MLAT technologies. Processes thousands of aircraft position updates per second for aviation monitoring, air traffic visualization, and operational analytics.",
    tech: ["ReactJS", "Python", "PostgreSQL", "PostGIS", "WebSocket", "Docker"],
    category: "Aviation",
    highlight: true,
  },
  {
    title: "BANE Billing Platform",
    description:
      "Enterprise aeronautical billing and revenue management platform for Air Navigation Service Providers. Handles complex multi-jurisdiction rate calculations, invoice generation, and financial reporting at scale.",
    tech: ["Python", "Django", "ReactJS", "Docker", "GCP", "PostgreSQL"],
    category: "Enterprise",
    highlight: true,
  },
  {
    title: "Healthcare Project Management System",
    description:
      "Government platform for monitoring nationwide healthcare infrastructure projects. Enables real-time progress tracking, fund disbursement oversight, and field reporting across hundreds of facilities.",
    tech: ["Laravel", "PHP", "MySQL", "REST API", "Bootstrap"],
    category: "Government",
    highlight: false,
  },
  {
    title: "Qorum Expense Management",
    description:
      "Enterprise expense management platform with real-time approval workflows, receipt capture, and deep mobile integrations. Reduced expense processing time by 60% for enterprise clients.",
    tech: ["Laravel", "ReactJS", "MySQL", "REST API", "Push Notifications"],
    category: "SaaS",
    highlight: false,
  },
];

export const researchInterests = [
  {
    title: "Artificial Intelligence",
    description: "LLM applications, intelligent automation, and AI-augmented engineering workflows.",
    icon: "Brain",
  },
  {
    title: "Machine Learning",
    description: "Predictive analytics, anomaly detection, and ML-driven operational intelligence.",
    icon: "Cpu",
  },
  {
    title: "Cyber Security",
    description: "Application security, threat modeling, penetration testing methodologies.",
    icon: "Shield",
  },
  {
    title: "Digital Forensics",
    description: "Incident response, evidence acquisition, and forensic investigation techniques.",
    icon: "Search",
  },
  {
    title: "Information Systems Audit",
    description: "ISACA frameworks, IT governance, risk assessment, and compliance auditing.",
    icon: "FileCheck",
  },
  {
    title: "Aviation Technology",
    description: "ADS-B, MLAT, CNS/ATM systems, and next-generation air traffic management.",
    icon: "Plane",
  },
  {
    title: "System Architecture",
    description: "Distributed systems, event-driven architectures, and high-availability design patterns.",
    icon: "Network",
  },
];

export const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "30+", label: "Projects Delivered" },
  { value: "3", label: "Companies" },
  { value: "5+", label: "Enterprise Systems" },
];
