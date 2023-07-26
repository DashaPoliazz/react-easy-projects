import data from "./data.json";

export const fakeResponse = <T>(ms: number) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data as T);
    }, ms);
  });
};
