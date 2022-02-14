const fs = require("fs");
const getAllUrls = (path) => {
  const filenames = fs.readdirSync(path);
  return filenames;
};
module.exports = getAllUrls;
