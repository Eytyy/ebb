import type { BuiltInProviderType, Provider } from "next-auth/providers";
import ProvidersLogo from "./ProvidersLogo";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import { motion, type Variants } from "framer-motion";
import { useCallback, useState } from "react";
import Submitting from "./timer/submitting";

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

type Props = {
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
};

export default function SignIn({ providers }: Props) {
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async (providerID: string) => {
    if (!providerID) return void 0;

    try {
      setLoading(true);
      const response = await signIn(providerID);
      console.log("loaded");
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Submitting />;
  }

  return (
    <motion.div className="flex gap-4" variants={variants}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => void onClick(provider.id)}
            className="flex items-center gap-2 rounded-lg border-2  p-4"
          >
            <div className="text-2xl">
              <ProvidersLogo provider={provider.name} />
            </div>{" "}
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </motion.div>
  );
}
