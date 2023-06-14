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

// crop title to 12 characters to fit ios home screen guidelines
export const getShortTitle = (title: string) => {
  return title.length > 12 ? `${title.slice(0, 12)}...` : title;
};

export const calculateDuration = (start: Date, end: Date) => {
  const diffInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = Math.floor(diffInSeconds % 60);

  const hs = `${hours}`.padStart(2, "0");
  const ms = `${minutes}`.padStart(2, "0");
  const ss = `${seconds}`.padStart(2, "0");

  return `${hs}:${ms}:${ss}`;
};
