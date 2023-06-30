import type { CodegenConfig } from "@graphql-codegen/cli";
import { backendUrl } from "./app/constants";

const config: CodegenConfig = {
  overwrite: true,
  schema: `${backendUrl}/graphql`,
  documents: "graphql/**/*.graphql",
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
