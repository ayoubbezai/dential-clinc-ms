let isRunning = false;
const queue = [];

export const requestQueue = async (fn) => {
  return new Promise((resolve, reject) => {
    queue.push({ fn, resolve, reject });
    processQueue();
  });
};

const processQueue = async () => {
  if (isRunning || queue.length === 0) return;

  isRunning = true;

  const { fn, resolve, reject } = queue.shift();

  try {
    const result = await fn();
    resolve(result);
  } catch (err) {
    reject(err);
  } finally {
    isRunning = false;
    processQueue(); // Move to next in line
  }
};
