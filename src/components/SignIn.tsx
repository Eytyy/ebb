import type { BuiltInProviderType, Provider } from "next-auth/providers";
import ProvidersLogo from "./ProvidersLogo";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import { motion, type Variants } from "framer-motion";
import { useCallback } from "react";

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
  onSignIn: () => void;
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
};

export default function SignIn({ providers, onSignIn }: Props) {
  const handleSignIn = useCallback(
    (providerId: string) => {
      void signIn(providerId);
      onSignIn();
    },
    [onSignIn]
  );
  return (
    <motion.div className="flex gap-4" variants={variants}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => handleSignIn(provider.id)}
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
