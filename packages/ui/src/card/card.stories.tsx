import { Card, CardProps } from "./card";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Components/Card",
  component: Card,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Inner content of a card",
    title: "This is the card title",
  }
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Standard = Template.bind({});

export const WithImage = Template.bind({});
WithImage.args = {
  media_url: "https://picsum.photos/600/400"
};