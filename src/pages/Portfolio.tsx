import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import SkillBar from "@/components/SkillBar";
import EducationTimeline from "@/components/EducationTimeline";
import ContactForm from "@/components/ContactForm";

const sectionNames = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "ABOUT ME" },
  { id: "skills", label: "MY SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
];

const Portfolio = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Mock data for skills
  const skills = [
    {
      name: ".NET Core Development",
      percentage: 85,
      icon: "https://i.postimg.cc/wBVvTSMf/NET-Core-Logo-svg-1.png", // Placeholder for .NET icon
    },
    {
      name: "Data Science & Analytics",
      percentage: 80,
      icon: "https://i.postimg.cc/jq9j56qb/4824797.png", // Placeholder for Data Science icon
    },
    {
      name: "Machine Learning",
      percentage: 75,
      icon: "https://i.postimg.cc/2SjvdFWK/Machine-Learning-PNG-File.png", // Placeholder for ML icon
    },
    {
      name: "SQL & Database Management ",
      percentage: 80,
      icon: "https://i.postimg.cc/t4r6BZtC/3d-rendering-sql-isolated-useful-for-technology-programming-development-coding-software-app-computin.webp", // Placeholder for SQL icon
    },
    {
      name: "API Development",
      percentage: 70,
      icon: "https://i.postimg.cc/25K5Zndh/png-transparent-web-development-application-programming-interface-ibm-api-management-software-develo.png", // Placeholder for API icon
    },
    {
      name: "Python",
      percentage: 90,
      icon: "https://i.postimg.cc/7hvYBDWL/hd-python-logo-symbol-transparent-png-735811696257415dbkifcuokn-removebg-preview.png", // Placeholder for Python icon
    },
    {
      name: "C++",
      percentage: 90,
      icon: "https://i.postimg.cc/cCQ12jpB/imgbin-the-c-programming-language-computer-programming-programmer-others-Xy-Lt-EFMu-Nmq-Gvu-Ws9-Vq2f-RZvw-r.png", // Placeholder for C++ icon
    },
    {
      name: "C#",
      percentage: 75,
      icon: "https://i.postimg.cc/T33K210D/imgbin-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-x2vvzp-HKBm-Q.png", // Placeholder for C++ icon
    },
    {
      name: "Azure DevOps",
      percentage: 75,
      icon: "https://i.postimg.cc/xCmbjsrc/devops.png", // Placeholder for Azure DevOps icon
    },
  ];

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: "Handwritten Digit Recognition",
      description:
        "A deep learning model using CNN to classify handwritten digits from the MNIST dataset.",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
      learnMoreUrl:"https://github.com/AkhilJain5/Handwritten-Digit-Recognition",
    },
    {
      id: 2,
      title: "Netflix Recommendation System",
      description:
        "An ML-based recommendation engine suggesting personalized movie/TV show choices.",
      image:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&q=80",
      learnMoreUrl:"https://github.com/AkhilJain5/Netflix-Recommendation-System",
    },
    {
      id: 3,
      title: "Object Detection System",
      description:
        "Real-time detection of objects using OpenCV and pre-trained YOLO models.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/38/Detected-with-YOLO--Schreibtisch-mit-Objekten.jpg",
      learnMoreUrl:"https://github.com/AkhilJain5/Object-Detection-System",
    },
    {
      id: 4,
      title: "AlertGuard – Drowsiness Detection System",
      description:
        "A computer vision system to detect driver drowsiness and trigger alerts for safety.",
      image:
        "https://media.istockphoto.com/id/1211980101/photo/falling-asleep-while-driving-a-car.webp?a=1&b=1&s=612x612&w=0&k=20&c=Xa9ICjRyC80ZK237IbiRT7htAKunqd3IIMy5vS-VLLk=",
      learnMoreUrl:"https://github.com/AkhilJain5/AlertGuard",
    },
    {
      id: 5,
      title: "TweetSent Analyzer",
      description:
        "A sentiment analysis tool that classifies tweets as positive, negative, or neutral using NLP.",
      image:
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
      learnMoreUrl:"https://github.com/AkhilJain5/TweetSent-Analyzer",
    },
  ];

  // Mock data for education timeline
  const educationData = [
    {
      year: "2019",
      title: "10th Grade",
      institution: "Miss Hill School (CBSE)",
      achievement: "86.8%",
      icon: "school",
    },
    {
      year: "2021",
      title: "12th Grade",
      institution: "Miss Hill School (CBSE)",
      achievement: "91.2%",
      icon: "school",
    },
    {
      year: "2025",
      title: "B.Tech, CSE",
      institution: "Madhav Institute of Technology and Science",
      achievement: "CGPA 8.94/10",
      icon: "university",
    },
  ];

  const [currentSection, setCurrentSection] = useState(sectionNames[0].label);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      let found = sectionNames[0].label;
      for (const section of sectionNames) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            found = section.label;
            break;
          }
        }
      }
      setCurrentSection(found);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pl-0 md:pl-16">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#1F51FF]">
          AKHIL JAIN PORTFOLIO
        </div>
        <button className="text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* Vertical Skills Tab */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-[#1F51FF] text-white py-6 px-2 rounded-r-md z-10">
        <div className="writing-vertical text-xs font-medium tracking-wider">
          {currentSection}
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="container mx-auto py-20 px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <p className="text-lg mb-2 font-light tracking-wide text-gray-300">
              👋 Hi, I'm{" "}
              <span className="font-semibold text-white">Akhil Jain</span>
            </p>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-[#1F51FF] bg-clip-text text-transparent leading-tight">
              A MACHINE LEARNING AND .NET CORE DEVELOPER
            </h1>
            <p className="text-gray-300 mb-8 text-lg font-light leading-relaxed tracking-wide">
              I love bringing ideas to life — blending my .NET Core skills with
              a love for data and machine learning to create things that work
              <span className="text-[#1F51FF] font-medium"> smarter</span>.
            </p>
            <Button
              className="bg-[#1F51FF] hover:bg-[#1F51FF]/80 text-white"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1U5FkNkXp8FrYdWyYwdlLXc6upITF9OrC/view?usp=sharing",
                  "_blank",
                )
              }
            >
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </motion.div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#1F51FF] relative z-10">
              <img
                src="https://i.postimg.cc/pT2Zv7kZ/Picsart-25-06-10-18-47-58-617-removebg-preview.png"
                alt="Akhil Jain"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border-2 border-[#1F51FF] z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="bg-black/30 py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="text-2xl font-black mb-2 tracking-widest text-[#1F51FF] uppercase">
              ABOUT ME
            </h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
              .NET Core Developer & Machine Learning and Data Science Enthusiast
            </h3>
            <p className="text-gray-300 max-w-3xl text-lg font-light leading-relaxed tracking-wide">
              I'm a{" "}
              <span className="text-white font-medium">
                passionate developer
              </span>{" "}
              who loves turning ideas into intelligent, user-friendly
              applications. With expertise in{" "}
              <span className="text-[#1F51FF] font-medium">
                .NET Core, machine learning, and data science
              </span>
              , I craft solutions that are not only functional but also
              data-driven and future-ready. From building scalable backends to
              integrating smart AI models, my goal is to create technology that{" "}
              <span className="text-white font-medium">makes a difference</span>
              .
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-[#1F51FF]/20 hover:border-[#1F51FF]/40 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <p className="text-5xl font-black text-[#1F51FF] tracking-tight mb-2">
                      5+
                    </p>
                    <p className="text-sm text-gray-300 font-light tracking-wide leading-relaxed">
                      Academic & Personal Projects Completed
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-[#1F51FF]/20 hover:border-[#1F51FF]/40 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <p className="text-5xl font-black text-[#1F51FF] tracking-tight mb-2">
                      3+
                    </p>
                    <p className="text-sm text-gray-300 font-light tracking-wide leading-relaxed">
                      Certifications in ML & Data Science
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-[#1F51FF]/20 hover:border-[#1F51FF]/40 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <p className="text-5xl font-black text-[#1F51FF] tracking-tight mb-2">
                      500+
                    </p>
                    <p className="text-sm text-gray-300 font-light tracking-wide leading-relaxed">
                      Hours of Hands-On Coding Practice
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-[#1F51FF]/20 hover:border-[#1F51FF]/40 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <p className="text-5xl font-black text-[#1F51FF] tracking-tight mb-2">
                      2
                    </p>
                    <p className="text-sm text-gray-300 font-light tracking-wide leading-relaxed">
                      Hackathons Participated
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-black mb-2 tracking-widest text-[#1F51FF] uppercase">
              MY SKILLS
            </h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight tracking-wide">
              LET'S EXPLORE MY CORE SKILLS AND LEARNING JOURNEY
            </h3>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
              {skills.map((skill, index) => {
                // Define different sizes for collage effect - all uniform to avoid blank spaces
                const sizes = [
                  "col-span-1 row-span-1", // .NET Core Development
                  "col-span-1 row-span-1", // Data Science & Analytics
                  "col-span-1 row-span-1", // Machine Learning
                  "col-span-1 row-span-1", // SQL & Database Management
                  "col-span-1 row-span-1", // API Development
                  "col-span-1 row-span-1", // Python
                  "col-span-1 row-span-1", // C++
                  "col-span-1 row-span-1", // Azure DevOps
                ];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`${sizes[index % sizes.length]} min-h-[100px]`}
                  >
                    <div className="h-full">
                      <SkillBar
                        skillName={skill.name}
                        percentage={skill.percentage}
                        icon={
                          <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            className="w-12 h-12 rounded object-cover"
                          />
                        }
                        delay={index * 100}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-black/30 py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-black mb-2 tracking-widest text-[#1F51FF] uppercase">
              PORTFOLIO
            </h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight tracking-wide">
              FEATURED PROJECTS
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.slice(0, 5).map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: project.id * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.image}
                  learnMoreUrl = {project.learnMoreUrl}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-[#1F51FF] hover:bg-[#1F51FF]/80 text-white"
              onClick={() =>
                window.open("https://github.com/AkhilJain5", "_blank")
              }
            >
              View More Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="text-2xl font-black mb-2 tracking-widest text-[#1F51FF] uppercase">
              EDUCATION
            </h2>
            <p className="text-gray-300 max-w-3xl text-lg font-light leading-relaxed tracking-wide">
              My academic journey began at{" "}
              <span className="text-white font-medium">
                Miss Hill School (CBSE Board)
              </span>
              , where I scored{" "}
              <span className="text-[#1F51FF] font-semibold">86.8%</span> in my
              10th grade. Building on this foundation, I continued at the same
              school for my 12th grade, achieving{" "}
              <span className="text-[#1F51FF] font-semibold">91.2%</span>.
              Driven by a passion for technology, I pursued my{" "}
              <span className="text-white font-medium">
                B.Tech in Computer Science and Engineering
              </span>{" "}
              at Madhav Institute of Technology and Science, graduating with a{" "}
              <span className="text-[#1F51FF] font-semibold">
                CGPA of 8.94/10
              </span>
              .
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <EducationTimeline educationData={educationData} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-black/30 py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-black mb-2 tracking-widest text-[#1F51FF] uppercase">
              CONTACT
            </h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight tracking-wide">
              GET IN TOUCH
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg font-light leading-relaxed tracking-wide">
              Have a project in mind or want to discuss potential
              collaborations? I'm always open to{" "}
              <span className="text-[#1F51FF] font-medium">
                new opportunities
              </span>{" "}
              and challenges.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/3 space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="w-full border-[#1F51FF] text-[#1F51FF] hover:text-white hover:bg-[#1F51FF]/10"
                  onClick={() => window.open("tel:+918962860720")}
                >
                  <Phone className="mr-2 h-4 w-4" /> Call
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#1F51FF] text-[#1F51FF] hover:text-white hover:bg-[#1F51FF]/10"
                  onClick={() => window.open("mailto:jainakhil505@email.com")}
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
              </div>
              <Card className="bg-zinc-900 border-none p-6">
                <h4 className="text-xl font-black mb-4 text-white tracking-wide">
                  Let's Connect
                </h4>
                <p className="text-gray-300 mb-6 font-light leading-relaxed tracking-wide">
                  Feel free to reach out for{" "}
                  <span className="text-[#1F51FF] font-medium">
                    collaborations
                  </span>
                  , job opportunities, or just to say hello! I'm always
                  interested in{" "}
                  <span className="text-white font-medium">
                    new projects and connections
                  </span>
                  .
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/AkhilJain5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#1F51FF]"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/akhil-jain-61107122a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#1F51FF]"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </Card>
            </div>
            <div className="md:w-2/3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-black mb-2 tracking-wide text-white">
                STAY UP TO DATE WITH{" "}
                <span className="text-[#1F51FF]">AKHIL'S</span> NEWSLETTER
              </h4>
              <p className="text-gray-300 font-light tracking-wide">
                Get the latest updates on{" "}
                <span className="text-white font-medium">
                  projects and tech insights
                </span>
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-zinc-800 border-none rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1F51FF] w-full md:w-64"
              />
              <Button className="bg-[#1F51FF] hover:bg-[#1F51FF]/80 text-white rounded-l-none">
                Subscribe Now
              </Button>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Akhil Jain Portfolio. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1F51FF]"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1F51FF]"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Decorative Elements */}
      <div className="fixed right-0 bottom-0 w-32 h-32 text-[#1F51FF]/20 z-0">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0l3.09 6.32L22 7.24l-5 4.87L18.18 19 12 15.4 5.82 19 7 12.11l-5-4.87 6.91-.92L12 0z" />
        </svg> */}
        <div className="fixed right-0 bottom-0 w-32 h-32 z-0 flex items-end justify-end p-4">
          <img
            src="https://i.postimg.cc/fLs2QWRP/image-1.png" 
            alt="Logo"
            className="w-24 h-24 object-contain opacity-20"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-64 bg-zinc-900 bg-opacity-80 shadow-lg z-50 flex flex-col">
            <button
              className="self-end m-4 text-white text-2xl"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
            <nav className="flex flex-col mt-8">
              {sectionNames.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-white text-lg py-3 px-6 hover:bg-[#1F51FF] transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
