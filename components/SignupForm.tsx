"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "reactfire";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

import {

  handleSignInWithFacebook,
  handleSignInWithGoogle,

 } from "@/lib/firebase/auth/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "Name must not be less than 6 characters",
    })
    .max(50),
  email: z.string().email({
    message: "Invalid email address",
  }),

  password: z.string().min(6, {
    message: "Password must not be less than 6 characters",
  }),
});
const SignupForm = () => {
  const auth = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",

      password: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name, email, password } = values;

      const { result } = await signUpWithEmail(auth, email, password);


      const res = await fetch("/api/users/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: result?.user.uid as string,
          username: name,
          email: email,
          photo: result?.user.photoURL
        }),
      });
      if (res.ok) {
        toast({
          title: "Sign Up Successful!",
          description: "Your account has been created.",
        });
        router.push("/profile");
      } else {
        throw new Error("Failed to create new user");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Sign Up Failed!",
        description: error.message || "Something went wrong.",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[643px] max-h-[879px] bg-zinc-100 rounded-2xl overflow-hidden shadow-md shadow-slate-200 p-6 z-10"
        >
          <header className="text-center">
            <h3 className="text-[25px] md:text-[30px] text-black font-bold leading-10">
              Create An Account
            </h3>
          </header>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@yourmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col flex-center gap-4">
            <Button
              className="bg-blue-900 text-white hover:bg-blue-500 text-[14px] md:text-[20px] font-medium leading-10 w-[50%]"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>
            <div className="text-center space-y-2">
              <p className="text-black font-bold leading-9">OR</p>
              <p>Sign up using</p>
              <div className="flex flex-between py-4">
                <Image
                  src="/google.svg"
                  alt="Google icon"
                  width={24}
                  height={24}
                  className="hover:cursor-pointer"
                  onClick={() => handleSignInWithGoogle(auth)}
                />

                <Image
                  src="/facebook.svg"
                  alt="Facebook icon"
                  width={24}
                  height={24}
                  className="hover:cursor-pointer"
                  onClick={() => handleSignInWithFacebook(auth)}
                />
              </div>
            </div>
            <p>
              Already have an account?{" "}
              <Link
                className="italic text-blue-900 pl-1 hover:underline font-medium leading-loose"
                href="/login"
              >
                Login!
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
