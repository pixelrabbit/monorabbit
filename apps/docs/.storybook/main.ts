import type { StorybookConfig } from '@storybook/nextjs';
import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: [
    "../../../packages/ui/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/*.mdx"
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@chromatic-com/storybook")
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
};

export default config;
