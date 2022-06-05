/* Adapted from https://github.com/trofima/rollup-plugin-ejs/blob/master/src/index.js (Licensed under MIT) */
import { createFilter } from 'rollup-pluginutils'
import { Plugin } from 'rollup'
import { compile } from 'ejs'
import { readFileSync } from 'fs'
import { resolve, parse, extname } from 'path'
import { renderSync } from 'node-sass'
import { minify } from 'html-minifier'

const linkTagRegEx =
	/<link(?=.*\shref=['|"]([\w$-_.+!*'(),]*)['|"])(?=.*\srel=['|"]stylesheet['|"]).*>/g
const readStyleFile = (tplFilePath, href) =>
	readFileSync(resolve(parse(tplFilePath).dir, href), 'utf8')
const defaultCompilerOptions = { client: true, strict: true }

const compilers = {
	css: readStyleFile,
	scss: (templateFile, href) =>
		renderSync({
			data: readStyleFile(templateFile, href),
			importer: (url, prev) => ({
				href: resolve(parse(prev === 'stdin' ? templateFile : prev).dir, url),
			}),
		}).css.toString('utf8'),
}

const loadStylesTo = (code, templateFile) =>
	code.replace(linkTagRegEx, (match, href) =>
		href
			? `<style>${compilers[extname(href).substr(1)](templateFile, href)}</style>`
			: ''
	)

const renderCode = (templateFn, render) => {
	if (render) {
		const { data, minifierOptions } = render
		return JSON.stringify(
			minifierOptions
				? minify(templateFn(data), minifierOptions)
				: templateFn(data)
		)
	}
	return templateFn.toString()
}

export default ({
	include,
	exclude,
	loadStyles,
	render,
	compilerOptions = defaultCompilerOptions,
}: any = {}) => {
	const filter = createFilter(include || ['**/*.ejs'], exclude)
	return {
		name: 'ejs',
		transform: function transform(code, tplFilePath) {
			if (filter(tplFilePath)) {
				const codeToCompile = loadStyles ? loadStylesTo(code, tplFilePath) : code
				const templateFn = compile(
					codeToCompile,
					Object.assign(defaultCompilerOptions, compilerOptions)
				)
				return {
					code: `export default ${renderCode(templateFn, render)};`,
					map: { mappings: '' },
				}
			}
		},
	} as Plugin
}
