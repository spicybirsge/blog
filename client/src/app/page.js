'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect } from "react";
import { authenticate } from "@/functions/authenticate";

export default function Home() {
  const isLoaded = loaded((state) => state.loaded);
  const isLoggedIn = loggedIn((state) => state.loggedIn);
 

  useEffect(() => {
    if (!isLoaded) {
      authenticate();
    }
  }, []);

  if (!isLoaded) {
    return <p>Loading</p>
  }

  return <>{isLoggedIn ? <h1>Hi logged in user</h1> : <h1>Hi unlogged in user</h1>}</>;
}