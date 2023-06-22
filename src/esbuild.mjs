// Custom build script to get around sharp missing a pure esm build
import * as esbuild from 'esbuild'


await esbuild.build({
    entryPoints: ['extension.ts'],
    bundle: true,
    outdir: '../server/',
    format: "esm",
    target: "esnext",
    platform: "node",


})
