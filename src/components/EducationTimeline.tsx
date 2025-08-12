import React from "react";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import { School, GraduationCap, Award } from "lucide-react";

interface EducationItem {
  year: string;
  title: string;
  institution: string;
  achievement: string;
  icon: "school" | "graduation" | "award";
}

interface EducationTimelineProps {
  items?: EducationItem[];
}

const EducationTimeline = ({
  items = [
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
      icon: "graduation",
    },
  ],
  educationData,
}: EducationTimelineProps & { educationData?: EducationItem[] }) => {
  const educationItems = educationData || items;
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "school":
        return <School className="h-6 w-6 text-[#1F51FF]" />;
      case "graduation":
      case "university":
        return <GraduationCap className="h-6 w-6 text-[#1F51FF]" />;
      case "award":
        return <Award className="h-6 w-6 text-[#1F51FF]" />;
      default:
        return <School className="h-6 w-6 text-[#1F51FF]" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-transparent">
      <div className="relative">
        {/* Timeline vertical line with gradient */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#1F51FF]/60 via-[#1F51FF]/40 to-[#1F51FF]/20 rounded-full"></div>

        {educationItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.3,
              type: "spring",
              stiffness: 100,
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`relative mb-16 ${index % 2 === 0 ? "md:ml-auto md:mr-[52%]" : "md:mr-auto md:ml-[52%]"} md:w-[45%] px-4`}
          >
            {/* Timeline node with glow effect */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                delay: index * 0.3 + 0.2,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
              className="absolute left-1/2 md:left-auto md:right-0 md:translate-x-1/2 -translate-x-1/2 -translate-y-1/3 w-12 h-12 rounded-full bg-[#0f0f0f] border-3 border-[#1F51FF] flex items-center justify-center z-10 shadow-lg shadow-[#1F51FF]/30"
            >
              <div className="absolute inset-0 rounded-full bg-[#1F51FF]/20 animate-pulse"></div>
              {getIcon(item.icon)}
            </motion.div>

            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm hover:border-[#1F51FF]/50 hover:shadow-lg hover:shadow-[#1F51FF]/10 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-3">
                    <motion.span
                      className="text-[#1F51FF] font-black text-2xl group-hover:text-[#1F51FF]/90 transition-colors tracking-tight"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.year}
                    </motion.span>
                    <h3 className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors font-light tracking-wide">
                      {item.institution}
                    </p>
                    <Separator className="my-3 bg-zinc-700 group-hover:bg-[#1F51FF]/30 transition-colors" />
                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Award className="h-4 w-4 text-[#1F51FF]" />
                      <span className="text-sm text-gray-200 font-semibold tracking-wide">
                        {item.achievement}
                      </span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationTimeline;
