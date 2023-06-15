import type { Provider } from "next-auth/providers";
import ProvidersLogo from "./ProvidersLogo";
import { signIn } from "next-auth/react";
import { motion, type Variants } from "framer-motion";

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

export default function SignIn({ providers }: { providers: Provider[] }) {
  return (
    <motion.div className="flex gap-4" variants={variants}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => void signIn(provider.id)}
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