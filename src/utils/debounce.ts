export const useDebounce = (f: Function, ms: number): () => void => {
  let timer;
  return () => {
    if(timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      await f();
    }, ms)
  }
}