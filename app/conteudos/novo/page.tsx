import CreateContentForm from "@/components/content/forms/create-content-form";

type Props = {};

export default async function CreateContentPage({}: Props) {
  return (
    <section className="">
      <div className="max-w-lg mx-auto bg-neutral-50 dark:bg-neutral-900 py-10 px-6 rounded-md border border-primary/50 shadow-md space-y-8">
        <h2 className="text-center font-semibold">Cadastro de conteúdo </h2>{" "}
        <CreateContentForm />
      </div>
    </section>
  );
}
