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

export const WithVideo = Template.bind({});
WithVideo.args = {
  media_url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/99/Animation_of_Rotating_Earth_at_Night.webm/Animation_of_Rotating_Earth_at_Night.webm.720p.vp9.webm"
}