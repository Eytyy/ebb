import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import AppProvider from "~/context/app";
import AppLayout from "~/components/layout";

const MyApp: AppType<{ session: Session | null; title: string }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <AnimatePresence mode="wait">
        <AppProvider>
          <AppLayout>
            <Component key={router.asPath} {...pageProps} />
          </AppLayout>
        </AppProvider>
      </AnimatePresence>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
