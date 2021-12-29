module.exports = {
	extends: [
		"react-app",
		"react-app/jest",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		"no-console": "warn",
		"no-multi-spaces": "error",
		"array-bracket-spacing": "error",
		"comma-spacing": ["error", {
			"before": false,
			"after": true
		}],
		"key-spacing": ["error", {
			"beforeColon": false,
			"afterColon": true,
			"mode": "strict",
		}],
		"keyword-spacing": ["error", {
			"before": true,
			"after": true,
		}],
		"indent": "off",
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"@typescript-eslint/indent": ["error", "tab", {
			"SwitchCase": 1,
			"offsetTernaryExpressions": true,
		}],
	}
};