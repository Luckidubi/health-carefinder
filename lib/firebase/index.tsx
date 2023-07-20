'use client'
import { FirebaseAppProvider } from "reactfire";
import { AuthWrapper } from "./auth/auth";
import { firebaseConfig } from "./config";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode
}

const DynamicAuthWrapper = dynamic<AuthWrapperProps>(() =>

  import("./auth/auth").then((mod) => mod.AuthWrapper)
);
export default function FirebaseAppWrapper(props: React.PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <DynamicAuthWrapper>
        {props.children}
      </DynamicAuthWrapper>
    </FirebaseAppProvider>
  );
}
