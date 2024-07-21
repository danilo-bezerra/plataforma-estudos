import { ModuleV3 } from "@/utils/organizer";
import { File, FileV2 } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  return new Intl.DateTimeFormat(navigator.language, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...options,
  }).format(date);
};

export function calculateModuleCompletionPercentage(module: ModuleV3): number {
  let totalLessons = 0;
  let completedLessons = 0;

  function countLessons(module: ModuleV3) {
    // Contando as lições do módulo atual
    totalLessons += module.lessons.length;
    completedLessons += module.lessons.filter(
      (lesson) => lesson.isCompleted
    ).length;

    // Contando as lições dos submódulos recursivamente
    Object.values(module.modules).forEach((subModule) => {
      countLessons(subModule);
    });
  }

  countLessons(module);

  if (totalLessons === 0) {
    return 0;
  }

  return (completedLessons / totalLessons) * 100;
}

export function calculateFilesCompletionPercentage(list: FileV2[]): number {
  const totalLessons = list.length;
  const completedLessons = list.filter((f) => f.isCompleted).length;
  const percentage = (completedLessons / totalLessons) * 100;

  return percentage;
}
