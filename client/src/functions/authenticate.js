import vars from "../variables/vars";

import { useAtom } from "jotai";
import {loaded, authenticated} from "../store";
export default function Authenticate(){
const BACKEND_URL = vars.BACKEND_URL;
const [isLoaded, setIsLoaded] = useAtom(loaded);
const [isAuthenticated, setIsAuthenticated] = useAtom(authenticated);

const token = window.localStorage.getItem("token");
if(!token) {
    setIsAuthenticated(false)
    setIsLoaded(true);

}

const fetchandAuthenticate = async() => {
    const URL = vars.BACKEND_URL+"/api/v1/read/is-authenticated";
const request = await fetch(URL, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
})

const response = await request.json()
if(response.success) {
    setIsAuthenticated(true);
    setIsLoaded(true);
    return
} else {
    setIsAuthenticated(false);
    setIsLoaded(true)   
    return;
}
}

fetchandAuthenticate()
}