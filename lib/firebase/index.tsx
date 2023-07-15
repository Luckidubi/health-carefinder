'use client'
import { FirebaseAppProvider } from "reactfire";
import { AuthWrapper } from "./auth/auth";
import { firebaseConfig } from "./config";
import DatabaseWrapper from "./firestore/firestore";

export default function FirebaseAppWrapper(props: React.PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AuthWrapper>
        {props.children}
      </AuthWrapper>
    </FirebaseAppProvider>
  );
}
