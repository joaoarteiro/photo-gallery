import globals from "globals";
import pluginReact, { rules } from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  { rules: { "react/react-in-jsx-scope": "off" } },
  pluginReact.configs.flat.recommended,
];
