import { Meta, Story, DecoratorFn } from "@storybook/react";
import { Video, VideoProps } from "./video";

const withMaxWidth: DecoratorFn = (Story) => (
  <div style={{ maxWidth: "500px" }}>
    <Story />
  </div>
);

export default {
  title: "Components/Video",
  component: Video,
  decorators: [withMaxWidth],
} as Meta;

const Template: Story<VideoProps> = (args) => <Video {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://www.w3schools.com/html/mov_bbb.mp4",
  captions: "./subtitles.vtt",
  isAmbient: false,
};

export const Ambient = Template.bind({});
Ambient.args = {
  src: "https://videos.pexels.com/video-files/5485144/5485144-hd_1920_1080_25fps.mp4",
  isAmbient: true,
};
