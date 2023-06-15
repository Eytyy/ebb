export const getScreenCenter = () => {
  const isBrowser = typeof window !== "undefined";
  const x = isBrowser ? window.innerWidth / 2 - 256 / 2 : 0;
  const y = isBrowser ? window.innerHeight / 2 - 256 / 2 : 0;
  return { x, y };
};
