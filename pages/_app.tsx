import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "./Layout";
import ModalLayout from "@/lib/hooks/useModal";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ModalLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalLayout>
    </>
  );
};

export default App;
