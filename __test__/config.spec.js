describe('config', () => {

	let config

	const envs = ['test', 'local']

	envs.forEach(env => {
		describe(`when the env is ${env}`, () => {
			beforeEach(() => {
				process.env.NODE_ENV = env
				jest.resetModules()
				config = require('../app/config')
			})

			test('returns the config', () => {
				expect(config).toMatchObject({
					env: env,
					sauceNaoApiKey: expect.any(String),
					similarityThreshold: expect.any(Number),
					templates: {
						directImgurImg: expect.any(Function),
						imgurAlbum: expect.any(Function),
						sauceNaoSearch: expect.any(Function)
					}
				})
			})
		})
	})

	describe.skip('when the env is not set', () => {
		beforeEach(() => {
			process.env.NODE_ENV = undefined
			jest.resetModules()
			config = require('../app/config')
		})

		test('returns the local config', () => {
			expect(config).toMatchObject({
				env: 'local',
				sauceNaoApiKey: expect.any(String),
				similarityThreshold: expect.any(Number),
				templates: {
					directImgurImg: expect.any(Function),
					imgurAlbum: expect.any(Function),
					sauceNaoSearch: expect.any(Function)
				}
			})
		})
	})
})