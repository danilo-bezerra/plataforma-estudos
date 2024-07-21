"use client";

import { useRef, useState } from "react";

import { toast } from "sonner";
import { object, z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Content, FileV2 } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  updateContentSchema,
  updateContentSchemaForm,
} from "@/schemas/schemas";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

type Props = {
  data: Content;
};

export default function EditContentForm({ data }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateContentSchemaForm>>({
    resolver: zodResolver(updateContentSchemaForm),
    defaultValues: {
      name: data.name,
      path: data.path,
      isCompleted: data.isCompleted,
      isFavorite: data.isFavorite,
    },
  });

  async function onSubmit(values: z.infer<typeof updateContentSchemaForm>) {
    try {
      const formData = new FormData();

      const fileInput = document.querySelector("#cover") as any;
      if (fileInput && fileInput.files.length > 0) {
        console.log("tem arquivo");
        formData.append("cover", fileInput.files[0]);
        formData.append("teste", "oi");
      }
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value == "string") {
          formData.append(key, value);
        }

        if (typeof value == "boolean") {
          formData.append(key, String(value));
        }
      });

      formData.append("cover2", fileInput.files[0]);

      console.log(Object.entries(formData));

      await axios.put(`/api/v1/contents/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(`conteúdo atualizado com sucesso!`);

      router.push("/conteudos/gestao");
      router.refresh();
    } catch {
      toast.error(`ocorreu um erro ao atualizar conteúdo!`);
    }
    console.log(values);
  }

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

          <FormField
            control={form.control}
            name="isCompleted"
            render={({ field }) => (
              <FormItem className="space-x-2 flex items-end">
                <FormLabel>Finalizado: </FormLabel>
                <FormControl className="">
                  <Switch
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFavorite"
            render={({ field }) => (
              <FormItem className="space-x-2 flex items-end">
                <FormLabel>Favorito: </FormLabel>
                <FormControl className="">
                  <Switch
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Capa</FormLabel>
            <FormControl>
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
