import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user] = useAuthState(auth);

  if (!user) {
    return <Login />;
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
