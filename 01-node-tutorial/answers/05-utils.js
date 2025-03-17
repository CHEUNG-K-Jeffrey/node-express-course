//@ts-check
/**
 * Makes the program wait at least the duration in milliseconds.
 * Must be used with await to be effective.
 * @param {number} durationInMilliseconds
 * @returns
 */
let sleep = async (durationInMilliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, durationInMilliseconds);
  });
};

export default sleep;
