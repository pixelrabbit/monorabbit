import type { Preview } from '@storybook/react';
import { Roboto } from 'next/font/google';
import "../../www/app/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    disableSaveFromUI: true
  },
};
export const tags = ["autodocs"];

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400"],
  subsets: ['latin'],
});

const preview: Preview = {
  decorators: [
    Story => (
      <div className={roboto.className}>
        <Story />
      </div>
    )
  ]
};

export default preview;