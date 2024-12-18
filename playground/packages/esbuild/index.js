const { build, context } = require("esbuild");

const run = async ({ entryPoints = ["src/index.ts"], pkg, config = {} }) => {
  const dev = process.argv.includes("--dev");
  const minify = !dev;
  const shouldWatch = process.argv.includes("--watch");

  const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
  });

  const baseConfig = {
    entryPoints,
    bundle: true,
    minify,
    sourcemap: true,
    outdir: "dist",
    target: "es2019",
    external,
    ...config,
  };

  try {
    if (shouldWatch) {
      // watch 모드일 때는 context를 사용
      const [esmContext, cjsContext] = await Promise.all([
        context({
          ...baseConfig,
          format: "esm",
        }),
        context({
          ...baseConfig,
          format: "cjs",
          outExtension: {
            ".js": ".cjs",
          },
        }),
      ]);

      await Promise.all([esmContext.watch(), cjsContext.watch()]);
    } else {
      // 일반 빌드
      await Promise.all([
        build({
          ...baseConfig,
          format: "esm",
        }),
        build({
          ...baseConfig,
          format: "cjs",
          outExtension: {
            ".js": ".cjs",
          },
        }),
      ]);
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
};

module.exports = run;
