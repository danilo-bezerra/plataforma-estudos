import CreateContentForm from "@/components/content/forms/create-content-form";

type Props = {};

export default async function CreateContentPage({}: Props) {
  return (
    <section className="">
      <div className="max-w-[450px] mx-auto bg-neutral-50 dark:bg-neutral-900 p-5 rounded-md border border-primary/50 shadow-md">
        <CreateContentForm />
      </div>
    </section>
  );
}
