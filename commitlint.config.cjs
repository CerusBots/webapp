const baseScopes = ['deploy', 'api', 'common', 'native', 'server', 'web']
const subbaseScopes = ['testing', 'staging']

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-enum': [
			2,
			'always',
			[
				...baseScopes
					.map((scope) => [...subbaseScopes.map((sub) => `${scope}:${sub}`), scope])
					.flat(),
				...subbaseScopes,
			],
		],
	},
}
