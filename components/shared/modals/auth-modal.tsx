"use client";

import { useContext } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthModalContext from "@/context/auth-modal-context";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { registerWithEmailMagicLinkAction } from "@/actions/auth";
import { supabaseClient } from "@/lib/supabase/client";

const AuthModal = () => {
  const { isAuthModalOpen, toggleAuthModal } = useContext(AuthModalContext);

  const formSchema = z.object({
    email: z
      .string()
      .email()
      .min(5, { message: "Job title must be at least 2 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await registerWithEmailMagicLinkAction(values);
    if (response && response.error) {
      console.log("error while signin: ", response.error);
      alert(response.error);
    }
  }

  async function githubAuth() {}

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={toggleAuthModal}>
      <DialogContent className="bg-black border-neutral-500">
        <DialogHeader className="text-white">
          <DialogTitle>Authenticate</DialogTitle>
        </DialogHeader>

        <Button>GOOGLE</Button>
        <Button onClick={githubAuth}>GITHUB</Button>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>Please enter your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
