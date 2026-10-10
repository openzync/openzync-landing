/* eslint-config-next@16 ships native flat configs — consume them directly.
   FlatCompat.extends() crashes here: the plugin objects carry circular refs
   that @eslint/eslintrc's ConfigValidator cannot JSON-stringify. */
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

export default [...coreWebVitals, ...typescript];
