import { AppProps } from "next/app";
import "../styles/globals.css";

import Layout from "./Layout";

import { SessionProvider } from "next-auth/react";


const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>

      <Layout>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Layout>

    </>
  );
};

export default App;
