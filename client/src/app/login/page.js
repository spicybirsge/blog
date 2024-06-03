'use client'
import { loggedIn, loaded } from "@/store";
import { useEffect } from "react";
import { authenticate } from "@/functions/authenticate";
import { useRouter } from "next/navigation";
import LoadingComponent from "../../components/LoadingComponent"

export default function Page () {
    const router = useRouter()
    const isLoaded = loaded((state) => state.loaded);
    const isLoggedIn = loggedIn((state) => state.loggedIn);
    
    
    useEffect(() => {
        if (!isLoaded) {
          authenticate();
        }
       
      }, []);
    
      if (!isLoaded) {
        return <LoadingComponent  />
      }
      if(isLoaded && isLoggedIn) {
        return router.push('/dashboard', { scroll: false })
      }

    
    return <></>
}