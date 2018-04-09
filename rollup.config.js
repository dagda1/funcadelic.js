import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/funcadelic.ts",
    output: {
      name: "funcadelic",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [resolve(), commonjs(), typescript()]
  },

  {
    input: "src/funcadelic.ts",
    external: id =>
      /lodash/.test(id) || /object.getownpropertydescriptors/.test(id),
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [typescript()]
  }
];
