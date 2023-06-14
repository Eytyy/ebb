import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import AppProvider from "~/context/app";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null; title: string }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <AnimatePresence mode="wait">
        <AppProvider>
          <div className={inter.className}>
            <Component key={router.asPath} {...pageProps} />
          </div>
        </AppProvider>
      </AnimatePresence>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
