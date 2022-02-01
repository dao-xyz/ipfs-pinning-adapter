export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src"],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: "/__tests__/[A-Za-z0-9]+\\.(test|spec)\\.ts$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testTimeout: 60000,
  globals: {
    "ts-jest": {
      tsconfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
};
