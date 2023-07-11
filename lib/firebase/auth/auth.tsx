"use client";

import { Auth, getAuth, UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  AuthProvider,
  useAuth,
  useFirebaseApp,
  useSigninCheck,
  useUser,
} from "reactfire";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";

export function AuthWrapper(props: any) {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  return <AuthProvider sdk={auth}>{props.children}</AuthProvider>;
}

export function AuthGuard(
  props: React.PropsWithChildren<{ fallback: JSX.Element }>
) {
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
    return router.push("/login");
  }
}

export async function SignInWithEmail(email: string, password: string) {
  const auth = useAuth();
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    error = error;
  }
  return { result, error };
}

export async function SignUpWithEmail(email: string, password: string) {
  const auth = useAuth();
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result)
  } catch (error) {
    error = error;
  }

  return { result, error };
}

export async function SignInWithGoogle(auth: Auth) {
  try {
    await signInWithRedirect(auth, new GoogleAuthProvider());
  } catch (error) {
    console.log(error);
  }
}

export async function SignInWithFacebook(auth: Auth) {
  try {
    await signInWithRedirect(auth, new FacebookAuthProvider());
  } catch (error) {
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
