'use strict'

const
	convertSourceMap = require('convert-source-map'),
	readFile = require('fs-promise').readFile,
	Compiler = require('mason-compile/dist/Compiler').default,
	compileWarnAndThrow = require('mason-node-util/dist/compile-warn-and-throw').default

module.exports = {
	name: 'mason',
	inputFormats: ['ms'],
	outputFormat: 'js',
	renderFileAsync(filename, options) {
		if (options === null)
			options = undefined
		const compiler = new Compiler(options)
		return readFile(filename, 'utf-8').then(msCode => {
			// TODO:ES6 const {code, sourceMap} = ...
			const _ = compileWarnAndThrow(compiler, msCode, filename)
			return `${_.code}\n${convertSourceMap.fromObject(_.sourceMap).toComment()}`
		})
	}
}
