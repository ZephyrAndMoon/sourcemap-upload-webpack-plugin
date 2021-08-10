<h1 align="center">Sourcemap Upload Webpack Plugin</h1>
<p align="center">一个将 sourcemap 映射资源文件上传的webpack插件</p>

<div align="center">

简体中文 &#124; [English](https://github.com/ZephyrAndMoon/sourcemap-upload-webpack-plugin/blob/master/README.md)

</div>

<br/>

# 开始

## 📦 安装

```console
npm install sourcemap-upload-webpack-plugin --save-dev
```

## 📝 使用

```js
const SourcemapUploadPlugin = require('sourcemap-upload-webpack-plugin ')

module.exports = {
	plugins: [
		new SourcemapUploadPlugin({
			url: 'https://www.xxxx.com',
			uploadPath: path.resolve(__dirname, 'xxxx'),
			// 下面的参数是可选项
			patterns: [/\.map$/],
			requestOption: {},
		}),
	],
}
```

<br/>

# 📖 参数

## url

**type：String（必须）**

上传资源的目标服务器地址

## uploadPath

**type：String（必须）**

需要上传资源文件的文件夹路径

## patterns

**type：Array\<RegExp>**

匹配文件的正则表达式数组，如果没有指定参数的话，默认为 `[/\.map$/]`

## requestOption

**type：Object**

文件上传请求的额外配置参数

包含以下子参数:

-   `data:` 除了文件以外通过 form-data 发送的其他请求参数

-   `header:` 请求头

-   `other:` 其他的 axios 支持的配置参数
