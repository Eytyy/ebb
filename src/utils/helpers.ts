export const getFormatedTime = (time: number) => {
  function format(v: number) {
    return v < 10 ? `0${v}` : v;
  }
  const hours = Math.floor(time / 3600);
  const totalSec = time % 3600;
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  return hours === 0
    ? minutes === 0
      ? seconds === 0
        ? `0`
        : `${format(seconds)}`
      : `${format(minutes)}:${format(seconds)}`
    : `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

export const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/track":
      return "Timer";
    default:
      return "welcome";
  }
};

// function calculateDuration(log: TimeLog & { mood: Mood }) {
//   const diff = Math.abs(
//     new Date(log.end).getTime() - new Date(log.start).getTime()
//   );
//   const hours = Math.floor(diff / (1000 * 60 * 60))
//     .toString()
//     .padStart(2, "0");
//   const minutes = Math.floor((diff / (1000 * 60)) % 60)
//     .toString()
//     .padStart(2, "0");
//   const seconds = Math.floor((diff / 1000) % 60)
//     .toString()
//     .padStart(2, "0");

//   return {
//     ...log,
//     duration: `${hours}:${minutes}:${seconds}`,
//   };
// }
