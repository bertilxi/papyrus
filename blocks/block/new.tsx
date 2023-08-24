import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "https://esm.sh/@hookform/resolvers@3.3.0/zod";
import { useForm } from "https://esm.sh/react-hook-form@7.45.4?external=react";
import * as z from "https://esm.sh/zod@3.22.2";
import { lazy, useState } from "react";
import { api } from "../api.ts";
import { Layout } from "../components/layout.tsx";
import { Navbar } from "../components/navbar.tsx";
import { Button } from "../components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form.tsx";
import { Input } from "../components/ui/input.tsx";
import { useUser } from "../user.ts";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

const Editor = lazy(() => import("../components/editor.tsx"));

const sample = `export default async function main({ message }: { message: string }) {
  console.log("hello");
  return { message };
}`;

const FormSchema = z.object({
  module: z.custom<string>(
    (v) => {
      const value = v as string;
      return (
        value.endsWith(".ts") ||
        value.endsWith(".tsx") ||
        value.endsWith(".mdx")
      );
    },
    {
      message:
        "The block name should end in a valid extension (.ts, .tsx, .mdx)",
    }
  ),
});

export default function CreateBlockPage() {
  const [source, setSource] = useState(sample);
  const user = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const createBlockMutation = useMutation({
    mutationKey: ["createBlock"],
    mutationFn: api.createBlock,
    onSuccess(result) {
      if (result) {
        //
        if (result) {
          location.href = "/block";
        }
      }
    },
  });

  function onSubmit({ module }: z.infer<typeof FormSchema>) {
    createBlockMutation.mutate({
      author: user.handle,
      module,
      source,
    });
  }

  return (
    <>
      <Navbar />

      <section className="container h-screen py-20 ">
        <div className="text-2xl mb-4">Create new block</div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full gap-4 items-center mb-4"
          >
            <FormField
              control={form.control}
              name="module"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[500px]"
                      placeholder="hello-world.ts"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create</Button>
          </form>
        </Form>

        <div className="h-[70%] pb-10">
          <Editor value={source} onChange={setSource} />
        </div>
      </section>
    </>
  );
}
