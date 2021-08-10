<h1 align="center">Sourcemap Upload Webpack Plugin</h1>
<p align="center">A webpack plugin for uploading sourcemap files</p>

<br/>

# Getting Started

## 📦 Install

```console
npm install sourcemap-upload-webpack-plugin --save-dev
```

## 📝 Use

```js
const SourcemapUploadPlugin = require("sourcemap-upload-webpack-plugin ");

module.exports = {
  plugins: [
    new SourcemapUploadPlugin({
      url: "https://www.xxxx.com",
      uploadPath: path.resolve(__dirname, "xxxx"),
      patterns: [/\.map$/], // This is optional
    }),
  ],
};
```

<br/>

# 📖 Options

## url

**type：String（required）**

Server url of upload files.

<br />

## uploadPath

**type：String（required）**

Path of the folder where the files need to be uploaded

<br />

## patterns

**type：Array\<RegExp>**

Regular expressions for matching files, it will default to `[/\.map$/]` if patterns is not specified.
