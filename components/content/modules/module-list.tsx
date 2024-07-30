import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import LessonListItem from "../files/file-list-item";

import { ModuleV3 } from "@/utils/organizer";
import ModuleItem from "./module-item";
import ProgressCard from "../../ui/progress-card";
import { calculateFilesCompletionPercentage } from "@/lib/utils";

type Props = { modules: ModuleV3; contentId: string };

export default function ModuleList({ modules, contentId }: Props) {
  modules.lessons.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "accent",
    })
  );

  return (
    <div className="">
      <Accordion type="multiple" className="w-full ">
        {modules.lessons.length > 0 ? (
          <AccordionItem
            className="p-4 "
            value={`${modules.title}-00`}
            key={`${modules.title}-00`}
          >
            <AccordionTrigger className="" title={modules.title}>
              <div className=" w-full space-y-2">
                <span className="line-clamp-1 px-2 text-sm text-left ">
                  {modules.title}
                </span>

                <ProgressCard
                  value={calculateFilesCompletionPercentage(modules.lessons)}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {modules.lessons.map((lesson, index) => (
                <LessonListItem
                  key={lesson.id}
                  data={lesson}
                  index={index + 10}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {Object.values(modules.modules)
          .sort((a, b) =>
            a.title.localeCompare(b.title, undefined, {
              numeric: true,
              sensitivity: "accent",
            })
          )
          .map((module) => (
            <ModuleItem key={module.title} module={module} />
          ))}
      </Accordion>
    </div>
  );
}
