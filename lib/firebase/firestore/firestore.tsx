'use client'
import { getDatabase } from "firebase/database";
import { DatabaseProvider, useFirebaseApp } from "reactfire";


export default function DatabaseWrapper(props: any){
  const app = useFirebaseApp()
   const database = getDatabase(app);
   return <DatabaseProvider sdk={database}>{props.children}</DatabaseProvider>
}