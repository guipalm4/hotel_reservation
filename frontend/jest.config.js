module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	roots: ["<rootDir>/src"],
	testMatch: ["**/?(*.)+(test|spec).+(ts|tsx|js)"],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/index.ts",
	],
	coverageDirectory: "<rootDir>/coverage",
	coverageReporters: ["json", "lcov", "text", "clover"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	transform: {
		"^.+.(ts|tsx)$": "ts-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
