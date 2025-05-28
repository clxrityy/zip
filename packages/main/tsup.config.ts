import { defineConfig } from 'tsup'

export default defineConfig([
	{
		entry: { index: 'src/client/index.ts' },
		outDir: 'dist/client',
		format: ['esm'],
		dts: { entry: 'src/client/index.ts' },
		splitting: false,
		sourcemap: true,
		clean: true,
	},
	{
		entry: { index: 'src/server/index.ts' },
		outDir: 'dist/server',
		format: ['esm'],
		dts: { entry: 'src/server/index.ts' },
		splitting: false,
		sourcemap: true,
		clean: false, // avoid removing `dist/client`
	},
])
