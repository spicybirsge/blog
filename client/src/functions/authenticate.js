// authenticate.js
import vars from "@/variables/vars";
import { loggedIn, loaded } from "@/store";

export const authenticate = async () => {
   
  const token = window.localStorage.getItem("token");
  const BACKEND_URL = vars.BACKEND_URL;

  if (!token) {
    setUnauthenticated();
    setCompleted();
    return;
  }

  const URL = BACKEND_URL + "/api/v1/read/is-authenticated";
  const request = await fetch(URL, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + token
    }
  });
  const response = await request.json();

  if (response.success) {
    loggedIn.setState({ loggedIn: true });
    loaded.setState({ loaded: true });
  } else {
    loggedIn.setState({ loggedIn: false });
    loaded.setState({ loaded: true });
  }
};