import MetaTags from "../components/MetaTags";
import "../styles/globals.css";

import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <MetaTags />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
