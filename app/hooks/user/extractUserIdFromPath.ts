export const extractUserIdFromPath = (path: string) => {
  const pathParts = path.split("/");
  return pathParts[pathParts.length - 1];
};