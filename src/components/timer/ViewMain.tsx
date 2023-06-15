import { motion, Variants } from "framer-motion";
import { useApp } from "~/context/app";
import { getScreenCenter } from "~/utils/dom";

type MainViewProps = {
  time: string;
  openDistraction: () => void;
};

export default function ViewMain({ openDistraction }: MainViewProps) {
  const { state } = useApp();
  const { pos } = state;

  const { x, y } = getScreenCenter();

  return (
    <div className={`flex h-full flex-col items-center justify-center p-24`}>
      <motion.button
        role="button"
        whileTap={{
          scale: 1.1,
        }}
        initial={{
          x: pos?.x ? (pos.x > x ? pos.x - x : (x - pos.x) * -1) : 0,
          y: pos?.y ? (pos.y > y ? pos.y - y : (y - pos.y) * -1) : 0,
          scale: 0.6666666667,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: [1, 0.9],
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            scale: {
              duration: 1,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        }}
        onClick={openDistraction}
      >
        <div className="mb-4 h-96 w-96 rounded-full bg-white shadow-lg" />
      </motion.button>
    </div>
  );
}
