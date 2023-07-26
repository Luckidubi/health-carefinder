"use client";
import { useUser } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useSigninCheck } from "reactfire";
import * as z from "zod";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  fullname: z
    .string()
    .min(6, {
      message: "Name must not be less than 6 characters",
    })
    .max(50),
  email: z.string().email({ message: "Invalid email address" }),
  address: z
    .string()
    .min(10, {
      message: "Enter full address",
    })
    .max(100),
});
const ProfileForm = () => {
  const { data: signinResult } = useSigninCheck();
  const user = signinResult?.user;
  const { user: profile, isLoading }: any = useUser(user?.uid || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: profile?.username || "",
      email: profile?.email || "",
      address: profile?.address || "",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    form.setValue("fullname", profile?.username || "");
    form.setValue("email", profile?.email || "");
    form.setValue("address", profile?.address || "");
  }, [profile, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    updateProfile(values);
    
  }

  const updateProfile = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/users/${user?.uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: "Profile updated successfully!",
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed to update profile",
        description: error.message || "Something went wrong.",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@yourmail.com" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Main Street, Anytown, Nigeria"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-center">
            <Button
              className="bg-blue-900 text-white hover:bg-blue-500 text-[20px] font-medium leading-10 w-[50%] tracking-wider"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
             {form.formState.isSubmitting ? 'Saving': 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
