import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { getProviders, useSession } from "next-auth/react";

import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import FrontDisplay from "~/components/Front";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Front = ({ providers }: Props) => {
  return (
    <>
      <Head>
        <title>Ebb</title>
        <meta
          name="description"
          content="Track your habits, activities and mood, gaining insights into
        your daily rhythm."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FrontDisplay providers={providers} />
    </>
  );
};

export default Front;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
