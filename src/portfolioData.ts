export interface Project {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  highlights: string[];
  githubUrl?: string;
  isPrivate?: boolean;
  imagePath?: string;
  indexStr: string;
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
  location: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  category: "leadership" | "technical" | "general";
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Prashant Srivastava",
    title: "Software Engineer",
    subtitle: "Specializing in Java & Applied AI",
    location: "Noida, Uttar Pradesh, India",
    availability: "Open to relocation",
    email: "prashant.sri2930@gmail.com",
    githubUsername: "prashant2930",
    linkedinUsername: "prashant-srivastava-ps",
    githubUrl: "https://github.com/prashant2930",
    linkedinUrl: "https://linkedin.com/in/prashant-srivastava-ps",
    resumeUrl: `${import.meta.env.BASE_URL}files/Prashant_Srivastava_Resume.pdf`,
    headline: "I design structured software solutions and analyze complex datasets.",
    aboutBrief: "I am a Computer Science and Engineering graduate with a robust foundation in software engineering, Java development, structured problem solving, and applied artificial intelligence. My technical work focuses on building indexing structures, refining text processing models, and extracting utility from complex data pipelines. I approach engineering problems with analytical precision, seeking to understand how layers of a system interface and finding optimal pathways to implement modular, maintainable, and highly efficient code.",
  },
  
  projects: [
    {
      id: "search-engine",
      title: "Mini Search Engine",
      category: "Information Retrieval & Systems",
      technologies: ["Java", "TF-IDF", "Information Retrieval", "Data Structures"],
      description: "A highly-optimized system built to demonstrate modular document indexing, multi-keyword lookup, and ranked search result retrieval using architectural principles of search systems.",
      highlights: [
        "Inverted Indexing: Structured a custom inverted index utilizing efficient Java collection frameworks for rapid keyword-to-document mappings.",
        "Relevance Ranking: Implemented high-fidelity TF-IDF (Term Frequency-Inverse Document Frequency) weighting calculations to weigh word importance across indexed assets.",
        "Mathematical Retrieval: Integrated cosine similarity vector computations to calculate the precise angular distance between keyword queries and indexed texts, returning sorted, relevance-ranked results."
      ],
      isPrivate: true,
      indexStr: "01",
      imagePath: "/assets/projects/search-engine.webp"
    },
    {
      id: "resume-analyzer",
      title: "Resume Analyzer",
      category: "Applied Natural Language Processing",
      technologies: ["Python", "Text Processing", "Information Extraction"],
      description: "A practical text analyzer focused on parsing unformatted resume documents, extracting key skills, and comparing candidates against specific job descriptions to reveal talent gaps.",
      highlights: [
        "Information Extraction: Engineered pythonic text processing workflows to cleanly ingest, tokenize, and normalize unstructured document layouts.",
        "Gap Analysis Model: Designed an algorithmic keyword comparison engine mapping extracted candidate features directly against job requirement models.",
        "Actionable Feedback: Created structured visual feedback reporting exact keyword overlap percentages and indicating explicit skill areas to address."
      ],
      githubUrl: "https://github.com/prashant2930/Resume-Analyzer",
      isPrivate: false,
      indexStr: "02",
      imagePath: "/assets/projects/resume-analyzer.webp"
    },
    {
      id: "consumer-behavior",
      title: "Consumer Behavior Analysis",
      category: "Data Analysis & Visualization",
      technologies: ["Python", "Power BI", "Data Analysis", "Matplotlib"],
      description: "A comprehensive analysis of retail customer transaction data, highlighting spending trends, segmenting customer groupings, and producing interactive business intelligence views.",
      highlights: [
        "Data Pipelines: Built custom ingestion and clean-up workflows in Python using NumPy and Pandas to address outlier records and missing values.",
        "Segment Identification: Identified consumer clusters and purchase frequencies using mathematical aggregation models to isolate trend patterns.",
        "Interactive Dashboards: Designed clean, highly scannable Power BI dashboards featuring cross-filtering and metric visualizations for key behavior metrics."
      ],
      isPrivate: true,
      indexStr: "03",
      imagePath: "/assets/projects/consumer-analysis.webp"
    },
    {
      id: "team-task-manager",
      title: "Team Task Manager",
      category: "Software Design & Architecture",
      technologies: ["Java", "Object-Oriented Design", "Clean Architecture"],
      description: "A desktop organization platform supporting multi-user assignment queues, priority scheduling, and structured logging of milestone completion.",
      highlights: [
        "Clean Design: Followed strict object-oriented design patterns to isolate business state from user display layers, promoting modular testing.",
        "State Management: Implemented memory-efficient queue configurations to track active, pending, and archived task states concurrently.",
        "Robust Workflows: Engineered deterministic priority sorting algorithms to arrange task sequences according to deadline proximity."
      ],
      githubUrl: "https://github.com/prashant2930/team-task-manager-clean",
      isPrivate: false,
      indexStr: "04",
      imagePath: "/assets/projects/task-manager.webp"
    }
  ] as Project[],

  skills: [
    {
      title: "Languages",
      skills: ["Java", "Python", "SQL"]
    },
    {
      title: "Core Computer Science",
      skills: ["Data Structures and Algorithms", "Object-Oriented Programming", "Database Management Systems", "Operating Systems", "Computer Networks"]
    },
    {
      title: "Libraries",
      skills: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"]
    },
    {
      title: "Database Systems",
      skills: ["MySQL"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Power BI"]
    },
    {
      title: "AI / Machine Learning Exposure",
      skills: ["Supervised Learning", "Data Preprocessing", "Feature Engineering", "Model Evaluation", "Information Retrieval", "TF-IDF"]
    }
  ] as SkillCategory[],

  problemSolving: {
    solvedCount: 200,
    platforms: ["LeetCode", "CodeChef"],
    focusAreas: [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stacks and Queues",
      "Trees",
      "Graphs",
      "Searching and Sorting",
      "Recursion",
      "Dynamic Programming"
    ]
  },

  research: {
    title: "Fake News Detection using TF-IDF",
    role: "Co-authored Academic Research Paper",
    description: "Collaborated on an undergraduate college project focusing on evaluating machine learning performance on textual categorization problems, specifically false content detection.",
    focusAreas: ["TF-IDF", "Text Representation", "Information Retrieval", "Fake News Detection"]
  },

  training: {
    title: "Machine Learning Training",
    provider: "Pyramid (at Noida Institute of Engineering and Technology)",
    highlights: [
      "Completed hands-on machine learning training covering supervised learning, model evaluation, and data preprocessing using Python-based ML workflows.",
      "Built 2+ mini-projects applying supervised learning techniques and practical data processing.",
      "Worked with feature engineering, preprocessing, and model evaluation techniques."
    ]
  } as TrainingItem,

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

  achievements: [
    {
      title: "Head Coordinator",
      description: "Led a student team in organizing photography events, competitions, and club activities for the Megapixel Club (Photography Club) at NIET. Coordinated event planning and smooth cross-department execution.",
      category: "leadership"
    },
    {
      title: "Three-Time Photographer of the Month",
      description: "Awarded 'Photographer of the Month' three times in recognition of outstanding creative eye and mastery of technical photography processes.",
      category: "general"
    },
    {
      title: "200+ Algorithmic Challenges Solved",
      description: "Successfully resolved over 200 coding hurdles spanning major interactive training ecosystems, demonstrating strong competence in core DSA paradigms.",
      category: "technical"
    }
  ] as AchievementItem[],

  certifications: [
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM"
    },
    {
      title: "Introduction to Artificial Intelligence",
      issuer: "IBM"
    },
    {
      title: "Java Programming Fundamentals",
      issuer: "Infosys Springboard"
    },
    {
      title: "Data Structures & Algorithmic Learning",
      issuer: "Coursera"
    }
  ] as CertificationItem[]
};
