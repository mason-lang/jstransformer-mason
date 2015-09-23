'use strict'

const
	compileWarnAndThrow = require('mason-node-util/dist/compile-warn-and-throw').default,
	convertSourceMap = require('convert-source-map'),
	readFile = require('fs-promise').readFile

module.exports = {
	name: 'mason',
	inputFormats: ['ms'],
	outputFormat: 'js',
	renderFileAsync(filename, options) {
		return readFile(filename, 'utf-8').then(src => {
			// TODO:ES6 const {code, sourceMap} = ...
			const _ = compileWarnAndThrow(src, filename, options)
			return `${_.code}\n${convertSourceMap.fromObject(_.sourceMap).toComment()}`
		})
	}
}
