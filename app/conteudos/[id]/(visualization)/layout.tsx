import NothingFound from "@/components/nothing-found";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getContentV2 } from "@/services/getContentV2";
import { organizeLessonsV2 } from "@/utils/organizer";

import ContentPercentage from "@/components/content/content-percentage";
import ModuleList from "@/components/content/modules/module-list";

export default async function VisualizationLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const content = await getContentV2(params.id, true);

  if (!content) {
    return null;
  }

  const organized = organizeLessonsV2("root", content.files);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-10 gap-2  flex-1">
      <div className="w-full lg:col-span-7 space-y-4  bg-white dark:bg-neutral-900 rounded-md  h-screen max-h-[90vh] overflow-scroll  border border-primary/20">
        {children}
      </div>

      <div className="lg:col-span-3 overflow-y-scroll max-h-[90vh] py-4 bg-white   rounded-md  dark:bg-neutral-900 border border-primary/20">
        <Link
          href={`/conteudos/${params.id}`}
          className="block px-4 border-b pb-4 space-y-2"
        >
          <h2>{content.name}</h2>
          <ContentPercentage id={content.id} />
        </Link>

        <ModuleList modules={organized} contentId={params.id} />
      </div>
    </div>
  );
}
