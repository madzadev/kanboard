import MetaTags from "../components/MetaTags";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
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
