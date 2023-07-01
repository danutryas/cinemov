import { AppProps } from "next/app";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "./Layout";
import ModalLayout from "@/lib/hooks/useModal";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ModalLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalLayout>
      </SessionProvider>
    </>
  );
};

export default App;
