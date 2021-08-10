<h1 align="center">Sourcemap Upload Webpack Plugin</h1>
<p align="center">A webpack plugin for uploading sourcemap files</p>

<div align="center">

[简体中文](https://github.com/ZephyrAndMoon/sourcemap-upload-webpack-plugin/blob/master/README_zh.md) &#124; English

</div>

<br/>

# Getting Started

## 📦 Install

```console
npm install sourcemap-upload-webpack-plugin --save-dev
```

## 📝 Use

```js
const SourcemapUploadPlugin = require('sourcemap-upload-webpack-plugin ')

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
}
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

-   `data:` other parameters passed by form-data except for the file.

-   `header:` request header.

-   `other:` other parameters supported by axios
