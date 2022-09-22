import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </RecoilRoot>
  );
}

export default MyApp;
