import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface SkillBarProps {
  skillName: string;
  percentage: number;
  icon?: React.ReactNode;
  delay?: number;
}

const SkillBar = ({
  skillName = "Skill Name",
  percentage = 75,
  icon,
  delay = 0,
}: SkillBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 500 + delay);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <motion.div
      className="w-full h-full mb-6 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 flex flex-col justify-center"
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(31, 81, 255, 0.1)",
        borderColor: "rgba(31, 81, 255, 0.3)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.15,
                rotate: 5,
                filter: "brightness(1.2)",
              }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              {icon}
            </motion.div>
          )}
          <motion.span
            className="text-base font-semibold text-white leading-tight tracking-wide"
            whileHover={{ color: "#1F51FF" }}
            transition={{ duration: 0.2 }}
          >
            {skillName}
          </motion.span>
        </div>
        <motion.span
          className="text-lg font-black text-[#1F51FF] tracking-tight"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {percentage}%
        </motion.span>
      </div>

      <div className="relative">
        <Progress value={progress} className="h-3 bg-zinc-800" />
        <motion.div
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-[#1F51FF]/80 to-[#1F51FF] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: delay / 1000 }}
          whileHover={{
            boxShadow: "0 0 20px rgba(31, 81, 255, 0.8)",
            filter: "brightness(1.2)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;
