"use client";

import { useRouter } from "next/navigation";
import { AuthProvider, useFirebaseApp, useSigninCheck } from "reactfire";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getAuth,
  signInWithPopup,
  Auth,
} from "firebase/auth";
import { toast } from "@/components/ui/use-toast";

export function AuthWrapper(props: any) {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  return <AuthProvider sdk={auth}>{props.children}</AuthProvider>;
}

export function AuthGuard(
  props: React.PropsWithChildren<{ fallback: JSX.Element }>
): JSX.Element | null {
  const router = useRouter();
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!props.children) {
    throw new Error("Children must be provided");
  }

  if (status === "loading") {
    return props.fallback;
  } else if (signInCheckResult?.signedIn === true) {
    return props.children as JSX.Element;
  } else {
    router.push("/login");
    return null;
  }
}

export async function signInWithEmail(
  auth: Auth,
  email: string,
  password: string
) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    toast({
      title: "SignIn Successful!",
    });
  } catch (error: any) {
    error = error;
    toast({
      variant: "destructive",
      title: "SignIn Failed!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code>{JSON.stringify(error.code, null, 2)}</code>
        </pre>
      ),
    });
  }
  return { result, error };
}

export async function signUpWithEmail(
  auth: Auth,
  email: string,
  password: string
) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if (result) {
      toast({
        title: "Sign Up Successful!",
        description: "Your account has been created.",
      });
    }
    console.log(result);
  } catch (error: any) {
    toast({
      title: "Sign Up Failed!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code>{JSON.stringify(error.code, null, 2)}</code>
        </pre>
      ),
      variant: "destructive",
    });
    error = error;
  }

  return { result, error };
}

export async function signInWithGoogle(auth: Auth) {
  try {
    const { result } = await signInWithRedirect(auth, new GoogleAuthProvider());
    if (result) {
      console.log(result);
    }
  } catch (error: any) {
    console.log(error);
    toast({
      variant: "destructive",
      title: "Google Sign-In Failed!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code>{JSON.stringify(error.code, null, 2)}</code>
        </pre>
      ),
    });
  }
}

export async function signInWithFacebook(auth: Auth) {
  try {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    const { user } = await signInWithPopup(auth, provider);
    if (user) {
    }
  } catch (error: any) {
    console.log(error);
    toast({
      title: "Facebook Sign-In Failed!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code>{JSON.stringify(error.code, null, 2)}</code>
        </pre>
      ),
      variant: "destructive",
    });
  }
}

export function SignOut(auth: Auth) {
  return auth
    .signOut()
    .then(() => {
      // Sign-out successful
      console.log("Sign out successful");
    })
    .catch((error) => {
      // An error happened
      console.log(error);
    });
}
