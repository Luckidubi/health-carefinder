"use client";
import {
  handleSignInWithFacebook,
  handleSignInWithGoogle,
  signInWithEmail,
} from "@/lib/firebase/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "reactfire";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),

  password: z.string().min(6, {
    message: "Password must not be less than 6 characters",
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",

      password: "",
    },
  });

  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();

  async function handleGoogleSignIn() {
    try {
      await handleSignInWithGoogle(auth);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFacebookSignIn() {
    try {
      await handleSignInWithFacebook(auth);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, password } = values;

      const { result } = await signInWithEmail(auth, email, password);
      if (result) {
        console.log(result);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-8 max-w-[543px] max-h-[779px] bg-zinc-100 rounded-2xl overflow-hidden shadow-md shadow-slate-200 p-6 z-10"
        >
          <header className="text-center">
            <h3 className="text-[20px] md:text-[30px] pb-3 text-black font-bold leading-5 md:leading-10">
              Welcome Back
            </h3>

            <p className="text-black text-[15px] md-text-[18px] font-medium leading-9">
              Login using correct details!
            </p>
          </header>

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
          <div className="flex flex-col flex-center gap-4 pt-2">
            <Button
              className="bg-blue-900 text-white hover:bg-blue-500 text-[20px] font-medium leading-10 w-[50%] "
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging In..." : "Login"}
            </Button>
            <div className="text-center space-y-1 md:space-y-2">
              <p className="text-black font-bold leading-4 md:leading:9">OR</p>
              <p>Login using</p>
              <div className="flex flex-between py-4">
                <Image
                  src="/google.svg"
                  alt="Google icon"
                  width={24}
                  height={24}
                  className="hover:cursor-pointer"
                  onClick={handleGoogleSignIn}
                />
                <Image
                  src="/facebook.svg"
                  alt="Facebook icon"
                  width={24}
                  height={24}
                  className="hover:cursor-pointer"
                  onClick={handleFacebookSignIn}
                />
              </div>
            </div>
            <p>
              Don&#39;t have an account?
              <Link
                className="italic text-blue-900 pl-1 hover:underline font-medium leading-loose"
                href="/signup"
              >
                Signup!
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
