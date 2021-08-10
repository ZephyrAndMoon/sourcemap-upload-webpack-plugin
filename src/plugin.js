const fs = require("fs");
const path = "./sourcemap.zip";
const archiver = require("archiver");
const { readDir, uploadFile, deleteFile, typeOf, isUrl } = require("./utils");

class SourcemapUploadWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const { url, uploadPath, patterns } = this.options;

    if (!url || !uploadPath) {
      throw Error("Missing necessary parameters");
    }

    if (!typeOf(url) === "string" || !isUrl(url)) {
      throw Error('The "url" parameter is incorrect');
    }

    if (!typeOf(uploadPath) === "string") {
      throw Error('The "uploadPath" parameter is incorrect');
    }

    if (patterns && !typeOf(patterns) === "array") {
      throw Error('The "patterns" parameter is incorrect');
    }
	
    const timeStamp = new Date().getTime();
    const archive = archiver("zip", {
      gzip: true,
      zlib: { level: 9 },
    });

    // execute when packing error
    archive.on("error", function (err) {
      throw err;
    });

    // execute when packing is complete
    archive.on("end", async () => {
      await uploadFile({ url, path, timeStamp });
      deleteFile(path);
    });

    archive.pipe(fs.createWriteStream(path));

    // execute on build completion
    compiler.hooks.done.tap("upload-sourcemap-plugin", (status) => {
      const sourceMapPaths = readDir(uploadPath, patterns);
      sourceMapPaths.forEach((p) => {
        archive.append(fs.createReadStream(p), {
          name: p.replace(uploadPath, ""),
        });
      });
      archive.finalize();
    });
  }
}

module.exports = SourcemapUploadWebpackPlugin;
