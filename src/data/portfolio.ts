export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  leetcode?: string;
  hackerrank?: string;
  email?: string;
  phone?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  achievement: string;
  githubUrl: string;
  liveUrl?: string;
  detailedDescription?: string;
  problem: string;
  solution: string;
  architectureNodes?: string[];
  challenges: string[];
  learnings: string[];
  isFeatured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  description: string[];
  type: 'training' | 'education' | 'internship' | 'work';
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge?: string;
}

export interface LearningItem {
  name: string;
  status: 'learning' | 'building' | 'mastered';
  progress: number; // 0 to 100
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    primaryRole: string;
    careerSummary: string;
    interests: string;
    tagline: string;
    location: string;
    typingTitles: string[];
    bio: string;
    phone: string;
  };
  socials: SocialLinks;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  learning: LearningItem[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "ADARSH A",
    title: "Java Backend Developer | Java Full Stack Developer",
    primaryRole: "Java Backend Developer / Java Full Stack Developer",
    interests: "Java Backend, Distributed Systems & Computer Vision",
    tagline: "B.Tech ECE graduate specializing in Java Full Stack development, robust backend systems, and clean database integration.",
    location: "Bengaluru, Karnataka, India",
    phone: "+91 9778391694",
    typingTitles: [
      "Java Backend Developer",
      "Java Full Stack Developer",
      "Core Java & Spring Boot Engineer",
      "REST API & Database Developer",
    ],
    careerSummary: "B.Tech graduate in Electronics and Communication Engineering currently pursuing Java Full Stack Development training at QSpiders, Bengaluru. Building practical experience in Core Java, OOP, SQL, and backend development through hands-on projects. Seeking an entry-level Java Developer opportunity to apply programming and problem-solving skills while continuing to grow as a software engineer.",
    bio: "I am an entry-level software engineer with a solid foundation in Java, Object-Oriented Programming, and database integration, currently undergoing intensive Java Full Stack Development training at QSpiders, Bengaluru. With an academic background in Electronics and Communication Engineering from KTU, I combine disciplined problem-solving, clean backend design principles, and practical project experience across Java systems, computer vision, and embedded hardware."
  },
  socials: {
    email: "mailto:adarsh.official2011@gmail.com",
    phone: "+91 9778391694",
    linkedin: "https://www.linkedin.com/in/adarsh-ece",
    github: "https://github.com/warcraft433",
    leetcode: "https://leetcode.com/u/warcarft433",
  },
  skills: [
    {
      title: "Programming",
      skills: ["Java", "C", "Python", "SQL", "HTML"]
    },
    {
      title: "Java / Backend",
      skills: ["Core Java", "OOP", "JDBC", "Servlets", "JSP", "Spring Boot", "REST APIs"]
    },
    {
      title: "Frontend",
      skills: ["HTML5", "CSS3", "JavaScript", "React"]
    },
    {
      title: "AI / Computer Vision",
      skills: ["YOLOv8", "OpenCV", "Roboflow", "Google Colab"]
    },
    {
      title: "Tools & IDEs",
      skills: ["Git", "GitHub", "IntelliJ IDEA", "Eclipse IDE", "VS Code", "Maven", "Postman"]
    }
  ],
  projects: [
    {
      id: "printguard-ai",
      title: "AI-Enhanced 3D Printer / PrintGuard AI",
      subtitle: "AI-Assisted 3D Printing Platform with Defect Detection & OctoPrint Wireless Control",
      description: "AI-assisted 3D printing platform combining computer vision, 3D scanning, printer control, and real-time monitoring. Uses YOLOv8 and OpenCV for print-defect detection and Raspberry Pi with OctoPrint for wireless printer management.",
      technologies: ["Python", "YOLOv8", "OpenCV", "React", "Raspberry Pi", "OctoPrint"],
      achievement: "Successfully deploying real-time computer vision inference onto edge hardware using Raspberry Pi and automating print-failure detection to reduce material waste.",
      githubUrl: "https://github.com/warcraft433/printguard-ai",
      liveUrl: "",
      problem: "3D printing is a time-consuming process prone to sudden failure (e.g., spaghetti effect, detaching from build plate), leading to significant material waste and potential damage to equipment if left unmonitored.",
      solution: "Implemented an autonomous camera-monitoring system that runs real-time YOLOv8 object detection on a Raspberry Pi. It continuously infers the state of the print and triggers immediate pause signals via OctoPrint's REST API if failure anomalies are detected.",
      architectureNodes: [
        "Camera",
        "OpenCV Preprocessing",
        "Raspberry Pi 4",
        "YOLOv8 Inference",
        "Defect Anomaly Check",
        "OctoPrint API",
        "React Dashboard",
        "3D Printer Control"
      ],
      challenges: [
        "Optimizing YOLOv8 and OpenCV inference execution on edge hardware (Raspberry Pi) without frame delay.",
        "Handling low-light environments and variations in filament colors while maintaining high model accuracy."
      ],
      learnings: [
        "Applied model optimization and image preprocessing techniques with OpenCV.",
        "Learned REST API automation flows with OctoPrint and handled asynchronous communication states between hardware components."
      ],
      isFeatured: true
    },
    {
      id: "worksphere-erp",
      title: "WorkSphere ERP",
      subtitle: "Enterprise Workflow & Employee Management Application",
      description: "Java-based enterprise workflow and employee management application focused on CRUD operations, object-oriented design, database integration, and backend development.",
      technologies: ["Java", "Core Java", "OOP", "MySQL"],
      achievement: "Designing an object-oriented schema and reliable database integration supporting structured CRUD operations and employee lifecycle management.",
      githubUrl: "https://github.com/warcraft433/worksphere-erp",
      liveUrl: "",
      problem: "Organizations require structured, reliable software to manage employee records, department allocations, and operational CRUD workflows efficiently with database integrity.",
      solution: "Developed a robust Java enterprise management application implementing core OOP principles, JDBC/MySQL database persistence, and efficient modular architecture for corporate workflow operations.",
      challenges: [
        "Structuring relational database schemas in MySQL to maintain referential integrity across employee and departmental records.",
        "Designing clean OOP abstractions and separating business logic from database access layers."
      ],
      learnings: [
        "Deepened practical understanding of Core Java, OOP design patterns, and JDBC transaction handling.",
        "Learned to write optimized SQL queries for relational data management and schema modeling."
      ],
      isFeatured: true
    },
    {
      id: "ir-3d-scanner",
      title: "IR-Based 3D Scanner System",
      subtitle: "Low-Cost Automated 3D Scanning System with Point-Cloud Data Processing",
      description: "Low-cost automated 3D scanning system using an infrared distance sensor and two-axis stepper motor control. Captures surface measurements and stores point-cloud data in .xyz format for further 3D model processing.",
      technologies: ["Arduino UNO", "Sharp GP2Y0A21YK0F IR Sensor", "Arduino CNC Shield", "A4988 Motor Drivers", "NEMA 17 Stepper Motors", "SD Card Module"],
      achievement: "Bridging embedded microcontroller hardware with precision stepper motor motion to capture and export point-cloud data (.xyz).",
      githubUrl: "https://github.com/warcraft433/ir-3d-scanner",
      liveUrl: "",
      problem: "Commercial 3D laser scanners are cost-prohibitive for hobbyists and educational spatial measurement applications.",
      solution: "Engineered an automated scanning platform utilizing an Arduino UNO, Sharp IR distance sensor, CNC Shield with A4988 motor drivers, and NEMA 17 stepper motors to systematically measure surface coordinates and log point-cloud files onto an SD card.",
      challenges: [
        "Calibrating analog voltage output from the Sharp IR sensor into accurate millimeter distance measurements.",
        "Synchronizing two-axis stepper motor rotational steps with precise sensor sampling rates."
      ],
      learnings: [
        "Implemented sensor calibration curves and noise filtering algorithms in Arduino C/C++.",
        "Gained hands-on proficiency with motor driver timing, CNC shields, and SD card file writing."
      ],
      isFeatured: false
    }
  ],
  experience: [
    {
      id: "qspiders",
      role: "Java Full Stack Development Training",
      organization: "QSpiders, Bengaluru",
      location: "Bengaluru, Karnataka, India",
      period: "July 2026 – Present",
      description: [
        "Undergoing comprehensive training in Java Full Stack Development focused on building robust backend systems.",
        "Mastering Core Java, Object-Oriented Programming (OOP), Collections Framework, and Exception Handling.",
        "Hands-on development with SQL, JDBC, Servlets, JSP, Spring Boot, and REST APIs.",
        "Developing full-cycle backend services, database schema design, and modular application layers."
      ],
      type: "training"
    },
    {
      id: "codesign",
      role: "Python and Web Designing Internship",
      organization: "CodeDesign Technologies Pvt. Ltd.",
      location: "India",
      period: "2024",
      description: [
        "Hands-on internship focusing on Python programming, modern web designing concepts, and front-end layouts.",
        "Built responsive UI components and assisted in client-focused web development modules."
      ],
      type: "internship"
    },
    {
      id: "bsnl",
      role: "Industrial Training – Fiber Optic Technologies",
      organization: "BSNL Kollam Business Area",
      location: "Kollam, Kerala, India",
      period: "2025",
      description: [
        "Completed technical training on telecom infrastructure, optical fiber communication, and network routing mechanisms.",
        "Studied telecommunication transmission standards, multiplexing, and industrial optical equipment."
      ],
      type: "internship"
    },
    {
      id: "btech",
      role: "B.Tech — Electronics and Communication Engineering",
      organization: "Bishop Jerome Institute of Technology, Kollam, Kerala",
      location: "APJ Abdul Kalam Technological University (KTU)",
      period: "2022 – 2026",
      description: [
        "Graduated with CGPA: 6.7 / 10.",
        "Strong foundation in electronic circuits, signal processing, embedded systems, and microcontroller architectures.",
        "Developed hardware-software integration projects using Arduino, Raspberry Pi, sensors, and Python/C.",
        "Engaged in practical research combining computer vision with physical embedded hardware."
      ],
      type: "education"
    }
  ],
  certifications: [
    {
      id: "nptel-java",
      title: "Programming in Java",
      issuer: "NPTEL",
      year: "2024",
      badge: "Core Java & OOP"
    },
    {
      id: "infosys-c",
      title: "C Programming Certification",
      issuer: "Infosys",
      year: "2024",
      badge: "Foundational C"
    },
    {
      id: "ml-cert",
      title: "Certificate Course in Introduction to Machine Learning (CCIML)",
      issuer: "National Youth Programme",
      year: "2025",
      badge: "Machine Learning"
    },
    {
      id: "linkedin-php",
      title: "Learning the Standard PHP Library",
      issuer: "LinkedIn Learning",
      year: "2025",
      badge: "Backend & Web"
    },
    {
      id: "linkedin-dotnet",
      title: "Front-End Web Development with .NET",
      issuer: "LinkedIn Learning",
      year: "2025",
      badge: "Web Development"
    },
    {
      id: "linkedin-wordpress",
      title: "WordPress Essential Training",
      issuer: "LinkedIn Learning",
      year: "2025",
      badge: "Web Design"
    }
  ],
  learning: [
    { name: "Core Java & OOP Architecture", status: "mastered", progress: 95 },
    { name: "JDBC, SQL & Relational Databases (MySQL)", status: "mastered", progress: 90 },
    { name: "Spring Boot & RESTful Web Services", status: "building", progress: 80 },
    { name: "Servlets & JSP Web Architecture", status: "building", progress: 85 },
    { name: "React & Modern Frontend Development", status: "building", progress: 75 },
    { name: "Computer Vision & YOLOv8 Inference", status: "mastered", progress: 85 }
  ]
};

