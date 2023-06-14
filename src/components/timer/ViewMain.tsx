import { motion, Variants } from "framer-motion";
import { useApp } from "~/context/app";

type MainViewProps = {
  time: string;
};

export default function ViewMain({ time }: MainViewProps) {
  const {
    state: { pos },
  } = useApp();

  const x = typeof window !== "undefined" ? window.innerWidth / 2 - 256 / 2 : 0;
  const y =
    typeof window !== "undefined" ? window.innerHeight / 2 - 256 / 2 : 0;

  return (
    <>
      <div
        className={`flex h-full flex-col items-center justify-center p-24 text-white`}
      >
        <motion.div
          initial={{
            x: pos?.x ? (pos.x > x ? pos.x - x : (x - pos.x) * -1) : 0,
            y: pos?.y ? (pos.y > y ? pos.y - y : (y - pos.y) * -1) : 0,
            scale: 0.6666666667,
          }}
          animate={{
            x: 0,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              scale: {
                delay: 0.5,
              },
            },
          }}
          exit={{
            scale: 0,
          }}
        >
          <div className="mb-4 h-96 w-96 rounded-full bg-white shadow-lg" />
        </motion.div>
        <motion.div
          className="text-6xl font-bold text-white"
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: "easeInOut",
            },
          }}
        >
          {time}
        </motion.div>
      </div>
    </>
  );
}
