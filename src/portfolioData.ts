export interface Project {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  highlights: string[];
  githubUrl: string;
  filterTags: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  metricLabel: string;
  metricValue: string;
  isPrimary: boolean;
}

export interface TrainingItem {
  title: string;
  provider: string;
  status?: string;
}

export interface AchievementItem {
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Prashant Srivastava",
    title: "Computer Science Graduate",
    subtitle: "Software Engineering & AI",
    email: "prashant.sri2930@gmail.com",
    phone: "+91-8922833021",
    githubUrl: "https://github.com/prashant2930",
    linkedinUrl: "https://www.linkedin.com/in/prashant-srivastava-ps/",
    headline: "Building software systems and AI-powered applications with a focus on strong engineering fundamentals.",
    aboutBrief: "I am a Computer Science Graduate specializing in Software Engineering and Applied Artificial Intelligence. My background covers designing modular software components, building text parsing and data analysis pipelines, and solving algorithmic problems. I approach software engineering with a focus on clean architecture, performance, and practical systems development."
  },
  
  projects: [
    {
      id: "job-hunter-ai",
      title: "JobHunterAI",
      category: "AI & Backend Engineering",
      technologies: ["Python", "FastAPI", "React", "TypeScript", "SQLite", "Gemini API"],
      description: "AI-powered job aggregation and matching platform for discovering and ranking relevant opportunities.",
      highlights: [
        "Integrated listings from 4 job sources into a normalized schema.",
        "Designed a 100-point hybrid matching engine using skills, experience, job attributes, and deterministic relevance rules.",
        "Implemented resume/document extraction, job normalization, seniority filtering, and Pytest coverage for core workflows."
      ],
      githubUrl: "https://github.com/prashant2930/JobHunterAI",
      filterTags: ["Software Engineering", "AI / LLM", "Backend"]
    },
    {
      id: "team-task-manager",
      title: "Team Task Manager",
      category: "Full-Stack Web Application",
      technologies: ["Next.js", "React", "TypeScript", "MongoDB", "Mongoose", "Tailwind CSS", "JWT", "Zod"],
      description: "A collaborative task management platform supporting multi-user assignment queues, priority scheduling, and structured logging of milestone completion.",
      highlights: [
        "Built a responsive full-stack team application using Next.js App Router for server-side state and API routes.",
        "Implemented data persistence using MongoDB and Mongoose with schema validation and query optimization.",
        "Designed secure JWT-based authentication and role-based access control to protect API routes and views."
      ],
      githubUrl: "https://github.com/prashant2930/team-task-manager-clean",
      filterTags: ["Software Engineering", "Backend"]
    },
    {
      id: "resume-analyzer",
      title: "Resume Analyzer",
      category: "Applied Natural Language Processing",
      technologies: ["Python", "Streamlit", "PyMuPDF", "PDF parsing", "Google Gemini API"],
      description: "An interactive document scanner that parses PDF resumes and evaluates compatibility against job descriptions.",
      highlights: [
        "Engineered text ingestion and parsing pipelines for unstructured PDF resume layouts using PyMuPDF.",
        "Integrated the Google Gemini API (gemini-2.0-flash) to run deep contextual comparison and gap analysis against job descriptions.",
        "Designed an interactive web dashboard in Streamlit featuring dynamic matching scores and downloadable feedback reports."
      ],
      githubUrl: "https://github.com/prashant2930/Resume-Analyzer",
      filterTags: ["Software Engineering", "AI / LLM"]
    },
    {
      id: "java-search-engine",
      title: "Java Information Retrieval Search Engine",
      category: "Information Retrieval Systems",
      technologies: ["Java 17", "Object-Oriented Programming", "Java NIO", "Data Structures"],
      description: "Foundation of an information-retrieval search engine built in Java to understand document ingestion and retrieval architecture.",
      highlights: [
        "Designed the document processing architecture utilizing modular Java 17 features.",
        "Implemented filesystem-based document ingestion using Java NIO for path and directory streaming.",
        "Structured modular Object-Oriented components including FileLoader and Document models (retrieval pipeline currently under development)."
      ],
      githubUrl: "https://github.com/prashant2930/java-tf-idf-search-engine",
      filterTags: ["Software Engineering", "Java", "Backend"]
    },
    {
      id: "healththread-mvp",
      title: "HealthThread MVP",
      category: "Frontend Web Application",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Recharts"],
      description: "Healthcare dashboard for managing medical records, symptoms, vitals, and care loops.",
      highlights: [
        "Contributed to healthcare dashboard interfaces using React and TypeScript.",
        "Integrated interfaces for vitals tracking, symptom management, and medical record workflows.",
        "Contributed to doctor-brief generation and AI-assistant interface."
      ],
      githubUrl: "https://github.com/prashant2930/healththread-mvp",
      filterTags: ["Software Engineering", "Frontend"]
    }
  ] as Project[],

  skills: [
    {
      title: "Languages",
      skills: ["Java", "Python", "TypeScript", "SQL"]
    },
    {
      title: "Core CS",
      skills: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems", "Operating Systems", "Computer Networks"]
    },
    {
      title: "Development",
      skills: ["REST APIs", "FastAPI", "React", "Software Testing", "Debugging"]
    },
    {
      title: "AI/LLM",
      skills: ["LLM Applications", "Prompt Engineering", "RAG", "LangChain"]
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "Pytest", "VS Code", "SQLite", "MongoDB"]
    }
  ] as SkillCategory[],

  research: {
    title: "Efficiency vs. Accuracy: Revisiting TF-IDF in the Era of Transformer Models",
    status: "Unpublished",
    description: "A comparative study of TF-IDF and BERT focusing on classification accuracy, inference latency, memory usage, and deployment trade-offs for NLP systems."
  },

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Noida Institute of Engineering and Technology",
      location: "Greater Noida, India",
      duration: "2022 – 2026",
      metricLabel: "CGPA",
      metricValue: "7.8",
      isPrimary: true
    },
    {
      degree: "Intermediate / Class XII, CBSE",
      institution: "Tiny Tots School",
      location: "Ayodhya, India",
      duration: "2021",
      metricLabel: "Percentage",
      metricValue: "88.6%",
      isPrimary: false
    },
    {
      degree: "Secondary School / Class X, CBSE",
      institution: "Tiny Tots Sr. Sec. School",
      location: "Ayodhya, India",
      duration: "2019",
      metricLabel: "Percentage",
      metricValue: "88.16%",
      isPrimary: false
    }
  ] as EducationItem[],

  training: [
    {
      title: "Machine Learning Training",
      provider: "Noida Institute of Engineering and Technology"
    },
    {
      title: "Database Management Systems",
      provider: "Infosys Springboard"
    },
    {
      title: "Java Programming Fundamentals",
      provider: "Infosys Springboard"
    },
    {
      title: "Human-Centered Design for Inclusive Innovation",
      provider: "Coursera"
    },
    {
      title: "RAG & LLM Engineering",
      provider: "Udemy",
      status: "In Progress"
    }
  ] as TrainingItem[],

  achievements: [
    {
      description: "2nd Place — XPANSE entrepreneurship and business strategy competition"
    },
    {
      description: "200+ Data Structures & Algorithms problems solved across LeetCode and CodeChef"
    },
    {
      description: "Student team leadership and photography event coordination"
    }
  ] as AchievementItem[],

  beyondCoding: {
    title: "Beyond Coding",
    points: [
      {
        title: "Integrity & Consistency",
        description: "Approaching work and collaboration with transparency, delivering reliable results continuously."
      },
      {
        title: "Attention to Detail",
        description: "Ensuring clean layout alignment, precise code syntax, and bug-free interfaces."
      },
      {
        title: "Active Listening",
        description: "Understanding user and team needs thoroughly before architecture implementation."
      },
      {
        title: "Visual Storytelling",
        description: "Capturing human emotion, light, and perspective through dedicated photography."
      }
    ]
  }
};
