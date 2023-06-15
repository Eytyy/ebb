import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./server/auth";

export const requireAuth =
  (fn: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
