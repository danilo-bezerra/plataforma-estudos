import { getContentV2 } from "@/services/getContentV2";

import EditContentForm from "@/components/content/forms/edit-content-form";

type Props = {
  params: { id: string };
};

export default async function EditContentPage({ params }: Props) {
  const data = await getContentV2(params.id);

  if (!data) {
    return null;
  }

  return (
    <section className="">
      <div className="max-w-[450px] mx-auto bg-neutral-50 dark:bg-neutral-900 p-5 rounded-md border border-primary/50 shadow-md">
        <EditContentForm data={data} />
      </div>
    </section>
  );
}
