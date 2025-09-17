export const getImageKey = (url: string): string => {
  const afterF = url.split("/f/")[1];
  if (afterF) return afterF.split("?")[0];

  const afterA = url.split("/a/")[1];
  if (afterA) return afterA.split("?")[0];

  const last = url.split("/").pop() ?? "";
  return last.split("?")[0];
};
