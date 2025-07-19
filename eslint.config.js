import js from "@eslint/js";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  // Base recommended rules and TS parser
  js.configs.recommended,
  {
    files: ["renderer/**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}"],
    ignores: ["**/.next/**", "**/node_modules/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: ["./tsconfig.json"],
      },
    },
    plugins: {
      react,
      "react-hooks": hooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "@typescript-eslint": tsPlugin,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": { typescript: {} },
    },
    rules: {
      // core TS rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // A11y
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      // Imports
      "import/order": ["warn", { "newlines-between": "always" }],
      // TS-specific
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  // CommonJS config override for .cjs files
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        module: "readonly",
        exports: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly"
      }
    },
    // Treat these as JS, not TS
    ignores: [],
    rules: {
      // allow module.exports in these files
      "no-undef": "off"
    },
  },
];
