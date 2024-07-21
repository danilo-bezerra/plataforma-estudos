"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { VscSearch } from "react-icons/vsc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  text: z.string().max(100, "Digite no máximo 100 caracteres"),
});

type Props = {
  onSearch: (text: string) => void; // Define a função de callback para busca
};

export default function SearchContents({ onSearch }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.text.length < 1) {
      onSearch("");
    } else {
      onSearch(values.text);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-4 items-center relative"
        >
          <div className="flex space-x-2  items-center w-[300px]  ">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Digite para pesquisar..."
                      className=""
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        onSearch(e.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              size="icon-xs"
              type="submit"
              className="absolute right-0 top-0 bottom-0 h-full aspect-square"
              disabled={
                form.formState.isLoading ||
                form.formState.isSubmitting ||
                !form.formState.isValid
              }
            >
              <VscSearch size={16} />
            </Button>
          </div>
        </form>
      </Form>
      {form.getValues()["text"] ? (
        <Button
          variant="link"
          onClick={() => {
            form.reset();
            onSearch("");
          }}
        >
          Limpar pesquisa
        </Button>
      ) : null}
    </>
  );
}
