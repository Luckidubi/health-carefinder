"use client"
import { getStorage } from "firebase/storage";
import { StorageProvider, useFirebaseApp } from "reactfire";

export function StorageWrapper(props: any) {
  const app = useFirebaseApp();
  const storage = getStorage(app);
  return <StorageProvider sdk={storage}>{props.children}</StorageProvider>;
}