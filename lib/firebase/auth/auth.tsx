"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import { AuthProvider, useFirebaseApp, useSigninCheck } from "reactfire";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,

  getAuth,
  signInWithPopup,
  Auth,



  User,
} from "firebase/auth";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface SignInResult{
  user : User | null
}

export function AuthWrapper(props: any) {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  return <AuthProvider sdk={auth}>{props.children}</AuthProvider>;
}

export function AuthGuard(
  props: React.PropsWithChildren<{ fallback: JSX.Element }>
): any{
  const router = useRouter();

  const pathname = usePathname();
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!props.children) {
    throw new Error("Children must be provided");
  }

  useEffect(() => {
   if (status === "success") {
     if (signInCheckResult?.signedIn === true) {
       const intendedRoute = sessionStorage.getItem("intendedRoute");

       if (intendedRoute) {
         sessionStorage.removeItem("intendedRoute");
        router.push(intendedRoute);
       }
     } else {
       sessionStorage.setItem("intendedRoute", pathname);
      router.push("/login");
     }
   }
  }, [pathname, signInCheckResult, status, router]);


  if (status === "loading") {
    return props.fallback;
  } else if (signInCheckResult?.signedIn === true) {
    return props.children as JSX.Element;
  } else {
    return null
    ;
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

    console.log(result)

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

    console.log(result);
  } catch (error: any) {

    error = error;
  }

  return { result, error };
}

export async function signInWithGoogle(auth: Auth) {
let result, error;
  try {
   result = await signInWithPopup(auth, new GoogleAuthProvider());
console.log(result)
  } catch (error: any) {
    console.log(error);
    error = error

  }

  return {result, error}

}

export async function handleSignInWithGoogle(auth: Auth) {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    console.log(user);

    const res = await fetch("/api/users/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }),
    });

    if (res.ok) {
      console.log(res);

       toast({
         title: "Google Sign In Successful!",
       });
       redirect("/profile");

    } else {
      throw new Error("Failed to create new user");
    }

  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Google SignIn Failed!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code>{JSON.stringify(error.code, null, 2)}</code>
        </pre>
      ),
    });
    console.log(error);
  }
}


export async function handleSignInWithFacebook(auth: Auth) {
  try {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    const {user}  =
      await signInWithPopup(auth, provider);
    console.log(user);

    const res = await fetch("/api/users/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }),
    });

    if (res.ok) {
console.log(res);

    } else {
      throw new Error("Failed to create new user");
    }
     toast({
       title: "Facebook Sign In Successful!",
     });
   

  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Facebook SignIn Failed!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code>{JSON.stringify(error.code, null, 2)}</code>
        </pre>
      ),
    });
    console.log(error);
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
