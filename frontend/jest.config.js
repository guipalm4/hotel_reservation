module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
};
