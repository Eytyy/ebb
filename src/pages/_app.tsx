import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import AppProvider from "~/context/app";
import AppLayout from "~/components/layout";

import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppType & {
  Component: NextPageWithLayout;
  pageProps: { session: Session | null };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const router = useRouter();

  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

  return (
    <SessionProvider session={session}>
      <AnimatePresence mode="wait">
        <AppProvider>
          {getLayout(<Component key={router.asPath} {...pageProps} />)}
        </AppProvider>
      </AnimatePresence>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
