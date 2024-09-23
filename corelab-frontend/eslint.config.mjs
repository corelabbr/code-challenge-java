import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        test: "readonly",
        expect: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["generateComponent.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
