const fs = require('fs')
const path = './sourcemap.zip'
const archiver = require('archiver')
const { readDir, uploadFile, deleteFile, typeOf } = require('./utils')

class SourcemapUploadWebpackPlugin {
	constructor(options) {
		this.options = options
	}
	apply(compiler) {
		const { url, uploadPath, patterns, requestOption } = this.options

		if (!url || !uploadPath) {
			throw Error('Missing necessary parameters')
		}

		if (!typeOf(url) === 'string') {
			throw Error('The "url" parameter type is incorrect')
		}

		if (!typeOf(uploadPath) === 'string') {
			throw Error('The "uploadPath" parameter type is incorrect')
		}

		if (patterns && !typeOf(patterns) === 'array') {
			throw Error('The "patterns" parameter type is incorrect')
		}
		compiler.hooks.done.tap('upload-sourcemap-plugin', status => {
			const archive = archiver('zip', {
				gzip: true,
				zlib: { level: 9 },
			})

			// execute when packing error
			archive.on('error', function(err) {
				throw err
			})

			// execute when packing is complete
			archive.on('end', async () => {
				await uploadFile({ url, path, requestOption })
				deleteFile(path)
			})
			archive.directory('subdir/', false)

			archive.pipe(fs.createWriteStream(path))

			// execute on build completion
			const sourceMapPaths = readDir(uploadPath, patterns)
			sourceMapPaths.forEach(p => {
				archive.append(fs.createReadStream(p), {
					name: `sourcemap/${p.replace(uploadPath, '')}`,
				})
			})
			archive.finalize()
		})
	}
}

module.exports = SourcemapUploadWebpackPlugin
