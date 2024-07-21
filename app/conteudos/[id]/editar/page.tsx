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
      <div className="max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900 py-10 px-6 rounded-md border border-primary/50 shadow-md space-y-8">
        <h2 className="text-center font-semibold">Edição de conteúdo </h2>
        <EditContentForm data={data} />
      </div>
    </section>
  );
}
