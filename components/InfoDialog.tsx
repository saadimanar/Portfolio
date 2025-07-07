"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useState } from "react";
import type { Variants } from "framer-motion";

interface InfoDialogProps {
  /** Custom animation delay for the info button */
  animationDelay?: number;
  /** Custom position classes for the button */
  position?: string;
  /** Custom welcome message */
  welcomeMessage?: string;
  /** Custom usage instructions */
  usageInstructions?: string[];
}

export default function InfoDialog({
  animationDelay = 0.4,
  position = "fixed top-6 right-6 z-50",
  welcomeMessage = "I'm so excited to present my brand new AI Portfolio! Whether you're a recruiter, a friend, family member, or just curious, feel free to ask anything you want!",
  usageInstructions = [
    "Got a question? Type it in the chat bar — I’m all ears (well, all code).",
    "Lazy to type? Click one of the quick question buttons — they’re there to save your keyboard!",
    "Ask me anything: projects, skills, experience, or why I think pineapple on pizza is totally fine 🍍🍕",
  ],
}: InfoDialogProps) {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const infoButtonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.6, delay: animationDelay },
    },
  };

  return (
    <motion.div
      className={position}
      variants={infoButtonVariants}
      initial="hidden"
      animate="visible"
    >
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/30 backdrop-blur-lg border-neutral-200 hover:bg-white/50 dark:bg-neutral-800/30 dark:border-neutral-700 dark:hover:bg-neutral-800/50 shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Info className="h-5 w-5" />
            <span className="sr-only">Portfolio information</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Welcome to My AI Portfolio!
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed pt-2">
              {welcomeMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
              Start chatting with me:
            </h4>
            <ul className="text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
              {usageInstructions.map((instruction, index) => (
                <li key={index}>• {instruction}</li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
