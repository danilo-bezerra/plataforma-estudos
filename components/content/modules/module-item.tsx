import { ModuleV2, ModuleV3 } from "@/utils/organizer";

import { calculateModuleCompletionPercentage } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProgressCard from "@/components/ui/progress-card";
import FileListItem from "../files/file-list-item";

type Props = {
  module: ModuleV3;
};

export default function ModuleItem({ module }: Props) {
  return (
    <AccordionItem
      className="p-4 "
      value={`${module.title}-00`}
      key={`${module.title}-00`}
    >
      <AccordionTrigger className="" title={module.title}>
        <div className=" w-full space-y-2">
          <span className="line-clamp-1 px-2 text-sm text-left ">
            {module.title}
          </span>

          <ProgressCard value={calculateModuleCompletionPercentage(module)} />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {module.lessons
          .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, {
              numeric: true,
              sensitivity: "accent",
            })
          )
          .map((lesson, index) => (
            <FileListItem key={lesson.id} data={lesson} index={index + 1} />
          ))}
        {Object.values(module.modules).map((module) => (
          <ModuleItem key={module.title} module={module} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
