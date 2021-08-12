const fs = require('fs')
const p = require('path')
const axios = require('axios')
const FormData = require('form-data')
const initPatterns = [/\.map$/]

module.exports = {
	/**
	 * Uploading files by axios
	 */
	uploadFile: async ({ url, path, requestOption = {} }) => {
		try {
			const { data = {}, header = {}, other = {} } = requestOption
			let formData = new FormData()
			if (Object.keys(data).length > 0) {
				for (let key in data) {
					formData.append(key, data[key])
				}
			}
			formData.append('file', fs.createReadStream(path))
			const res = await axios({
				...other,
				url,
				method: 'post',
				data: formData,
				headers: { ...formData.getHeaders(), ...header },
			})
			console.info(JSON.stringify(res.data))
		} catch (error) {
			throw error
		}
	},
	/**
	 * Recursive reading of folders
	 * retrieve the matching files in the directory
	 */
	readDir: (path, patterns) => {
		const filesContent = []

		function readSingleFile(path) {
			const files = fs.readdirSync(path)
			files.forEach(filePath => {
				const wholeFilePath = p.resolve(path, filePath)
				const fileStat = fs.statSync(wholeFilePath)
				// determine whether it is a directory or a file
				if (fileStat.isDirectory()) {
					readSingleFile(wholeFilePath)
				}
				const _patterns = patterns || initPatterns
				if (
					fileStat.isFile() &&
					_patterns.some(r => r.test(filePath))
				) {
					filesContent.push(wholeFilePath)
				}
			})
		}
		readSingleFile(path)
		return filesContent
	},

	/**
	 * Delete Folder
	 */
	deleteFile: path => fs.unlinkSync(path),

	/**
	 * Determine the data type
	 */
	typeOf: obj => {
		const s = Object.prototype.toString.call(obj)
		return s.match(/\[object (.*?)\]/)[1].toLowerCase()
	},
}
