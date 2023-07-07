"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
    .max(50)
    ,
  email: z.string().email({ message: "Invalid email address" }),
  address: z
    .string()
    .min(10, {
      message: "Enter full address",
    })
    .max(100),
});
const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      address: "",
    },
  });

  const {toast} = useToast()

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
     toast({
       title: "Profile saved!"

     });
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
              className="bg-blue-900 text-white hover:bg-blue-500 text-[20px] font-medium leading-10"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
