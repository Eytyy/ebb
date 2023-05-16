let t: ReturnType<typeof setInterval> | null = null;

function startTimer() {
  let count = 0;

  t = setInterval(() => {
    count++;
    postMessage(count);
  }, 1000);
}

function stopTimer() {
  if (t) {
    clearInterval(t);
  }
}

onmessage = (e: { data: { action: string } }) => {
  console.log("received a message");
  if (e.data.action === "start") {
    console.log("start timer");
    startTimer();
  } else {
    console.log("stop timer");
    stopTimer();
  }
};
