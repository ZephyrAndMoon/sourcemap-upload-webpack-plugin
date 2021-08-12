<h1 align="center">Sourcemap Upload Webpack Plugin</h1>

<div align="center">

[简体中文](https://github.com/ZephyrAndMoon/sourcemap-upload-webpack-plugin/blob/master/README_zh.md) &#124; English

</div>

<br/>

# Introduction

This is a `webpack` plug-in that uploads the resources to a specified server after the project is built. Use `archiver` to compress a `zip` package and upload it in `form-data` format. By default, the "source-map" resource is uploaded. To upload other types of resource files, you can change the parameter "patterns".

<br/>

# Getting Started

## 📦 Install

```console
npm install sourcemap-upload-webpack-plugin --save-dev
```

## 📝 Usage

```js
const SourcemapUploadPlugin = require('sourcemap-upload-webpack-plugin ');

module.exports = {
  plugins: [
    new SourcemapUploadPlugin({
      url: 'https://www.xxxx.com',
      uploadPath: path.resolve(__dirname, 'xxxx'),
      // The following are all optional
      patterns: [/\.map$/],
      requestOption: {},
    }),
  ],
};
```

<br/>

# 📖 Options

## url

**type：String（required）**

Server url of upload files.

## uploadPath

**type：String（required）**

Path of the folder where the files need to be uploaded

## patterns

**type：Array\<RegExp>**

Regular expressions array for matching files, it will default to `[/\.map$/]` if patterns is not specified.

## requestOption

**type：Object**

Additional configuration parameters for file upload requests.

contains the following sub-parameters:

- `data:` other parameters passed by form-data except for the file.

- `header:` request header.

- `other:` other parameters supported by axios
