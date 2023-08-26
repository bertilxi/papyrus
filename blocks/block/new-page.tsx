import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "https://esm.sh/@hookform/resolvers@3.3.0/zod";
import { useForm } from "https://esm.sh/react-hook-form@7.45.4?external=react";
import * as z from "https://esm.sh/zod@3.22.2";
import { useState } from "react";
import { api } from "../api.ts";
import { Layout } from "../components/layout.tsx";
import { Navbar } from "../components/navbar.tsx";
import { Button } from "../components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form.tsx";
import { Input } from "../components/ui/input.tsx";
import { useUser } from "../user.ts";

import MDEditor from "https://esm.sh/@uiw/react-md-editor@3.23.5";

export const config = {
  page: true,
  interactive: true,
  layout: Layout,
};

const sample = `# New blog post`;

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
            <div className="flex justify-between">
              <div className="text-2xl mb-4">Create new page</div>
              <Button type="submit">Create</Button>
            </div>
            <FormField
              control={form.control}
              name="module"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="hello-world.mdx" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="h-[95%] pb-10">
          <MDEditor height="100%" value={source} onChange={setSource} />
        </div>
      </section>
    </>
  );
}
