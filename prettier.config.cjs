/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  bracketSpacing: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
