import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, ChevronDown, ChevronRight, Menu, X, Code, Brain, Database, Sparkles, Download, Award, Briefcase, GraduationCap, BookOpen, Trophy, Zap, Cpu, Folder, FileText } from 'lucide-react';

const TypewriterText = ({ text, speed = 30, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, isVisible]);

  return (
    <span ref={elementRef}>
      {displayedText}
      {isVisible && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

const AnimatedSection = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);

  const featuredProjects = [
    {
      title: "FAU Smart Academic Assistant",
      subtitle: "Multi-Agent AI Automation System",
      description: "Built an intelligent assistant that automates academic workflows using multiple AI agents. The system handles task delegation, voice interactions, and calendar management, cutting manual work by 90%.",
      tech: ["Python", "OpenAI API", "Streamlit", "Multi-Agent Systems", "Speech Recognition", "gTTS", "SQLite", "Email Automation"],
      highlights: [
        "Reduced manual academic tasks by 90% through autonomous agent coordination",
        "Implemented real-time voice interface with speech-to-text and text-to-speech",
        "Created smart form autofill using natural language understanding",
        "Integrated calendar sync and automated email notifications"
      ],
      algorithms: ["Agentic AI", "Task Decomposition", "Workflow Orchestration", "NLP", "Event-Driven Architecture"],
      implementation: "Designed a multi-agent architecture where specialized agents handle different academic tasks. Used OpenAI's API for intelligent decision-making and task routing. Integrated speech recognition for hands-free operation and built a SQLite database for persistent storage of user preferences and task history.",
      icon: <Brain className="w-6 h-6" />,
      github: "https://github.com/TudeepAIEngineer/fau-academic-assistant",
      demo: "https://fau-smart-assistant.streamlit.app"
    },
    {
      title: "Fashion Recommendation System",
      subtitle: "Deep Learning + Computer Vision",
      description: "Developed a recommendation engine that suggests similar fashion items based on visual features. Uses pre-trained CNNs to understand style, color, and patterns from images.",
      tech: ["Python", "TensorFlow", "Keras", "ResNet50", "VGG16", "OpenCV", "scikit-learn", "Flask", "KNN"],
      highlights: [
        "Leveraged ResNet50 transfer learning to extract visual features from fashion images",
        "Built hybrid recommendation engine combining KNN with cosine similarity",
        "Designed complete pipeline from image preprocessing to ranked recommendations",
        "Deployed as REST API using Flask for real-time predictions"
      ],
      algorithms: ["CNNs", "Transfer Learning", "K-Nearest Neighbors", "Cosine Similarity", "Content-Based Filtering"],
      implementation: "Used pre-trained ResNet50 to extract high-level features from clothing images. Applied K-Nearest Neighbors with cosine similarity to find visually similar items. Built preprocessing pipeline to normalize images and a Flask API to serve recommendations in production.",
      icon: <Sparkles className="w-6 h-6" />,
      github: "https://github.com/TudeepAIEngineer/fashionRecommendationSystem",
      demo: null
    },
    {
      title: "Gold Price Prediction System",
      subtitle: "Time-Series Forecasting & Ensemble ML",
      description: "Created a forecasting system that predicts gold prices using ensemble machine learning. Combines Random Forest, Ridge Regression, and LSTM to capture both short-term trends and long-term patterns.",
      tech: ["Python", "scikit-learn", "LSTM", "Prophet", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Flask"],
      highlights: [
        "Combined multiple models (Random Forest, Ridge, LSTM) for robust predictions",
        "Engineered time-series features including moving averages and momentum indicators",
        "Evaluated performance using RMSE, R², and MSE across different time horizons",
        "Built Flask API for real-time price predictions with confidence intervals"
      ],
      algorithms: ["Random Forest", "Ridge Regression", "Linear Regression", "LSTM", "Prophet", "Time Series Analysis"],
      implementation: "Developed ensemble approach where each model captures different aspects of price movement. Used scikit-learn for traditional ML models and Prophet for capturing seasonality. Created comprehensive feature engineering pipeline and deployed prediction API with Flask.",
      icon: <Code className="w-6 h-6" />,
      github: "https://github.com/TudeepAIEngineer/Gold-Price",
      demo: null
    }
  ];

  const skills = {
    "AI & Machine Learning": ["Deep Learning", "Machine Learning", "Multi-Agent Systems", "Agentic AI", "Transfer Learning", "Ensemble Methods", "Neural Networks", "Recommendation Systems"],
    "NLP & Voice AI": ["Natural Language Processing", "Speech Recognition", "Text-to-Speech", "gTTS", "SpeechRecognition", "LLM Applications", "Transformers"],
    "Computer Vision": ["CNNs", "ResNet50", "VGG16", "OpenCV", "Image Processing", "Feature Extraction", "Transfer Learning"],
    "Data Science & Analysis": ["Pandas", "NumPy", "Feature Engineering", "Time Series Analysis", "Statistical Analysis", "Matplotlib", "Seaborn", "Predictive Modeling"],
    "Programming & Frameworks": ["Python", "Java", "Flask", "Streamlit", "REST APIs", "TensorFlow", "Keras", "scikit-learn"],
    "Cloud & MLOps": ["AWS S3", "AWS Redshift", "ETL Pipelines", "Model Deployment", "MLOps", "CI/CD", "Docker"],
    "Databases": ["SQLite", "SQL", "PostgreSQL", "MySQL", "Redis", "Data Persistence"],
    "Automation & DevOps": ["Workflow Orchestration", "Task Automation", "Email Automation", "SMTP", "Shell Scripting", "Git", "Linux"]
  };

  const experience = [
    {
      role: "Data Engineering Intern",
      company: "Eduskills",
      period: "Jan 2024 — Mar 2024",
      achievements: [
        "Built ETL pipeline moving data from S3 to Redshift with automatic schema updates and incremental loading",
        "Set up data quality checks with automated monitoring dashboards and alert system",
        "Applied MLOps practices including version control, automated testing, and deployment pipelines",
        "Improved Redshift query performance by 40% through strategic table design and compression"
      ]
    }
  ];

  const certifications = [
    {
      name: "LLM Engineering: Master AI, LLM & Agents",
      issuer: "Udemy",
      date: "In Progress",
      link: "https://www.udemy.com/course/llm-engineering/",
      category: "AI/ML"
    },
    {
      name: "AWS Educate: Introduction to Generative AI",
      issuer: "AWS",
      date: "Oct 2025",
      link: "https://aws.amazon.com/education/awseducate/",
      category: "Cloud/AI"
    },
    {
      name: "Certificate of Excellence (COE)",
      issuer: "Academic Achievement",
      date: "2024",
      link: "#",
      category: "Academic"
    },
    {
      name: "Java Programming Certification",
      issuer: "EPAM Systems",
      date: "2023",
      link: "#",
      category: "Programming"
    },
    {
      name: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "2022",
      link: "https://learn.microsoft.com/en-us/certifications/azure-ai-fundamentals/",
      category: "Cloud/AI"
    },
    {
      name: "Microsoft Certified: Azure Data Fundamentals",
      issuer: "Microsoft",
      date: "Oct 2022",
      link: "https://learn.microsoft.com/en-us/certifications/azure-data-fundamentals/",
      category: "Cloud/Data"
    }
  ];

  const coursework = {
    master: [
      { code: "CAP 6776", name: "Information Retrieval", status: "In Progress" },
      { code: "CAP 6640", name: "Natural Language Processing", status: "Completed" },
      { code: "CEN 5086", name: "Cloud Computing", status: "Completed" },
      { code: "COT 6930", name: "GenAI Software Dev. Lifecycles", status: "Completed" },
      { code: "CAP 6635", name: "Artificial Intelligence", status: "Completed" },
      { code: "CEN 5035", name: "Software Engineering", status: "Completed" },
      { code: "ISM 6217", name: "Database Management Systems", status: "Completed" },
      { code: "CAP 5615", name: "Intro to Neural Networks", status: "Completed" },
      { code: "CAP 6673", name: "Data Mining & Machine Learning", status: "Completed" },
      { code: "CAP 5768", name: "Intro to Data Science", status: "Completed" }
    ],
    bachelor: [
      "Python for Data Science",
      "Natural Language Processing",
      "Social Data Analytics",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Object-Oriented Programming",
      "Software Engineering Principles",
      "Machine Learning Fundamentals"
    ]
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Tudeep_Velkuru_Resume.pdf';
    link.download = 'Tudeep_Velkuru_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ScrollIndicator = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-6 h-6 text-blue-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 overflow-x-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 40% 20%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Tudeep Velkuru
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Education', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group font-medium"
                  onClick={() => setActiveSection(item.toLowerCase())}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-3">
              {['Home', 'About', 'Education', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Brain className="w-16 h-16 text-blue-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tudeep Velkuru
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold">
            <TypewriterText text="AI Engineer & ML Systems Builder" speed={50} />
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            <TypewriterText 
              text="Building production AI systems that solve real problems. Focused on LLMs, computer vision, and scalable ML infrastructure."
              speed={30}
              delay={1200}
            />
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a href="mailto:vtudeep@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
            <button onClick={handleDownloadResume} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Download className="w-5 h-5" />
              Download Resume
            </button>
            <a href="https://www.linkedin.com/in/vtudeep/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a href="https://github.com/TudeepAIEngineer" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 border-2 border-gray-700 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300 transform hover:scale-105">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>

          <div className="flex gap-6 justify-center text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">vtudeep@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">728-880-9616</span>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-6 relative flex items-center">
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              About Me
            </h2>
          </AnimatedSection>
          
          <AnimatedSection className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-xl mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I'm pursuing my MS in Artificial Intelligence at Florida Atlantic University (GPA 3.59), where I'm focused on turning ML research into working systems. Before grad school, I graduated with honors from G. Pulla Reddy Engineering College in India with an 8.6/10 CGPA, specializing in AI and Machine Learning.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              My work centers on building practical AI solutions—multi-agent systems, computer vision applications, and forecasting models that actually get deployed. I'm particularly interested in LLM applications, agentic AI architectures, and the infrastructure needed to make ML systems reliable in production.
            </p>
          </AnimatedSection>

          {/* Skills */}
          <div className="mt-12">
            <AnimatedSection>
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Technical Expertise</h3>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(skills).map(([category, items], index) => (
                <AnimatedSection key={category}>
                  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                    <h4 className="text-base font-bold mb-3 text-blue-600 group-hover:text-indigo-600 transition-colors">{category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium hover:bg-blue-100 transition-all duration-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-12">
            <AnimatedSection>
              <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Certifications & Recognition</h3>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, idx) => (
                <AnimatedSection key={idx}>
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer block h-full"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors flex-shrink-0">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">{cert.name}</h4>
                        <p className="text-gray-600 text-xs mb-1">{cert.issuer}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs">{cert.date}</span>
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">{cert.category}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
              <AnimatedSection>
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200 shadow-lg h-full">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg flex-shrink-0">
                      <Trophy className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">FAU Hackathon</h4>
                      <p className="text-gray-600 text-xs">Dec 2025</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen py-20 px-6 relative bg-white/50 flex items-center">
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Education
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {/* Master's Degree */}
            <AnimatedSection className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-xl">
              <div className="flex items-start gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl flex-shrink-0">
                  <GraduationCap className="w-12 h-12 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Master of Science in Artificial Intelligence
                  </h3>
                  <p className="text-xl text-blue-600 font-semibold mb-2">Florida Atlantic University, Boca Raton, FL</p>
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-2">
                      <span className="font-semibold">GPA:</span> 3.59/4.0
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-semibold">Expected Graduation:</span> April 2026
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-semibold">Credits:</span> 27/30 Completed
                    </span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Focus Areas:</span> Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI, Cloud Computing
                  </p>
                </div>
              </div>

              {/* Coursework Dropdown */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setExpandedCourse(expandedCourse === 'master' ? null : 'master')}
                  className="w-full flex items-center justify-between text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-gray-800">Graduate Coursework ({coursework.master.length} courses)</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${expandedCourse === 'master' ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedCourse === 'master' && (
                  <div className="mt-4 grid md:grid-cols-2 gap-3 animate-fadeIn">
                    {coursework.master.map((course, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800">{course.name}</p>
                            <p className="text-sm text-gray-600">{course.code}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            course.status === 'In Progress' 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Bachelor's Degree */}
            <AnimatedSection className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-xl">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-indigo-50 rounded-xl flex-shrink-0">
                  <GraduationCap className="w-12 h-12 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    Bachelor of Technology (Honors) in Computer Science
                  </h3>
                  <p className="text-xl text-indigo-600 font-semibold mb-2">G. Pulla Reddy Engineering College, Kurnool, India</p>
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-2">
                      <span className="font-semibold">CGPA:</span> 8.6/10.0
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-semibold">Graduated:</span> May 2024
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Honors Concentration:</span> Artificial Intelligence & Machine Learning
                  </p>

                  {/* Bachelor Coursework Dropdown */}
                  <div className="mt-6">
                    <button
                      onClick={() => setExpandedCourse(expandedCourse === 'bachelor' ? null : 'bachelor')}
                      className="w-full flex items-center justify-between text-left p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span className="text-lg font-bold text-gray-800">Key Undergraduate Coursework</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${expandedCourse === 'bachelor' ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedCourse === 'bachelor' && (
                      <div className="mt-4 grid md:grid-cols-2 gap-3 animate-fadeIn">
                        {coursework.bachelor.map((course, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100">
                            <p className="font-medium text-gray-800 text-sm">{course}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-6 relative flex items-center">
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </AnimatedSection>
          
          <div className="space-y-8">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-blue-600 font-semibold mb-3">{project.subtitle}</p>
                    <p className="text-gray-700 mb-4">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-600 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-1 flex-shrink-0">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Details */}
                <button
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-300 mb-4"
                >
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {expandedProject === index ? 'Hide' : 'View'} Technical Details
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${expandedProject === index ? 'rotate-180' : ''}`} />
                </button>

                {expandedProject === index && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 animate-fadeIn">
                    <div className="mb-3">
                      <h5 className="text-sm font-bold text-gray-700 mb-2">Algorithms & Techniques:</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {project.algorithms.map((algo) => (
                          <span key={algo} className="px-2 py-1 bg-white text-gray-700 rounded text-xs font-medium border border-gray-300">
                            {algo}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-gray-700 mb-2">Implementation:</h5>
                      <p className="text-sm text-gray-600 leading-relaxed">{project.implementation}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm font-medium">View Code</span>
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Explore More Projects Button */}
          <AnimatedSection className="mt-12 text-center">
            <a 
              href="https://github.com/TudeepAIEngineer?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Folder className="w-5 h-5" />
              <span className="text-lg font-semibold">Explore 20+ More Projects on GitHub</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-20 px-6 relative bg-white/50 flex items-center">
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Professional Experience
            </h2>
          </AnimatedSection>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <AnimatedSection key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <p className="text-gray-600 mt-2 md:mt-0 font-medium">{exp.period}</p>
                </div>
                
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700 flex items-start gap-3">
                      <span className="text-blue-600 text-xl mt-0.5 flex-shrink-0">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-6 relative flex items-center">
        <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
          <AnimatedSection>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
          </AnimatedSection>
          
          <AnimatedSection>
            <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
              <TypewriterText 
                text="I'm open to new opportunities, collaborations, and interesting AI projects. Whether you're building something new or improving an existing system, let's talk."
                speed={25}
              />
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex flex-wrap gap-6 justify-center mb-12">
            <a href="mailto:vtudeep@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Mail className="w-5 h-5" />
              <span className="font-medium">vtudeep@gmail.com</span>
            </a>
            <a href="tel:7288809616" className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Phone className="w-5 h-5" />
              <span className="font-medium">728-880-9616</span>
            </a>
          </AnimatedSection>

          <AnimatedSection className="flex gap-6 justify-center">
            <a href="https://www.linkedin.com/in/vtudeep/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-md">
              <Linkedin className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            </a>
            <a href="https://github.com/TudeepAIEngineer" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 hover:border-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-md">
              <Github className="w-6 h-6 text-gray-700" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white/50 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 font-medium">
            © 2026 Tudeep Velkuru. Built with React & Tailwind CSS.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Boca Raton, Florida • AI Engineer & ML Systems Builder
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default App;