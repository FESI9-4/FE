import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  extends: ["react-app", "react-app/jest", "plugin:prettier/recommended", "plugin:tailwindcss/recommended","plugin:storybook/recommended","plugin:react-hooks/recommended",],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks"],
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",
    "tailwindcss/no-custom-classname": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "eqeqeq": "error",
    "no-var": "error",
  },
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
