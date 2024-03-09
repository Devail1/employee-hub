const extractPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts.pop();
  return fileName.split(".")[0];
};

module.exports = extractPublicIdFromUrl;
