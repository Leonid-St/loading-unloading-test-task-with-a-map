export const throttle = (callback: () => void, delay: number = 0) => {
  let inProgress = false;
  return () => {
    if (inProgress) {
      return;
    }
    inProgress = true;
    setTimeout(() => {
      callback();
      inProgress = false;
    }, delay);
  };
};

//https://stackoverflow.com/questions/52867999/javascript-function-throttling