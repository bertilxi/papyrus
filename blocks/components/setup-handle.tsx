import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "https://esm.sh/@hookform/resolvers@3.3.0/zod";
import { useForm } from "https://esm.sh/react-hook-form@7.45.4?external=react";
import * as z from "https://esm.sh/zod@3.22.2";
import { useState } from "react";
import { api } from "../api.ts";
import { Button } from "./ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form.tsx";
import { Input } from "./ui/input.tsx";

const formSchema = z.object({
  handle: z.string().nonempty(),
});

export function SetupHandleButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const setHandleMutation = useMutation({
    mutationKey: ["setHandle"],
    mutationFn: api.setHandle,
    onSuccess(result) {
      if (result) {
        queryClient.invalidateQueries({ queryKey: ["me"] });

        setOpen(false);
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const submit = (values: z.infer<typeof formSchema>) => {
    setHandleMutation.mutate(values.handle);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Setup your handle!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setup handle</DialogTitle>
          <DialogDescription>
            Choose a handle carefully, It can NOT be changed
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit) as any}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="handle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="berti" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
