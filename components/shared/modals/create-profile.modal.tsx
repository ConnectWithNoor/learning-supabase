"use client";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuid } from "uuid";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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

import CreateProfileContext from "@/context/create-profile-context";
import { Button } from "@/components/ui/button";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const CreateProfileModal = () => {
  const {
    closeCreateProfileModal,
    isCreateProfileModalOpen,
    toggleCreateProfileModal,
  } = useContext(CreateProfileContext);

  const router = useRouter();

  const formSchema = z.object({
    image: z
      .instanceof(FileList)
      .refine((file) => file?.length == 1, "Image is required"),
    jobtitle: z
      .string()
      .min(2, { message: "Job title must be at least 2 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobtitle: "",
    },
  });

  const imageRef = form.register("image");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const uniqueId = uuid();

    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    try {
      const image = values.image?.[0];
      const jobTitle = values.jobtitle;

      if (!image || !jobTitle) return;
      if (!session?.user?.id) return;

      const { data, error } = await supabaseClient.storage
        .from("images")
        .upload(`user-${session.user.id}-${uniqueId}`, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
      // if all goes well, update the user profile image in the database

      const { error: updateUserProfileError } = await supabaseClient
        .from("users")
        .update({
          logo: data.path,
          job_title: jobTitle,
        })
        .eq("id", session.user.id);

      if (updateUserProfileError) {
        console.error(updateUserProfileError);
        throw new Error(updateUserProfileError.message);
      }

      form.reset();
      router.refresh();
      closeCreateProfileModal(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Dialog
      open={isCreateProfileModalOpen}
      onOpenChange={toggleCreateProfileModal}
    >
      <DialogContent>
        <DialogTitle>Set your profile</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="jobtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job Title" {...field} />
                  </FormControl>
                  <FormDescription>Your Job Title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...imageRef}
                      onChange={(event) => {
                        field.onChange(event.target?.files?.[0] ?? undefined);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Your logo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="outline">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProfileModal;
