import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  target: "esnext",
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  treeshake: true,
  external: [
    "react", "react-dom", "react-router"
  ]
})