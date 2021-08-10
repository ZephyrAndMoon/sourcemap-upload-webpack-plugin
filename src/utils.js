const fs = require("fs");
const p = require("path");
const axios = require("axios");
const FormData = require("form-data");
const sourceMapFileIncludes = [/\.map$/];

module.exports = {
  /**
   * Uploading files by axios
   */
  uploadFile: async ({ url, path }) => {
    let data = new FormData();
    data.append("file", fs.createReadStream(path));
    axios({
      url,
      data,
      method: "post",
      headers: { ...data.getHeaders() },
    })
      .then((res) => console.info(JSON.stringify(res.data)))
      .catch((error) => {
        throw error;
      });
  },
  /**
   * Recursive reading of folders
   * retrieve the matching files in the directory
   */
  readDir: (path, regList) => {
    const filesContent = [];

    function readSingleFile(path) {
      const files = fs.readdirSync(path);
      files.forEach((filePath) => {
        const wholeFilePath = p.resolve(path, filePath);
        const fileStat = fs.statSync(wholeFilePath);
        // determine whether it is a directory or a file
        if (fileStat.isDirectory()) {
          readSingleFile(wholeFilePath);
        }
        const _regList = regList || sourceMapFileIncludes;
        if (fileStat.isFile() && _regList.some((r) => r.test(filePath))) {
          filesContent.push(wholeFilePath);
        }
      });
    }
    readSingleFile(path);
    return filesContent;
  },

  /**
   * Delete Folder
   */
  deleteFile: (path) => fs.unlinkSync(path),

  /**
   * Determine the data type
   */
  typeOf: (obj) => {
    const s = Object.prototype.toString.call(obj);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
  },

  /**
   * Determine if the url format
   */
  isUrl: (url) =>
    /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(
      url
    ),
};
