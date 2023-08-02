"use client";
import { useUser } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

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
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageUploadButton from "./ImageUploadButton";

interface UserFormProps {
  id: string;
}

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
  role: z
    .string()
    .min(4, {
      message: "role must not be less than 4 characters",
    })
    .max(5),
  photo: z.string(),
});
const UserForm: React.FC<UserFormProps> = ({id}) => {
  const { user: profile, isLoading }: any = useUser(id || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: profile?.username || "",
      email: profile?.email || "",
      address: profile?.address || "",
      role: profile?.role || "",
      photo: profile?.photo || "",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    form.setValue("fullname", profile?.username || "");
    form.setValue("email", profile?.email || "");
    form.setValue("address", profile?.address || "");
    form.setValue("role", profile?.role || "");
    form.setValue("photo", profile?.photo || "");
  }, [profile, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    updateProfile(values);
  }
  const handleImageUpload = (imageUrl: string) => {
    form.setValue("photo", imageUrl); // Set the image URL in the form data
  };

  const updateProfile = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/users/${id.toString()}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: "User Profile updated successfully!",
        });
      } else {
        throw new Error("Failed to update user profile");
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select User role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select User Role</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <ImageUploadButton onImageURL={handleImageUpload} />
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
              {form.formState.isSubmitting ? "Saving" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UserForm;
