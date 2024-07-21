"use client";

import { toast } from "sonner";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createContentSchema, updateContentSchema } from "@/schemas/schemas";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type Props = {};

export default function CreateContentForm({}: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createContentSchema>>({
    resolver: zodResolver(updateContentSchema),
    defaultValues: {
      name: "",
      path: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createContentSchema>) {
    try {
      const formData = new FormData();

      const fileInput = document.querySelector("#cover") as any;
      if (fileInput && fileInput.files.length > 0) {
        formData.append("cover", fileInput.files[0]);
      }
      formData.append("name", values.name);
      formData.append("path", values.path);

      await axios.post(`/api/v1/contents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`conteúdo cadastrado com sucesso!`);

      router.push("/conteudos/gestao");
      router.refresh();
    } catch (e: any) {
      let errorMessage = `ocorreu um erro ao cadastrar conteúdo!`;
      if (e instanceof AxiosError) {
        if (e.response?.data.error) {
          errorMessage = `Ocorreu um erro: ${e.response?.data.message}`;
        }
      }
      toast.error(errorMessage);
    }
  }

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="ex: Pasta de trabalho" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Path</FormLabel>
                <FormControl>
                  <Input placeholder="ex: F:\Arquivos\Gravações" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Capa</FormLabel>
            <FormControl className="">
              <Input type="file" name="cover" id="cover" placeholder="" />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button type="submit" disabled={isLoading || !form.formState.isValid}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
