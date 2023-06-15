import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { FaDiscord, FaGoogle } from "react-icons/fa";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => void signIn(provider.id)}
              className="flex items-center gap-2 border-2 border-white p-4"
            >
              <div className="text-2xl">{getProviderLogo(provider.name)}</div>{" "}
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function getProviderLogo(provider: string) {
  switch (provider) {
    case "Discord":
      return <FaDiscord />;
    case "Google":
      return <FaGoogle />;
    default:
      return null;
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
