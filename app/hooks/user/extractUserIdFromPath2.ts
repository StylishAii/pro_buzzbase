export const extractUserIdFromPath2 = (path: string) => {
  const pathParts = path.split("/");
  return pathParts[pathParts.length - 2];
};