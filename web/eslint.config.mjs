import next from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptNext from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["node_modules/**", ".next/**", "out/**"] },
  ...next,
  ...coreWebVitals,
  ...typescriptNext,
];

export default eslintConfig;
