import globals from "globals";
import pluginJs from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	{
		plugins: {
			sonarjs,
		},
	},
	{
		rules: {
			"no-unused-vars": "error",
			"no-undef": "error",
			semi: "error",
		},
	},
];

