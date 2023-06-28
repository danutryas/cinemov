import { NextPage } from "next";
import Head from "next/head";

import { signIn, signOut, useSession, getSession } from "next-auth/react";

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

const Index: NextPage = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>cinemov</title>
        <meta name="description" content="Generated by Create Next Stack." />
      </Head>

      {session ? (
        <div onClick={() => signOut()}>
          <p>Logout</p>
        </div>
      ) : (
        <div onClick={() => signIn()}>
          <p>Login</p>
        </div>
      )}
      {/* <LandingPageTemplate /> */}
    </>
  );
};

export default Index;
