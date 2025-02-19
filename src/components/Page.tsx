"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  return (
    <ScrollArea className="w-full h-full pr-4 pb-10">
      <div className={cn("w-full h-full flex flex-col gap-12", className)}>
        {children}
      </div>
    </ScrollArea>
  );
};

export default Page;
