/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^gatsby$": "<rootDir>/__mocks__/gatsby.js",
    "^gatsby-plugin-image$": "<rootDir>/__mocks__/gatsby-plugin-image.js",
    "nosleep\\.js": "<rootDir>/__mocks__/nosleep.js",
    "\\.css$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
