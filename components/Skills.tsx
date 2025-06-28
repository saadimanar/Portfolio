"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Code, Cpu, Users, Sparkles } from "lucide-react";

const Skills = () => {
  const skillsData = [
    {
      category: "Frontend Development",
      icon: <Code className="h-6 w-6" />,
      skills: [
        "HTML",
        "CSS",
        "JavaScript/TypeScript",
        "Tailwind CSS",
        "Next.js",
        "React",
        "Vercel AI SDK",
      ],
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-600",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    },
    {
      category: "Backend & Systems",
      icon: <Cpu className="h-6 w-6" />,
      skills: ["C", "C++", "Python", "Git", "GitHub"],
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-600",
      badgeColor:
        "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    },
    {
      category: "Soft Skills",
      icon: <Users className="h-6 w-6" />,
      skills: [
        "Communication",
        "Problem-Solving",
        "Adaptability",
        "Learning Agility",
        "Teamwork",
        "Creativity",
        "Focus",
      ],
      gradient: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-600",
      badgeColor:
        "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and professional
          capabilities
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((section, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <CardHeader className="relative pb-6">
                <CardTitle className="flex items-center gap-4 text-2xl font-bold">
                  <motion.div
                    className={`p-3 rounded-xl bg-background border-2 ${section.iconColor} group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    {section.icon}
                  </motion.div>
                  <span className="text-foreground group-hover:text-primary transition-colors duration-300">
                    {section.category}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {section.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      variants={badgeVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Badge
                        className={`
                          px-4 py-2 text-sm font-medium border-2 cursor-pointer
                          transition-all duration-200 shadow-sm hover:shadow-md
                          ${section.badgeColor}
                        `}
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
