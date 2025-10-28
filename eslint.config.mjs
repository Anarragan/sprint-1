// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";
import parser from "@typescript-eslint/parser";

export default tseslint.config(
    {
        ignores: ["eslint.config.mjs"],
    },
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-floating-promises": "warn",
            "@typescript-eslint/no-unsafe-argument": "warn",
            "prettier/prettier": [
                "error",
                { endOfLine: "auto", singleQuote: true, parser: "flow", usePrettierrc: false },
            ],
        },
    },
);
