import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRightIcon } from "lucide-react";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  learnMoreUrl?: string;
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and the technologies used in its development.",
  imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  learnMoreUrl = "https://github.com/yourusername/yourproject",
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden border border-zinc-800 bg-zinc-900 text-white hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
      <div className="overflow-hidden">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-black text-white tracking-wide">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <CardDescription className="text-zinc-300 font-light leading-relaxed tracking-wide">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 group"
          asChild
        >
          <a href={learnMoreUrl}>
            Learn More
            <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
